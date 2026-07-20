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
    <div className="fixed bottom-20 right-6 z-50 group flex items-center">
      {/* Tooltip on Hover */}
      <span className="absolute right-14 bg-slate-900/95 dark:bg-slate-800/95 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap border border-slate-700/30 backdrop-blur-sm">
        Chat with us on WhatsApp
      </span>

      {/* Round Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 hover:-translate-y-0.5"
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.115-2.905-6.99C16.555 1.875 14.09 1.846 11.979 1.846c-5.438 0-9.863 4.42-9.866 9.865-.001 2.016.528 3.99 1.538 5.739L2.643 21.23l3.805-1.01l.199.134zM17.91 14.3c-.324-.162-1.92-.949-2.216-1.055-.296-.108-.513-.162-.729.162-.216.324-.838 1.055-1.027 1.271-.19.216-.379.243-.703.081-.324-.162-1.37-.505-2.61-1.613-.965-.862-1.617-1.927-1.806-2.251-.19-.325-.02-.5-.182-.662-.147-.146-.324-.379-.487-.568-.162-.19-.216-.324-.324-.541-.108-.216-.055-.405-.027-.567.027-.162.216-.513.324-.676.108-.162.144-.27.216-.405.072-.135.036-.253-.014-.405-.05-.162-.729-1.757-.999-2.407-.263-.632-.53-.546-.729-.556c-.19-.01-.405-.01-.622-.01-.216 0-.568.081-.865.405-.297.324-1.135 1.109-1.135 2.703 0 1.594 1.162 3.136 1.324 3.352.162.216 2.287 3.493 5.54 4.896.774.333 1.378.533 1.85.683.778.247 1.487.213 2.047.129.624-.093 1.92-.784 2.19-1.541.27-.757.27-1.406.19-1.541-.081-.135-.297-.216-.622-.378z" />
        </svg>
      </a>
    </div>
  );
}
