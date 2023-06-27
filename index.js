import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import FileUpoad from "express-fileupload";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import AssetRoute from "./routes/AssetRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import db from "./config/Database.js";

dotenv.config();

const app = express();

const sessionStore = new (SequelizeStore(session.Store))({
  db: db,
});

(async () => {
  await db.sync();
})();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(FileUpoad());
app.use(express.static("public"));
app.use(UserRoute);
app.use(AuthRoute);
app.use(AssetRoute);
app.use(CategoryRoute);

sessionStore.sync();

app.get("/", (req, res) => res.send("<h1>Hello World</h1>"));

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running");
});
