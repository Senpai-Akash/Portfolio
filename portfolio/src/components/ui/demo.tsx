import React from "react";
import { SocialTooltip, type SocialItem } from "@/components/ui/social-media";

// Data for the social media links, now using external SVG URLs
const socialLinks: SocialItem[] = [
  {
    href: "#",
    ariaLabel: "Shopify",
    tooltip: "Shopify",
    color: "#64943E",
    svgUrl:
      "https://cdn.21st.dev/assets/mirror/86/86e19afda708cead229b714d25de147ef0b920cfea807c5b2933b30d17a234db.svg",
  },
  {
    href: "#",
    ariaLabel: "Edge",
    tooltip: "Edge",
    color: "#0078D7",
    svgUrl:
      "https://cdn.21st.dev/assets/mirror/b2/b2cc3e0066cf332b9d421d075f125b0f99431b534184e8722c4dea7dc5474a18.svg",
  },
  {
    href: "#",
    ariaLabel: "Facebook",
    tooltip: "Facebook",
    color: "#3b5998",
    svgUrl:
      "https://cdn.21st.dev/assets/localized/003fc3e7814ddcd270e030014f120f4cb8bef38be40022ebca913cafb7617a76.svg",
  },
  {
    href: "#",
    ariaLabel: "Telegram",
    tooltip: "Telegram",
    color: "#0088cc",
    svgUrl:
      "https://cdn.21st.dev/assets/mirror/05/05f6898c0c087f84c8bcf65e93721bde65abe34093045d4e9ecddbb8dc9f6a18.svg",
  },
];

function SocialTooltipDemo() {
  return (
    <div className="flex items-center justify-center h-full bg-background p-6">
      <SocialTooltip items={socialLinks} />
    </div>
  );
}

export default SocialTooltipDemo;
