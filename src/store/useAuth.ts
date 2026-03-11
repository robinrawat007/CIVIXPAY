import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

// Shared profile shape used in store and across components
export interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    kycStatus?: string;
}

interface AuthState {
    user: User | null;
    profile: UserProfile | null;
    isLoading: boolean;
    authModalOpen: boolean;
    intendedPath: string | null;

    // Actions
    setUser: (user: User | null) => void;
    setProfile: (profile: UserProfile | null) => void;
    setLoading: (loading: boolean) => void;
    openAuthModal: (intendedPath?: string) => void;
    closeAuthModal: () => void;
    signOut: () => Promise<void>;
    initializeAuth: () => Promise<() => void>; // returns cleanup function
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    profile: null,
    isLoading: true,
    authModalOpen: false,
    intendedPath: null,

    setUser: (user) => set({ user }),
    setProfile: (profile) => set({ profile }),
    setLoading: (isLoading) => set({ isLoading }),

    openAuthModal: (intendedPath) => set({ authModalOpen: true, intendedPath: intendedPath || null }),
    closeAuthModal: () => set({ authModalOpen: false, intendedPath: null }),

    signOut: async () => {
        set({ isLoading: true });
        await supabase.auth.signOut();
        set({ user: null, profile: null, isLoading: false });
    },

    initializeAuth: async () => {
        set({ isLoading: true });

        const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
            const { data } = await supabase
                .from('profiles')
                .select('id, email, full_name, kyc_status')
                .eq('id', userId)
                .single();

            if (!data) return null;

            return {
                id: data.id,
                email: data.email,
                full_name: data.full_name,
                kycStatus: data.kyc_status,
            };
        };

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user || null;
            set({ user });

            if (user) {
                const profile = await fetchProfile(user.id);
                set({ profile });
            }
        } catch (error) {
            console.error("Error initializing auth:", error);
        } finally {
            set({ isLoading: false });
        }

        // Subscribe to auth state changes
        // IMPORTANT: Store the subscription so it can be cleaned up to prevent memory leaks
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            const user = session?.user || null;
            set({ user });

            if (event === 'SIGNED_IN' && user) {
                // Avoid blocking — fetch profile in background
                fetchProfile(user.id).then((profile) => set({ profile }));
            } else if (event === 'SIGNED_OUT') {
                set({ profile: null, isLoading: false });
            }
        });

        // Return a cleanup function to unsubscribe when app unmounts
        return () => subscription.unsubscribe();
    }
}));
