import Image from "next/image";

// The LCP slide, rendered as a pure Server Component so the LCP image
// paints from static HTML with zero client-JS / hydration dependency.
// The client carousel overlays slides 2+ on top of this base layer.
export const HERO_LCP_SLIDE = {
  src: "/images/maxresdefault.jpg",
  alt: "Dr Lal PathLabs Khargapur, Gomti Nagar Lucknow – diagnostic lab services",
};

export const HERO_SLIDE_SIZES =
  "(max-width: 1023px) 100vw, (max-width: 1344px) calc(100vw - 468px), 812px";

export default function HeroLcpImage() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={HERO_LCP_SLIDE.src}
        alt={HERO_LCP_SLIDE.alt}
        fill
        sizes={HERO_SLIDE_SIZES}
        className="object-cover object-center"
        priority
        fetchPriority="high"
      />
    </div>
  );
}
