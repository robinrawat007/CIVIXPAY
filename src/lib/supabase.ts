import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    if (import.meta.env.PROD) {
        // In production, a missing key is a hard error — throw so the app doesn't silently use a broken client
        throw new Error(
            '[CivixPay] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. ' +
            'Add these to your environment variables.'
        );
    } else {
        // In development, just warn so local UI work without a DB still works
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
