import express from "express";
import { addUser, adminLogin, dashboard, deleteUser, editUser, signOut, userData } from "../controllers/admin.controller.js";

const router = express.Router();
router.post("/login", adminLogin);
router.get("/dashboard", dashboard);
router.delete("/delete/:id", deleteUser)
router.get('/edit/:id', userData)
router.post('/edit/:id', editUser)
router.post('/add/user', addUser)
router.get('/signout', signOut)


export default router;
