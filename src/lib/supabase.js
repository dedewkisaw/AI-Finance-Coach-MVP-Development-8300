import {createClient} from '@supabase/supabase-js'

// Your Supabase credentials
const SUPABASE_URL = 'https://xvvpgvgdwhuyouwiyen.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2dnBndmdkd2h1eW91d2l5ZW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTA2OTYsImV4cCI6MjA2NjM2NjY5Nn0.xlO4EM5woaScbt3kyCInC-TBlKNHOdlVtjx-LHlwWEc'

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

export default supabase