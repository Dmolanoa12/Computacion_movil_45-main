   DROP DATABASE IF EXISTS db_node;

   CREATE SCHEMA db_node DEFAULT CHARACTER SET utf8 ;
   USE db_node;

   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     lastname VARCHAR(100) NOT NULL,
     email VARCHAR(150) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     phone VARCHAR(20),
     image VARCHAR(255),
     role VARCHAR(20),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   ) ENGINE=InnoDB;

   INSERT INTO users VALUES (
     null,
     "Diana",
     "Molano",
     "carolinamolanoalarcon@outlook.es",
     "$2b$10$NR8eRuuAB12JoHe81ZYnG.i2/5k/D5TKrxc7Pk74W4rgzADdABM9G",
     "3213117512",
     "profile",
     "admin",
     null,
     null
   );

-- Tabla de cursos
USE db_node;

DROP TABLE IF EXISTS courses;

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  duration VARCHAR(50),
  url VARCHAR(500) NOT NULL,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO courses (title, description, duration, url, image) VALUES
('Introducción a Python', 'Aprende Python desde cero con ejercicios prácticos.', '10 horas', 'https://www.coursera.org/learn/python', NULL),
('Desarrollo Web con HTML y CSS', 'Domina los fundamentos del desarrollo web moderno.', '8 horas', 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', NULL),
('JavaScript para Principiantes', 'Aprende programación web interactiva.', '12 horas', 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', NULL),
('React Native: Aplicaciones Móviles', 'Crea apps móviles para iOS y Android.', '15 horas', 'https://reactnative.dev/docs/getting-started', NULL),
('Base de Datos con MySQL', 'Diseña y gestiona bases de datos relacionales.', '6 horas', 'https://www.w3schools.com/mysql/', NULL);