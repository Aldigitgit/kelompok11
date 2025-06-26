import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vydvsjpeiqkymhkfbowl.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5ZHZzanBlaXFreW1oa2Zib3dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTUzMzMsImV4cCI6MjA2NjMzMTMzM30.wH-RkYXQlM6LdbdSqCPzuOKgS4qMPSeJ5eCOT-KA59o'

export const supabase = createClient(supabaseUrl, supabaseKey)