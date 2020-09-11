import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'


const options = {
  providers: [
    Providers.Email({
      server: {
        host: 'smtp.sendgrid.net',
        port: '25',
        auth: {
          user: process.env.FRONT_EMAIL_USER,
          pass: process.env.FRONT_EMAIL_PASSWORD
        }
      },
      from: process.env.FRONT_EMAILER
    }),
    Providers.Google({
      clientId: process.env.FRONT_GOOGLE_CLIENTID,
      clientSecret: process.env.FRONT_GOOGLE_CLIENTSECRET
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

  events: { },

  debug: true,
}

export default (req, res) => NextAuth(req, res, options)
