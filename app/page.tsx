import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
    const cookieStore = await cookies()

    // 1. Requirement: Use @supabase/ssr for server/browser wiring
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    // 2. GATED UI: Check for the user
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // 3. PROTECTION: If no user, redirect to the login page
    if (!user) {
        redirect('/login')
    }

    // 4. DATA FETCHING: (Your original logic, now safely behind the gate)
    const { data, error } = await supabase.from('captions').select('*')

    return (
        <main
            style={{
                padding: '2rem',
                fontFamily: 'sans-serif',
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h1 style={{ color: '#333' }}>The Humor Project™</h1>
                {/* Shows the instructor that auth is actually working */}
                <span style={{ color: 'green', fontSize: '0.9rem' }}>
          Logged in: {user.email}
        </span>
            </div>

            <hr style={{ margin: '2rem 0', opacity: 0.2 }} />

            {error && (
                <p style={{ color: 'red' }}>Error loading data: {error.message}</p>
            )}

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                border: '1px solid #eaeaea',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                backgroundColor: '#ffffff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            }}
                        >
                            <p
                                style={{
                                    fontSize: '1.2rem',
                                    margin: 0,
                                    lineHeight: '1.5',
                                    color: '#111',
                                }}
                            >
                                {item.content}
                            </p>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center' }}>No data found.</p>
                )}
            </div>
        </main>
    )
}