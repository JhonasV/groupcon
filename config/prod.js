const mongo_credentiasl = {
  user: "jhonasv",
  password: "hola1234",
  db: "groupcon"
};
module.exports = {
  // DATABASE_URI: "mongodb://127.0.0.1:27017/groupcon",
  DATABASE_URI: `mongodb://${mongo_credentiasl.user}:${mongo_credentiasl.password}@ds145146.mlab.com:45146/${mongo_credentiasl.db}`,
  JWT_KEY: "dsadasd4sa65d4as56d46as5d46as5d46a5s"
};
