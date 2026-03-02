import { createClient } from '@supabase/supabase-js'

// Vite использует import.meta.env, а не process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Проверка для разработки
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase environment variables are missing!')
    console.error('Create .env file with:')
    console.error('VITE_SUPABASE_URL=your-url')
    console.error('VITE_SUPABASE_ANON_KEY=your-key')
    throw new Error('Supabase configuration error')
}

console.log('✅ Supabase configured for:', supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)