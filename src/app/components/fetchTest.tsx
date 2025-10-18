import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function TestPage() {
    const { data, error } = await supabase
        .from('Tournament')
        .select('*')

    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            <h1>Turniere:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}