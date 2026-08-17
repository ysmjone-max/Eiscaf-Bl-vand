"use client";
import { businessConfig } from "@/data/config";
import { MapPin, Clock } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function LocationSection() {
  const { t } = useLang();

  return (
    <section id="location" className="py-20 md:py-24 bg-cream text-warm-brown border-t border-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div>
            <h2 className="font-playfair text-3xl md:text-5xl mb-8">{t.location.headline}</h2>
            
            <div className="bg-sand/30 p-8 rounded-2xl mb-8 border border-sand/40">
              <h3 className="font-playfair text-2xl mb-4 font-bold text-warm-brown">{businessConfig.name}</h3>
              <p className="text-base md:text-lg font-light mb-6 text-warm-brown/90 leading-relaxed">
                {businessConfig.address.split(", ").map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </p>
              
              <div className="border-t border-cream pt-6 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-nordic-blue" />
                  <p className="font-semibold uppercase tracking-wider text-xs text-nordic-blue">{t.location.hours}</p>
                </div>
                <p className="font-light text-warm-brown/80 text-sm">{t.location.mon}</p>
                <p className="font-semibold text-warm-brown text-base">11:00 – 20:00 Uhr</p>
                <p className="text-xs text-warm-brown/60 mt-2 italic">{t.location.note}</p>
              </div>
            </div>

            <a 
              href={businessConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-nordic-blue text-cream px-8 py-4 rounded-full font-medium hover:bg-nordic-blue/90 transition-colors text-base shadow-sm"
            >
              <MapPin className="mr-2" size={18} />
              {t.location.route}
            </a>
          </div>

          <div className="relative aspect-square md:aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden bg-sand shadow-sm">
            <div className="absolute inset-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2360.7077610476483!2d10.123281!3d54.331718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b255e2d633519b%3A0x1d36d81d4a0a7360!2sKnooper%20Weg%20169%2C%2024118%20Kiel!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-85 mix-blend-multiply"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
