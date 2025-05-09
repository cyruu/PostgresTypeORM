import { Router } from "express";
import {
  createNewUser,
  getAllUsers,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.get("/getallusers", getAllUsers);

router.post("/createnewuser", createNewUser);

router.put("/updateuser/:userid", updateUser);

export default router;
