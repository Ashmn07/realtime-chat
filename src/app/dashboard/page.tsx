import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { FC } from 'react'


const Page = async() => {

    const session = await getServerSession(authOptions)
    return(
        <>
            <h1 className='text-red-400'>Hello Logged in user</h1>
            <pre>{JSON.stringify(session)}</pre>
        </>
    )

}

export default Page