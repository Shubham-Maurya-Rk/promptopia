import User from "@/models/User"
import connectToDB from "@/utils/database"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
        // ...add more providers here
    ],
    callbacks:{
        async session({session}) {
            const sessionUser = await User.findOne({email: session.user.email})
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({user}) {
            try {
                await connectToDB()
                const userExists = await User.findOne({email: user.email})
                if(!userExists) {
                    await User.create({
                        email: user.email,
                        username: user.name.replace(" ", "").toLowerCase(),
                        image: user.image
                    })
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
})

export {handler as GET, handler as POST};