import express from "express";
import { newtask , getmytask, updateTask, deletetask , getWeeklyDashboard} from "../task.js";
import { isAuthenticated } from "../middleware/user.auth.js";


const router = express.Router();


router.post("/new",isAuthenticated, newtask);
router.get("/my",isAuthenticated, getmytask);
router.route("/:id").put( isAuthenticated,updateTask).delete( isAuthenticated,deletetask);
router.get("/dashboard/weekly", isAuthenticated, getWeeklyDashboard);




export default router;
