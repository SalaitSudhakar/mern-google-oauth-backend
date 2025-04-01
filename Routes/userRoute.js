import express from 'express';
import authMiddleware from '../Middlewares/authMiddleware.js'
import { deleteUser, updateUser } from '../Controllers/userController.js';
import upload from './../Config/multer.js';

const route = express.Router();

route.put('/update/:id', authMiddleware, upload.single("profile") ,updateUser);
route.delete('/delete/:id', authMiddleware, deleteUser);

export default route;