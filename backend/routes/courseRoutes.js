const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Rutas públicas (cualquier usuario autenticado puede ver cursos)
router.get('/', verifyToken, courseController.getAllCourses);
router.get('/:id', verifyToken, courseController.getCourseById);

// Rutas solo para admin
router.post('/create', verifyToken, authorizeRoles(['admin']), courseController.createCourse);
router.put('/:id', verifyToken, authorizeRoles(['admin']), courseController.updateCourse);
router.delete('/delete/:id', verifyToken, authorizeRoles(['admin']), courseController.deleteCourse);

module.exports = router;
