// RS BEAUTY PARLOUR - LIVE SUPABASE CONFIGURATION
const SUPABASE_URL = 'https://kqjzziybvkbkrlpemxdp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable__Fiz46xbWxj8ZQMSmCyo0Q_QxCPMzs2';
const ADMIN_EMAIL = 'admin@rsbeauty.in'; // Agar aapne Supabase Authentication > Users mein koi doosra email banaya hai toh yahan woh likhein

const sb = (SUPABASE_URL !== 'YOUR_SUPABASE_URL' && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
