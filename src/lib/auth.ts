import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  
    if (!clientId || clientId.length === 0) {
      throw new Error('Missing Google_CLIENT_ID')
    }
  
    if (!clientSecret || clientSecret.length === 0) {
      throw new Error('Missing Google_CLIENT_SECRET')
    }
  
    return { clientId, clientSecret }
}

export const authOptions:NextAuthOptions = {
    adapter:UpstashRedisAdapter(db),
    session:{
        strategy:"jwt",
    },
    secret:process.env.JWT_SECRET,
    pages:{
        signIn:"/login",
    },
    providers:[
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        })
    ],
    callbacks:{
        async jwt({token,user}){

            const dbUser = await db.get(`user:${token.id}`) as User|null

            if(!dbUser){
                token.id = user!.id
                console.log(token)
                return token
            }
            return {
                id:dbUser.id,
                name:dbUser.name,
                email:dbUser.email,
                picture:dbUser.image
            }
        },
        async session({ session, token }) {
            if (token) {
              session.user.id = token.id
              session.user.name = token.name
              session.user.email = token.email
              session.user.image = token.picture
            }

            return session
        },
        redirect() {
          return '/dashboard'
        },
    }
}