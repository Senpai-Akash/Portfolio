const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/images/myself-original.jpg');
const outputPath = path.join(__dirname, '../public/images/akash-portrait.png');
const outputWebP = path.join(__dirname, '../public/images/akash-portrait.webp');

async function removeBackground() {
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Background criterion based on empirical color analysis:
  // True blue backdrop: B - R >= 68, B - G >= 36, R <= 55, B >= 98
  function isBgPixel(r, g, b) {
    return (b - r >= 68 && b - g >= 36 && r <= 55 && b >= 98);
  }

  // 1. Flood-fill from borders
  const bgMask = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let qHead = 0, qTail = 0;

  // Seed top, left, right edges
  for (let x = 0; x < width; x++) {
    const idx = x * channels;
    if (isBgPixel(data[idx], data[idx+1], data[idx+2])) {
      bgMask[x] = 1;
      queue[qTail++] = x;
    }
  }

  for (let y = 0; y < height; y++) {
    const idxL = (y * width) * channels;
    if (!bgMask[y * width] && isBgPixel(data[idxL], data[idxL+1], data[idxL+2])) {
      bgMask[y * width] = 1;
      queue[qTail++] = y * width;
    }
    const idxR = (y * width + (width - 1)) * channels;
    if (!bgMask[y * width + (width - 1)] && isBgPixel(data[idxR], data[idxR+1], data[idxR+2])) {
      bgMask[y * width + (width - 1)] = 1;
      queue[qTail++] = y * width + (width - 1);
    }
  }

  // BFS
  while (qHead < qTail) {
    const curr = queue[qHead++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < width - 1 ? curr + 1 : -1,
      cy > 0 ? curr - width : -1,
      cy < height - 1 ? curr + width : -1,
    ];

    for (const n of neighbors) {
      if (n !== -1 && bgMask[n] === 0) {
        const idx = n * channels;
        if (isBgPixel(data[idx], data[idx+1], data[idx+2])) {
          bgMask[n] = 1;
          queue[qTail++] = n;
        }
      }
    }
  }

  console.log(`Flood-fill marked ${qTail} background pixels (${((qTail / (width * height)) * 100).toFixed(1)}% of image).`);

  // 2. Build RGBA buffer with edge softening and despill
  const rgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pIdx = y * width + x;
      const srcIdx = pIdx * channels;
      const dstIdx = pIdx * 4;

      let r = data[srcIdx];
      let g = data[srcIdx + 1];
      let b = data[srcIdx + 2];

      if (bgMask[pIdx] === 1) {
        // Pure background
        rgba[dstIdx] = 0;
        rgba[dstIdx + 1] = 0;
        rgba[dstIdx + 2] = 0;
        rgba[dstIdx + 3] = 0;
        continue;
      }

      // Check for adjacency to background within 2 pixels
      let bgNeighbors = 0;
      let totalNeighbors = 0;

      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            totalNeighbors++;
            if (bgMask[ny * width + nx] === 1) {
              bgNeighbors++;
            }
          }
        }
      }

      let alpha = 255;

      if (bgNeighbors > 0) {
        // Edge pixel: compute soft alpha based on neighbor density and blue excess
        const edgeRatio = 1.0 - (bgNeighbors / totalNeighbors);
        const blueExcess = Math.max(0, Math.min(1, (b - Math.max(r, g)) / 50));
        const softAlpha = edgeRatio * (1.0 - blueExcess * 0.5);
        alpha = Math.round(Math.min(255, Math.max(0, softAlpha * 255)));

        // Despill: neutralize blue fringe on the edge
        if (b > Math.max(r, g)) {
          b = Math.round((r + g) / 2);
        }
      }

      rgba[dstIdx] = r;
      rgba[dstIdx + 1] = g;
      rgba[dstIdx + 2] = b;
      rgba[dstIdx + 3] = alpha;
    }
  }

  // Save as high quality PNG
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png({ quality: 100, compressionLevel: 8 })
    .toFile(outputPath);

  // Save as optimized WebP
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .webp({ quality: 95, alphaQuality: 100, lossless: false })
    .toFile(outputWebP);

  console.log('Background removed successfully and saved.');
}

removeBackground().catch(console.error);
