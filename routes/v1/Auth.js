var router = express.Router();

router.post('/login', userController.createNewUser);

module.exports=router