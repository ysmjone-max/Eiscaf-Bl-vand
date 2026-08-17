"use client";
import { Star } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function ReviewsSection() {
  const { t } = useLang();

  return (
    <section className="py-20 md:py-24 bg-cream text-warm-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-playfair text-3xl md:text-5xl mb-4">{t.reviews.headline}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {t.reviews.items.map((review, idx) => (
            <div key={idx} className="bg-sand/30 p-8 rounded-2xl flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4 text-[#D4AF37]">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-base md:text-lg font-light mb-6 flex-grow leading-relaxed">
                "{review.text}"
              </p>
              <div className="font-medium text-nordic-blue">— {review.name}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://maps.google.com/?q=Bl%C3%A5vand+Eiscaf%C3%A9+Kiel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-nordic-blue font-medium hover:text-nordic-blue/80 transition-colors border-b border-nordic-blue/30 hover:border-nordic-blue pb-1 text-sm md:text-base"
          >
            {t.reviews.allReviews} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
