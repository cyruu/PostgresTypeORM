import { Router } from "express";
import {
  createNewUser,
  getAllUsers,
  updateUser,
} from "../controllers/userController";
import {
  validatePassedUserId,
  validateUser,
} from "../middlewares/uesrs/userValidations";
import { authenticateToken } from "../middlewares/authValidation";

const router = Router();

router.get("/getallusers", authenticateToken, getAllUsers);

router.post("/createnewuser", validateUser, createNewUser);

router.put(
  "/updateuser/:userid",
  validatePassedUserId,
  validateUser,
  updateUser
);

export default router;
