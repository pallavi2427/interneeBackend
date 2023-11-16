import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import sequelize from "./models/db.sequlize";
import * as routes from "./router/index";
import { uploadFile } from "./utils/multer";
require("dotenv").config();

const PORT = 8080;

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    routes.initRoutes(this.app);

    // Sync the Sequelize models with the database
    sequelize
      .sync()
      .then(() => {
        console.log("Database synced successfully.");
        this.startServer();
      })
      .catch((error) => {
        console.error("Error syncing database:", error);
      });
  }

  private config(): void {
    this.app.use(
      cors({
        optionsSuccessStatus: 200,
      })
    );
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(uploadFile)
  }

  private startServer(): void {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  }
}

export default new App().app;
