const Course = require('../models/course');

module.exports = {
  getAllCourses(req, res) {
    Course.findAll((err, courses) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error al listar cursos',
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Lista de cursos',
        data: courses,
      });
    });
  },

  getCourseById(req, res) {
    const id = req.params.id;
    Course.findById(id, (err, course) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error al consultar el curso',
          error: err,
        });
      }
      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Curso no encontrado',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Curso encontrado',
        data: course,
      });
    });
  },

  createCourse(req, res) {
    const course = req.body;
    Course.create(course, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error al crear el curso',
          error: err,
        });
      }
      return res.status(201).json({
        success: true,
        message: 'Curso creado correctamente',
        data: data,
      });
    });
  },

  updateCourse(req, res) {
    const course = req.body;
    Course.update(course, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error al actualizar el curso',
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Curso actualizado',
        data: data,
      });
    });
  },

  deleteCourse(req, res) {
    const id = req.params.id;
    Course.delete(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error al eliminar el curso',
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Curso eliminado',
        data: data,
      });
    });
  },
};
