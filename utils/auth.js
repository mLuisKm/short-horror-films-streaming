import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
    providers: [
            CredentialsProvider({
                async authorize(credentials) {
                    const res = await fetch('http://localhost:3000/api/login', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        emailOrNickname: credentials.emailOrNickname,
                        password: credentials.password})
                })
                const user = await res.json()
                if (res.ok && user.userId && user.role) return user
                return null
                }
            })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
            token.userId = user.userId;
            token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
            id: token.userId,
            role: token.role
            };
            return session;
        }
    }
}