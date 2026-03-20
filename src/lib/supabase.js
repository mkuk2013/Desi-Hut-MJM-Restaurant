import { createClient } from '@supabase/supabase-js'

// IMPORTANT: Replace these with your own Supabase project details
const supabaseUrl = 'https://ikvdcmdmtnwqmewucuda.supabase.co'
const supabaseAnonKey = 'sb_publishable__6mevx5tSI-A5OTWmEn0BQ_GpFO5_G7'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
