import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config";

const sequelize = new Sequelize("intern", "root", "", {
  dialect: "mysql",
  host: "127.0.0.1",
  logging: false,
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
});

sequelize.sync();
sequelize.authenticate().then(function (errors: any) {
  console.log(errors);
});
export default sequelize;
