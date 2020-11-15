// ===== Pages
// import all modules
const express				= require('express');

// import all controllers
const appController	= require('../controllers/appController');
const authController	= require('../controllers/authController');

// init router
const router				= express.Router();

// Public Endpoint
router.get('/', appController.home);
router.post('/login', authController.login);

// Questions Endpoint (User only)
router.get('/questions/user', authController.isUser);
router.get('/questions/user', appController.getQuestions);
router.put('/answer', authController.isUser);
router.put('/answer', appController.answer);

// Check all score endpoint (Admin Only)
router.get('/admin/user/detail', authController.isAdmin);
router.get('/admin/user/detail', appController.getUsersDetail);

// Check user score endpoint (Admin Only)
router.get('/user/detail', authController.isUser);
router.get('/user/detail', appController.getUserDetail);

// Register Endpoint (Admin only)
router.post('/register', authController.isAdmin);
router.post('/register', authController.register);

// Questions Endpoint (Admin only)
router.post('/questions', authController.isAdmin);
router.post('/questions', appController.addQuestion);
router.get('/questions/admin', authController.isAdmin);
router.get('/questions/admin', appController.getAllQuestions);


module.exports = router;
