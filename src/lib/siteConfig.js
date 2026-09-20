// Central site configuration — single source of truth for shared contact details.
export const WHATSAPP_NUMBER = '923073431191'

/**
 * Build a wa.me deep link that opens a WhatsApp chat with the restaurant
 * and pre-fills the given message.
 */
export const buildWhatsAppLink = (message = '') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
