
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ikvdcmdmtnwqmewucuda.supabase.co'
const supabaseAnonKey = 'sb_publishable__6mevx5tSI-A5OTWmEn0BQ_GpFO5_G7'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const cleanData = [
  {
    name: 'Special Mix Chicken Handi',
    description: 'Our signature chicken handi prepared with traditional spices in a clay pot. Served with love.',
    price: 1800,
    category: 'Chicken Specialties',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAweoK2quOU4j6_741FKtdofOdXDE48cYtsP3NboXAycdJVAoHaxWKCAhMgpEt0_d-2eaVuKQJGNbWYeM-04dZ8d9ZPqMOXlEMC7pWoh637YyvvbR4SypcznrUqIxJZijid-oFtPHhFg=s1600'
  },
  {
    name: 'Deal #02 (Handi Meal)',
    description: '1 Full Chicken Handi, 4 Fresh Tandoori Rotis, Raita, and Fresh Salad.',
    price: 2100,
    category: 'Deals',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Deal #04 (Daal Mash Meal)',
    description: '1 Special Daal Mash, 2 Tandoori Rotis, Raita, and Salad.',
    price: 1450,
    category: 'Deals',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Special Iftar Box (Ramzan)',
    description: 'Includes Khajoor, Pakoras, Samosas, Rolls, and a refreshing drink.',
    price: 850,
    category: 'Ramzan Specials',
    image: '/src/assets/iftar_box.png'
  },
  {
    name: 'Desi Hut Special Mutton Karahi',
    description: 'Premium mutton cooked in traditional desi style with juicy tomatoes and aromatic spices.',
    price: 3200,
    category: 'Mutton Specialties',
    image: 'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tiffin Service (Monthly)',
    description: 'Homemade style meals delivered daily to your workplace or home in Umerkot.',
    price: 12000,
    category: 'Services',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Chicken Tikka (Chest)',
    description: 'Succulent chicken piece marinated in secret yogurt spices and grilled over hot charcoal.',
    price: 450,
    category: 'Barbecue',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80'
  }
]

async function reseed() {
  console.log('Cleaning database...')
  const { error: deleteError } = await supabase.from('products').delete().gte('id', 0)
  if (deleteError) {
    console.error('Delete Error:', deleteError.message)
    return
  }

  console.log('Seeding clean data...')
  const { error: insertError } = await supabase.from('products').insert(cleanData)
  if (insertError) {
    console.error('Insert Error:', insertError.message)
  } else {
    console.log('Database re-seeded successfully with 7 clean items.')
  }
}

reseed()
