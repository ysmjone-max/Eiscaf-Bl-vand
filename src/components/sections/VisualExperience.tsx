import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?q=80&w=1827&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1936&auto=format&fit=crop",
];

export default function VisualExperience() {
  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div 
        className="flex gap-6 px-4 md:px-8 w-full overflow-x-auto snap-x pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="relative min-w-[300px] md:min-w-[400px] lg:min-w-[500px] aspect-[4/5] rounded-xl overflow-hidden snap-center shrink-0">
            <Image 
              src={src} 
              alt="Blåvand Experience" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700" 
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
