"use client";

import React from 'react';

/**
 * WhatsAppButton — Floating WhatsApp chat button placed at the bottom-right.
 * Positions at bottom-20 (above the BackToTop button) to prevent visual overlapping.
 */
export default function WhatsAppButton() {
  // Aapka WhatsApp number (country code 91 ke saath - bina + sign ke)
  const phoneNumber = "916205482614"; 
  const defaultMessage = "Hi, I have a question";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] right-[calc(1.5rem+env(safe-area-inset-right,0px))] z-40 group flex items-center">
      {/* Tooltip on Hover */}
      <span className="absolute right-14 bg-[#0B1F3A] text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap border border-[#1E293B] backdrop-blur-sm">
        Chat with us on WhatsApp
      </span>

      {/* Round Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] shrink-0 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:shadow-black/40 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 hover:-translate-y-0.5"
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 1C5.925 1 1 5.925 1 12c0 2.12.601 4.1 1.642 5.782L1 23l5.372-1.602A10.94 10.94 0 0012 23c6.075 0 11-4.925 11-11S18.075 1 12 1zM3.2 12c0-4.86 3.94-8.8 8.8-8.8s8.8 3.94 8.8 8.8-3.94 8.8-8.8 8.8a8.756 8.756 0 01-4.442-1.206l-.319-.188-3.3.985.972-3.193-.201-.33A8.759 8.759 0 013.2 12z"
          />
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
        </svg>
      </a>
    </div>
  );
}
