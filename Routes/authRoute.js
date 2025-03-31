import express from 'express';
import { signup, signIn, google } from '../Controllers/authController.js';

const route = express.Router();

route.post('/signup', signup);
route.post('/signin', signIn);
route.post('/google', google);

export default route;