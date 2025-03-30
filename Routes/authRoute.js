import express from 'express';
import { signup } from '../Controllers/authController.js';

const route = express.Router();

route.post('/signup', signup);

export default route;