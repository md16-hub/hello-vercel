import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function Home() {
    // Fetch rows from the pre-existing 'captions' table
    const { data, error } = await supabase
        .from('captions')
        .select('*');

    // Logs error to Vercel console if fetch fails
    if (error) {
        console.error('Error fetching data:', error);
    }

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Supabase Captions</h1>
            <p style={{ textAlign: 'center', color: '#666' }}>Assignment #2: Reading from Supabase</p>

            <hr style={{ margin: '2rem 0', opacity: 0.2 }} />

            {/* Display error message if fetching fails */}
            {error && <p style={{ color: 'red' }}>Error loading data: {error.message}</p>}

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <div key={item.id} style={{
                            border: '1px solid #eaeaea',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            {/* Priority check for the 'content' column */}
                            <p style={{ fontSize: '1.2rem', margin: 0, lineHeight: '1.5', color: '#111' }}>
                                {item.content || item.text || item.caption || JSON.stringify(item)}
                            </p>

                            {/* ID included for technical verification, styled subtly */}
                            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#999' }}>
                                <strong>Row ID:</strong> {item.id}
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center' }}>No data found in the "captions" table.</p>
                )}
            </div>
        </main>
    );
}