import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function Home() {
    // Fetch data from a pre-existing table.
    // NOTE: I am using 'countries' as a placeholder.
    // Change 'countries' to match your actual table name if it is different.
    const { data, error } = await supabase
        .from('countries')
        .select('*');

    if (error) {
        console.error('Error fetching data:', error);
    }

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Supabase Data List</h1>

            {/* Display error message if fetching fails */}
            {error && <p style={{color: 'red'}}>Error loading data: {error.message}</p>}

            {/* Display the data in a list format */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {data && data.map((item) => (
                    <li key={item.id} style={{
                        border: '1px solid #ccc',
                        margin: '10px 0',
                        padding: '10px',
                        borderRadius: '5px'
                    }}>
                        {/* Customize this line based on your table columns */}
                        <strong>{item.name || 'No Name'}</strong>
                    </li>
                ))}
            </ul>
        </main>
    );
}