// const mongo_credentiasl = {
//   user: "jhonasv",
//   password: "hola1234",
//   db: "groupcon"
// };
// module.exports = {
//   // DATABASE_URI: "mongodb://127.0.0.1:27017/groupcon",
//   DATABASE_URI: `mongodb://${mongo_credentiasl.user}:${mongo_credentiasl.password}@ds145146.mlab.com:45146/${mongo_credentiasl.db}`,
//   JWT_KEY: "dsadasd4sa65d4as56d46as5d46as5d46a5s"
// };

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
