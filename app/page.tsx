import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default async function Home() {

    const { data, error } = await supabase
        .from('captions')
        .select('*');

    if (error) {
        console.error('Error fetching data:', error);
    }

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Supabase Captions</h1>

            {error && <p style={{color: 'red'}}>Error loading data: {error.message}</p>}

            {}
            <div style={{ display: 'grid', gap: '1rem' }}>
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <div key={item.id} style={{
                            border: '1px solid #ddd',
                            padding: '1rem',
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            {/* NOTE: Make sure 'text' or 'content' matches your Supabase column name! */}
                            <p style={{ fontSize: '1.1rem', margin: 0 }}>
                                {item.text || item.content || item.caption || JSON.stringify(item)}
                            </p>
                            <small style={{ color: '#666' }}>ID: {item.id}</small>
                        </div>
                    ))
                ) : (
                    <p>No data found in the 'captions' table.</p>
                )}
            </div>
        </main>
    );
}