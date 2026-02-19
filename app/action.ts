'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function handleVote(captionId: string, voteValue: number) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")


    const { error } = await supabase
        .from('caption_votes')
        .insert({
            caption_id: captionId,
            user_id: user.id,
            vote: voteValue
        })

    if (error) {
        console.error(error)
        return
    }


    revalidatePath('/')
}