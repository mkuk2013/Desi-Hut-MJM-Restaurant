
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ikvdcmdmtnwqmewucuda.supabase.co'
const supabaseAnonKey = 'sb_publishable__6mevx5tSI-A5OTWmEn0BQ_GpFO5_G7'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  console.log('Fetching products...')
  const { data, error } = await supabase.from('products').select('id, name, image').order('id', { ascending: true })
  if (error) {
    console.error('Error:', error.message)
  } else {
    console.log(`Found ${data.length} products:`)
    console.log(JSON.stringify(data, null, 2))
  }
}

test()
