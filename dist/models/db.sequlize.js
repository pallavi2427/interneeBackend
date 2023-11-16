"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("intern", "root", "", {
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
sequelize.authenticate().then(function (errors) {
    console.log(errors);
});
exports.default = sequelize;
//# sourceMappingURL=db.sequlize.js.map