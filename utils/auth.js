import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
    providers: [
            CredentialsProvider({
                async authorize(credentials) {
                    console.log('Credentials:', credentials)
                    const res = await fetch('http://localhost:3000/api/login', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        emailOrNickname: credentials.emailOrNickname,
                        password: credentials.password})
                })
                const user = await res.json()
                console.log('User:', user)
                if (res.ok && user.userId && user.role) return user
                return null
                }
            })
    ],
    callbacks: {
        async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
            token.accessToken = account.access_token
        }
        return token
        },
        async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        return session
        }
    }
}