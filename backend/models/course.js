const db = require('../config/config');

const Course = {};

Course.findAll = (result) => {
  const sql = `SELECT id, title, description, duration, url, image, created_at, updated_at FROM courses`;
  db.query(sql, (err, courses) => {
    if (err) {
      console.log('Error al listar cursos: ', err);
      result(err, null);
    } else {
      console.log('Cursos encontrados: ', courses.length);
      result(null, courses);
    }
  });
};

Course.findById = (id, result) => {
  const sql = `SELECT id, title, description, duration, url, image, created_at, updated_at FROM courses WHERE id = ?`;
  db.query(sql, [id], (err, course) => {
    if (err) {
      console.log('Error al consultar curso: ', err);
      result(err, null);
    } else {
      console.log('Curso consultado: ', course[0]);
      result(null, course[0]);
    }
  });
};

Course.create = (course, result) => {
  const sql = `INSERT INTO courses(title, description, duration, url, image, created_at, updated_at) VALUES (?,?,?,?,?,?,?)`;
  db.query(sql,
    [
      course.title,
      course.description,
      course.duration,
      course.url,
      course.image,
      new Date(),
      new Date()
    ], (err, res) => {
      if (err) {
        console.log('Error al crear curso: ', err);
        result(err, null);
      } else {
        console.log('Curso creado: ', { id: res.insertId, ...course });
        result(null, { id: res.insertId, ...course });
      }
    }
  );
};

Course.update = (course, result) => {
  let fields = [];
  let values = [];

  if (course.title)       { fields.push('title = ?');       values.push(course.title); }
  if (course.description) { fields.push('description = ?'); values.push(course.description); }
  if (course.duration)    { fields.push('duration = ?');    values.push(course.duration); }
  if (course.url)         { fields.push('url = ?');         values.push(course.url); }
  if (course.image)       { fields.push('image = ?');       values.push(course.image); }

  fields.push('updated_at = ?');
  values.push(new Date());

  const sql = `UPDATE courses SET ${fields.join(', ')} WHERE id = ?`;
  values.push(course.id);

  db.query(sql, values, (err, res) => {
    if (err) {
      console.log('Error al actualizar curso: ', err);
      result(err, null);
    } else {
      console.log('Curso actualizado: ', { id: course.id, ...course });
      result(null, { id: course.id, ...course });
    }
  });
};

Course.delete = (id, result) => {
  const sql = `DELETE FROM courses WHERE id = ?`;
  db.query(sql, [id], (err, res) => {
    if (err) {
      console.log('Error al eliminar curso: ', err);
      result(err, null);
    } else {
      console.log('Curso eliminado con id: ', id);
      result(null, res);
    }
  });
};

module.exports = Course;
