import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    if (import.meta.env.PROD) {
        // Log loudly but don't hard-throw — a throw here crashes the app
        // before React mounts, resulting in a blank page on Netlify.
        // Instead let the UI handle graceful degradation.
        console.error(
            '[CivixPay] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. ' +
            'Add these to Netlify → Site Settings → Environment Variables and redeploy.'
        );
    } else {
        console.warn(
            '[CivixPay] Supabase env vars not set. DB calls will fail. ' +
            'Copy .env.example to .env and fill in your Supabase project keys.'
        );
    }
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);
