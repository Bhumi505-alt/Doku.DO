import express from "express";
import {
  
  getAllUsers,
  
  login,
  createUser,
  getMyProfile,
  logout
} from "../controllers.js/usercontroller.js";
import { isAuthenticated } from "../middleware/user.auth.js";
import { deletetask, updateTask } from "../task.js";

const router = express.Router();


router.get("/all", getAllUsers);
router.post("/new", createUser);
router.post("/login",login);
router.get("/me", isAuthenticated, getMyProfile);
router.patch("/update/:id", updateTask);
router.delete("/delete/:id", deletetask);
router.get("/logout", logout)

export default router;
