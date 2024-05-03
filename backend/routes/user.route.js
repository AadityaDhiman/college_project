import {Router} from 'express'
const router = Router()
import userController from "../controllers/user.controller.js";
import bodyParser from 'body-parser';

router.use(bodyParser.urlencoded({
    extended: true
}))

router.use(bodyParser.json())


router.route('/')
    .post(userController.signupController)
    .get(userController.getAllUsers);

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById);

router.post('/login', userController.loginController);





export default router


