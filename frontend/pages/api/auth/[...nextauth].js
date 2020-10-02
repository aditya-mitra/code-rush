import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'


const options = {
    providers: [
        Providers.Google({
            clientId: process.env.FRONT_GOOGLE_CLIENT_ID,
            clientSecret: process.env.FRONT_GOOGLE_CLIENT_SECRET
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
    },

    events: {},

    debug: process.env.NODE_ENV === 'development',
}

export default (req, res) => NextAuth(req, res, options)
