module.exports = {
  DATABASE_URI: process.env.DATABSE_URI,
  JWT_KEY: process.env.JWT_KEY,
  NODEMAILER_AUTH: {
    EMAIL_AUTH: {
      email: process.env.NODEMAILER_EMAIL,
      password: process.env.NODEMAILER_PASSWORD
    },
    PORT: process.env.NODEMAILER_PORT,
    HOST: process.env.NODEMAILER_HOST
  }
};
