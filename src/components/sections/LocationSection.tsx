"use client";

import { useState, useEffect } from "react";
import { businessConfig } from "@/data/config";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function LocationSection() {
  const { t, lang } = useLang();
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    // Current hour in Germany
    const now = new Date();
    const currentHour = now.getHours();
    setIsOpenNow(currentHour >= 11 && currentHour < 20);
  }, []);

  return (
    <section id="location" className="py-20 md:py-28 bg-cream text-warm-brown border-t border-sand/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Info Column */}
          <div>
            <span className="text-nordic-blue text-xs font-semibold uppercase tracking-widest block mb-2">
              {lang === "de" ? "Besuche uns im Café" : "Visit Us in Kiel"}
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl mb-8 text-warm-brown leading-tight">
              {t.location.headline}
            </h2>

            {/* Address & Hours Box */}
            <div className="bg-sand/30 p-6 sm:p-8 rounded-3xl mb-8 border border-sand/50 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-playfair text-2xl font-bold text-warm-brown">{businessConfig.name}</h3>
                {/* Live Open / Closed Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    isOpenNow
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOpenNow ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                    }`}
                  />
                  <span>
                    {isOpenNow
                      ? lang === "de"
                        ? "Jetzt geöffnet"
                        : "Open Now"
                      : lang === "de"
                      ? "Öffnet um 11:00 Uhr"
                      : "Opens at 11:00"}
                  </span>
                </span>
              </div>

              <p className="text-base md:text-lg font-light mb-6 text-warm-brown/90 leading-relaxed">
                {businessConfig.address.split(", ").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>

              {/* Hours & Contact */}
              <div className="border-t border-sand/50 pt-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-warm-brown/70">
                    <Clock size={15} className="text-nordic-blue" />
                    <span>{t.location.mon}</span>
                  </div>
                  <span className="font-semibold text-warm-brown">11:00 – 20:00 Uhr</span>
                </div>

                {businessConfig.contact.phone && (
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-sand/30">
                    <div className="flex items-center gap-2 text-warm-brown/70">
                      <Phone size={15} className="text-nordic-blue" />
                      <span>Telefon</span>
                    </div>
                    <a
                      href={`tel:${businessConfig.contact.phone}`}
                      className="font-semibold text-nordic-blue hover:underline"
                    >
                      {businessConfig.contact.phone}
                    </a>
                  </div>
                )}

                <p className="text-xs text-warm-brown/55 italic pt-2">{t.location.note}</p>
              </div>
            </div>

            {/* Navigation Button */}
            <a
              href={businessConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-nordic-blue text-cream px-8 py-4 rounded-full font-semibold hover:bg-nordic-blue/90 transition-all text-base shadow-md hover:scale-105"
            >
              <Navigation className="mr-2" size={18} />
              {t.location.route}
            </a>
          </div>

          {/* Right Map Column */}
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden bg-sand shadow-lg border border-sand/60">
            <div className="absolute inset-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2360.7077610476483!2d10.123281!3d54.331718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b255e2d633519b%3A0x1d36d81d4a0a7360!2sKnooper%20Weg%20169%2C%2024118%20Kiel!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
