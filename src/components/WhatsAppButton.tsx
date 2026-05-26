import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const WHATSAPP_NUMBER = "254786379020"; // +254 786 379 020
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Tujenge%20Solutions!%20I%27d%20like%20to%20discuss%20a%20project.`;

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip label */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="rounded-xl bg-[#128C7E] px-4 py-2 text-sm font-semibold text-white shadow-lg whitespace-nowrap"
          >
            Chat with us on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.45)] transition-shadow hover:shadow-[0_6px_32px_rgba(37,211,102,0.6)]"
        style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-white"
          aria-hidden="true"
        >
          <path d="M16.003 0C7.164 0 .003 7.161.003 16c0 2.825.737 5.478 2.027 7.785L0 32l8.424-2.01A15.936 15.936 0 0 0 16.003 32C24.841 32 32 24.839 32 16S24.841 0 16.003 0zm0 29.3a13.23 13.23 0 0 1-6.74-1.838l-.483-.287-5.002 1.194 1.217-4.878-.314-.5A13.21 13.21 0 0 1 2.7 16c0-7.334 5.97-13.3 13.303-13.3C23.337 2.7 29.3 8.666 29.3 16S23.337 29.3 16.003 29.3zm7.3-9.97c-.4-.2-2.367-1.168-2.733-1.302-.366-.133-.633-.2-.9.2-.267.4-1.033 1.302-1.266 1.569-.234.267-.467.3-.867.1-.4-.2-1.69-.623-3.22-1.988-1.19-1.063-1.993-2.375-2.227-2.775-.234-.4-.025-.616.175-.815.181-.18.4-.467.6-.7.2-.233.267-.4.4-.666.133-.267.067-.5-.033-.7-.1-.2-.9-2.168-1.233-2.968-.325-.78-.655-.675-.9-.687l-.767-.013c-.267 0-.7.1-1.067.5-.366.4-1.4 1.367-1.4 3.334 0 1.967 1.433 3.868 1.633 4.135.2.267 2.82 4.3 6.831 6.032.955.412 1.7.658 2.282.843.958.305 1.832.262 2.521.159.769-.115 2.367-.968 2.7-1.902.333-.934.333-1.735.233-1.902-.1-.167-.366-.267-.766-.467z" />
        </svg>
      </motion.a>
    </div>
  );
}
