import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { supabaseAdmin } from '@/lib/supabase'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM || 'noreply@dedestination.com',
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // Upsert user in Supabase
      if (user.email) {
        await supabaseAdmin.from('users').upsert({
          email: user.email,
          name: user.name,
          image: user.image,
        }, { onConflict: 'email' })
      }
      return true
    },

    async session({ session, token }) {
      if (session.user?.email) {
        const { data } = await supabaseAdmin
          .from('users')
          .select('id, phone, address')
          .eq('email', session.user.email)
          .single()
        if (data) {
          (session.user as any).id = data.id
          ;(session.user as any).phone = data.phone
          ;(session.user as any).address = data.address
        }
      }
      return session
    },
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
