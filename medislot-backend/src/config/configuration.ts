export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
  email: {
    provider: process.env.EMAIL_PROVIDER || 'resend',
    from: process.env.EMAIL_FROM || 'noreply@medislot.com',
    resendApiKey: process.env.RESEND_API_KEY,
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3001',
  },
  environment: process.env.NODE_ENV || 'development',
});
