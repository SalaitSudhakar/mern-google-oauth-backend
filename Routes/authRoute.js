import express from 'express';
import { signup, signIn } from '../Controllers/authController.js';

const route = express.Router();

route.post('/signup', signup);
route.post('/signin', signIn)

export default route;