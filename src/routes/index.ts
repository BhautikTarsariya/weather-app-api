import { Application, Request, Response, Router } from "express";

import auth from "./authRoutes";
import favorite from "./favoriteRoutes";
import weather from "./weatherRoutes";
import { verifyToken } from "../middlewares/auth";

const registerRoutes = (app: Application) => {
  const router: Router = Router();
  router.use(favorite);
  router.use(weather);

  router.use("/*", (req: Request, res: Response) => {
    res.status(404).send("Not found");
  });
  app.use("/auth", auth);
  app.use("/api", verifyToken, router);
};

export default registerRoutes;
