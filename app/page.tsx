import { createClient } from '@/utils/supabase/server' // Clears the "unused" warning
import { handleVote } from './actions' // Import your mutation logic
import { redirect } from 'next/navigation'

export default async function Home() {
    // 1. Initialize the server client using your helper
    const supabase = await createClient()

    // 2. GATED UI: Check for the user
    const { data: { user } } = await supabase.auth.getUser()

    // 3. PROTECTION: If no user, redirect to login
    if (!user) {
        redirect('/login')
    }

    // 4. DATA FETCHING: Get the captions
    const { data, error } = await supabase.from('captions').select('*')

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ color: '#333' }}>The Humor Project™</h1>
                <span style={{ color: 'green', fontSize: '0.9rem' }}>
                    Logged in: {user.email}
                </span>
            </div>

            <hr style={{ margin: '2rem 0', opacity: 0.2 }} />

            {error && <p style={{ color: 'red' }}>Error loading data: {error.message}</p>}

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <div key={item.id} style={{ border: '1px solid #eaeaea', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#111' }}>
                                {item.content}
                            </p>

                            {/* --- NEW VOTING UI SECTION --- */}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {/* Upvote Form */}
                                <form action={async () => {
                                    'use server'
                                    await handleVote(item.id, 1)
                                }}>
                                    <button type="submit" style={{ cursor: 'pointer', padding: '5px 10px' }}>
                                        👍 Upvote
                                    </button>
                                </form>

                                {/* Downvote Form */}
                                <form action={async () => {
                                    'use server'
                                    await handleVote(item.id, -1)
                                }}>
                                    <button type="submit" style={{ cursor: 'pointer', padding: '5px 10px' }}>
                                        👎 Downvote
                                    </button>
                                </form>
                            </div>
                            {/* --- END VOTING UI --- */}
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center' }}>No data found.</p>
                )}
            </div>
        </main>
    )
}