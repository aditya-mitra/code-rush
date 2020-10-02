import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'


const options = {
    providers: [
        Providers.Google({
            clientId: process.env.FRONT_GOOGLE_CLIENT_ID,
            clientSecret: process.env.FRONT_GOOGLE_CLIENT_SECRET
        }),
        Providers.GitHub({
            clientId: process.env.FRONT_GITHUB_CLIENT_ID,
            clientSecret: process.env.FRONT_GITHUB_CLIENT_SECRET
        }),
    ],
    database: process.env.FRONT_DB_URL,

    secret: process.env.FRONT_SESSION_SECRET,

    session: {
        jwt: true,
    },

    jwt: {
        secret: process.env.FRONT_JWT_SECRET,
    },

    pages: {
    },

    callbacks: {
        signIn: async (user, account, profile) => {
            if (account.provider !== 'github') return;

            const res = await fetch('https://api.github.com/user/emails', {
                headers: {
                    'Authorization': `token ${account.accessToken}`
                }
            })
            const emails = await res.json()
            if (!emails || emails.length === 0) {
                return;
            }
            const sortedEmails = emails.sort((a, b) => b.primary - a.primary)
            user.email = sortedEmails[0].email

        },
    },

    events: {},

    debug: process.env.NODE_ENV === 'development',
}

export default (req, res) => NextAuth(req, res, options)
