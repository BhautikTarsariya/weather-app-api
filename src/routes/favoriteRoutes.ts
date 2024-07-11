import { Request, Response, Router } from "express";
import * as favoriteController from "../controllers/favoriteController";
import { IResponse } from "../types/IResponse";
import { parseError } from "../utils/helper";

const router: Router = Router();

router.post("/favorites", async (req: Request, res: Response) => {
  let ApiResponse: IResponse = { code: 200, data: "" };
  try {
    ApiResponse.code = 201;
    ApiResponse.data = await favoriteController.addFavorite(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.get("/favorites", async (req: Request, res: Response) => {
  let ApiResponse: IResponse = { code: 200, data: "" };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await favoriteController.getFavorites(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

export default router;
