'use client'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleLogin = () => {
        supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                // This must match your Supabase redirect settings
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
            <h1>The Humor Project™</h1>
            <p>Please log in to see the protected captions list.</p>
            <button
                onClick={handleLogin}
                style={{ padding: '12px 24px', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Sign in with Google
            </button>
        </div>
    )
}