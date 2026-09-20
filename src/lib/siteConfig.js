// Central site configuration — single source of truth for shared contact details.
export const WHATSAPP_NUMBER = '923073431191'

// Restaurant's official Facebook page
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61554675945365'

// Emails allowed to open the admin panel (in addition to Supabase app_metadata role='admin').
// IMPORTANT: add your own email here, e.g. ['myemail@gmail.com']
export const ADMIN_EMAILS = []

/** True if this user may access the admin panel. */
export const isAdminUser = (user) =>
  !!user && (user.app_metadata?.role === 'admin' || ADMIN_EMAILS.includes(user.email))

/**
 * Build a wa.me deep link that opens a WhatsApp chat with the restaurant
 * and pre-fills the given message.
 */
export const buildWhatsAppLink = (message = '') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
