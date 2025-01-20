// routes/index.ts
import { Application} from "express";
import users from "./users"
import Api_user from "./API_user"
import addresses from "./addresses";
import posts from "./posts";
import todos from "./todos";
import albums from "./albums";
import home from "./home";
import images from "./images";

class MainRoutes {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.app.use("/", home);
    this.app.use("/api", Api_user);
    this.app.use("/api/users", users);
    this.app.use("/api/posts", posts);
    this.app.use("/api/todos", todos);
    this.app.use("/api/albums", albums);
    this.app.use("/api/addresses", addresses);
    this.app.use("/api/images", images);
  }
}

export default (app: Application): void => {
  new MainRoutes(app);
};
