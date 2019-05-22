-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2019 a las 04:50:03
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appcondoc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alumnos`
--

CREATE TABLE `tb_alumnos` (
  `IdAlumno` int(11) NOT NULL,
  `NomAlumno` varchar(45) COLLATE utf8_bin NOT NULL,
  `ApeAlumno` varchar(45) COLLATE utf8_bin NOT NULL,
  `TipDocAlumno` varchar(45) COLLATE utf8_bin NOT NULL,
  `DocumnetoAlumno` varchar(45) COLLATE utf8_bin NOT NULL,
  `HuelllaAlumno` text COLLATE utf8_bin NOT NULL,
  `FotoAlumno` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_asistencia`
--

CREATE TABLE `tb_asistencia` (
  `IdAsistencia` int(11) NOT NULL,
  `IdProgramacion` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_calendario`
--

CREATE TABLE `tb_calendario` (
  `IdCalendario` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `HoraInicial` time NOT NULL,
  `HoraFinal` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_colaboradores`
--

CREATE TABLE `tb_colaboradores` (
  `IdColaborador` int(11) NOT NULL,
  `NomColaborador` varchar(45) COLLATE utf8_bin NOT NULL,
  `ApeColaborador` varchar(45) COLLATE utf8_bin NOT NULL,
  `CorreoColaborador` varchar(45) COLLATE utf8_bin NOT NULL,
  `TipDocColaborador` varchar(45) COLLATE utf8_bin NOT NULL,
  `DocumentoColaborador` varchar(45) COLLATE utf8_bin NOT NULL,
  `HuellaColaborador` text COLLATE utf8_bin,
  `FotoColaborador` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tb_colaboradores`
--

INSERT INTO `tb_colaboradores` (`IdColaborador`, `NomColaborador`, `ApeColaborador`, `CorreoColaborador`, `TipDocColaborador`, `DocumentoColaborador`, `HuellaColaborador`, `FotoColaborador`) VALUES
(1, 'Super', 'Administrador', 'super@admin.com', 'CC', '1548789525', '', ''),
(3, 'sebastian', 'Miranda', 'arqcompu4@gmail.com', 'CC', '1018488631', NULL, 'C:/xampp/htdocs/AppCondoc/src/assets/img/users/gosick96/foto.png'),
(4, 'juan', 'rojas', 'jrojas@books.com', 'CC', '1015848477', NULL, 'assets/img/users/jrojas/foto.png'),
(5, 'sebastian', 'miranda', 'arqcompu4@gmail.com', 'CC', '1018488631', NULL, 'C:/xampp/htdocs/AppCondoc/dist/AppCondoc/assets/img/users/jmirandati/foto.png'),
(6, 'sebastian', 'miranda', 'arqompu4@gmail.com', 'CC', '1018488631', NULL, 'C:/xampp/htdocs/AppCondoc/dist/AppCondoc/assets/img/users/jsmiranda/foto.png'),
(7, 'sebastian', 'miranda', 'arqompu4@gmail.com', 'CC', '1018488631', NULL, 'C:/xampp/htdocs/AppCondoc/dist/AppCondoc/assets/img/users/jsmiranda/foto.png'),
(8, 'david', 'moreno', 'dmoreno@books.com', 'CC', '456789528485', NULL, 'C:/xampp/htdocs/AppCondoc/dist/AppCondoc/assets/img/users/dmoreno/foto.png'),
(9, 'belkis', 'tibaduiza galeano', 'belkistiba@hotmail.com', 'CC', '52339013', NULL, 'C:/xampp/htdocs/AppCondoc/dist/AppCondoc/assets/img/users/belkis/foto.png'),
(10, 'javier', 'rios', 'javier@rios.com', 'CC', '569835269', NULL, 'C:/xampp/htdocs/AppCondoc/dist/AppCondoc/assets/img/users/javierRios/foto.png'),
(11, 'manuel', 'manrique', 'jmata@gmail.com', 'CC', '102456985', NULL, 'assets/img/users/jmata/foto.png'),
(12, 'santiago', 'lopez', 'lopez@hotmail.com', 'TI', '25366451', NULL, 'assets/img/users/lopez/foto.png'),
(17, 'cristian', 'parra', 'cparra@gmail.com', 'TI', '8956232145', NULL, 'assets/img/users/cparra/foto.png'),
(18, 'juan', 'rozo', 'rozo@gmail.com', 'TI', '963258741', NULL, 'assets/img/user.png'),
(19, 'angie', 'velandia', 'angie@yahoo.com', 'TI', '963525758', NULL, 'assets/img/user.png'),
(20, 'laura', 'albao', 'laura@hotmail.es', 'TI', '96589597', NULL, 'assets/img/users/laura/foto.png'),
(21, 'natalia', 'miranda', 'natalia@gmail.com', 'CC', '963214584', NULL, 'assets/img/users/natMiranda/foto.png'),
(22, 'luisa', 'tibaduiza', 'luisa@hotmail.com', 'CC', '563298741', NULL, 'assets/img/users/luisa96/foto.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_curso`
--

CREATE TABLE `tb_curso` (
  `IdCurso` int(11) NOT NULL,
  `NomCurso` varchar(45) COLLATE utf8_bin NOT NULL,
  `IdMateria` int(11) NOT NULL,
  `IdSalon` int(11) NOT NULL,
  `IdProfesor` int(11) NOT NULL,
  `IdAlumno` int(11) NOT NULL,
  `IdProgramacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_cylabos`
--

CREATE TABLE `tb_cylabos` (
  `IdCylabos` int(11) NOT NULL,
  `Tema` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_materia`
--

CREATE TABLE `tb_materia` (
  `IdMateria` int(11) NOT NULL,
  `NomMateria` varchar(45) COLLATE utf8_bin NOT NULL,
  `FechaMateria` datetime NOT NULL,
  `IdCylabus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_menu`
--

CREATE TABLE `tb_menu` (
  `IdMenu` int(11) NOT NULL,
  `TituloMenu` varchar(45) COLLATE utf8_bin NOT NULL,
  `ClaseMenu` varchar(45) COLLATE utf8_bin NOT NULL,
  `UrlMenu` varchar(45) COLLATE utf8_bin NOT NULL,
  `RolId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tb_menu`
--

INSERT INTO `tb_menu` (`IdMenu`, `TituloMenu`, `ClaseMenu`, `UrlMenu`, `RolId`) VALUES
(1, 'Usuarios', 'fas fa-users', 'users', 4),
(2, 'Cursos', 'fab fa-buromobelexperte', 'GestionCurso', 4),
(3, 'Materias', 'fas fa-book-open', 'GestionMaterias', 4),
(4, 'Usuarios', 'fas fa-users', 'users', 7),
(5, 'Cursos', 'fab fa-buromobelexperte', 'GestionCurso', 7),
(6, 'Materias', 'fas fa-book-open', 'GestionMaterias', 7),
(7, 'Programacion', 'fas fa-calendar-alt', 'Programacion', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_profesores`
--

CREATE TABLE `tb_profesores` (
  `IdProfesor` int(11) NOT NULL,
  `NomProfesor` varchar(45) COLLATE utf8_bin NOT NULL,
  `ApeProfesor` varchar(45) COLLATE utf8_bin NOT NULL,
  `TipDocProfesor` varchar(45) COLLATE utf8_bin NOT NULL,
  `DocumentoProfesor` varchar(45) COLLATE utf8_bin NOT NULL,
  `HuellaProfesor` text COLLATE utf8_bin NOT NULL,
  `FotoProfesor` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_programacion`
--

CREATE TABLE `tb_programacion` (
  `IdProgramacion` int(11) NOT NULL,
  `IdCurso` int(11) NOT NULL,
  `IdCalendario` int(11) NOT NULL,
  `IdAsistencia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_rol`
--

CREATE TABLE `tb_rol` (
  `IdRol` int(11) NOT NULL,
  `NomRol` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tb_rol`
--

INSERT INTO `tb_rol` (`IdRol`, `NomRol`) VALUES
(4, 'Administrador'),
(5, 'Registro'),
(6, 'Cordinador'),
(7, 'Director'),
(8, 'Docente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_salones`
--

CREATE TABLE `tb_salones` (
  `IdSalon` int(11) NOT NULL,
  `NomSalon` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuarios`
--

CREATE TABLE `tb_usuarios` (
  `IdUsuario` int(11) NOT NULL,
  `Usuario` varchar(45) COLLATE utf8_bin NOT NULL,
  `Password` varchar(45) COLLATE utf8_bin NOT NULL,
  `IdColaborador` int(11) NOT NULL,
  `IdRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tb_usuarios`
--

INSERT INTO `tb_usuarios` (`IdUsuario`, `Usuario`, `Password`, `IdColaborador`, `IdRol`) VALUES
(1, 'admin', '123456', 1, 4),
(3, 'gosick96', '123456', 3, 7),
(4, 'jrojas', '123456', 4, 7),
(5, 'jmirandati', '123456', 3, 7),
(6, 'jsmiranda', '123456', 3, 5),
(7, 'jsmiranda', '123456', 3, 5),
(8, 'dmoreno', '123456', 8, 7),
(9, 'belkis', '123456', 9, 7),
(10, 'javierRios', '123456', 10, 7),
(11, 'jmata', '123456', 11, 6),
(12, 'lopez', '123456', 12, 6),
(17, 'cparra', '123456', 17, 6),
(18, 'rozo', '123456', 18, 6),
(19, 'angie', '123456', 19, 6),
(20, 'laura', '123456', 20, 6),
(21, 'natMiranda', '123456', 21, 7),
(22, 'luisa96', '123456', 22, 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_alumnos`
--
ALTER TABLE `tb_alumnos`
  ADD PRIMARY KEY (`IdAlumno`);

--
-- Indices de la tabla `tb_asistencia`
--
ALTER TABLE `tb_asistencia`
  ADD PRIMARY KEY (`IdAsistencia`),
  ADD KEY `id_alumno_idx` (`IdUsuario`);

--
-- Indices de la tabla `tb_calendario`
--
ALTER TABLE `tb_calendario`
  ADD PRIMARY KEY (`IdCalendario`);

--
-- Indices de la tabla `tb_colaboradores`
--
ALTER TABLE `tb_colaboradores`
  ADD PRIMARY KEY (`IdColaborador`);

--
-- Indices de la tabla `tb_curso`
--
ALTER TABLE `tb_curso`
  ADD PRIMARY KEY (`IdCurso`),
  ADD KEY `id_materia_idx` (`IdMateria`),
  ADD KEY `id_alumno_idx` (`IdAlumno`),
  ADD KEY `id_profesores_idx` (`IdProfesor`),
  ADD KEY `id_salon_idx` (`IdSalon`),
  ADD KEY `id_programacion_idx` (`IdProgramacion`);

--
-- Indices de la tabla `tb_cylabos`
--
ALTER TABLE `tb_cylabos`
  ADD PRIMARY KEY (`IdCylabos`);

--
-- Indices de la tabla `tb_materia`
--
ALTER TABLE `tb_materia`
  ADD PRIMARY KEY (`IdMateria`),
  ADD KEY `id_cylabos_idx` (`IdCylabus`);

--
-- Indices de la tabla `tb_menu`
--
ALTER TABLE `tb_menu`
  ADD PRIMARY KEY (`IdMenu`),
  ADD KEY `id_rol_idx` (`RolId`);

--
-- Indices de la tabla `tb_profesores`
--
ALTER TABLE `tb_profesores`
  ADD PRIMARY KEY (`IdProfesor`);

--
-- Indices de la tabla `tb_programacion`
--
ALTER TABLE `tb_programacion`
  ADD PRIMARY KEY (`IdProgramacion`),
  ADD KEY `id_calendario_idx` (`IdAsistencia`),
  ADD KEY `id_calendario_idx1` (`IdCalendario`);

--
-- Indices de la tabla `tb_rol`
--
ALTER TABLE `tb_rol`
  ADD PRIMARY KEY (`IdRol`);

--
-- Indices de la tabla `tb_salones`
--
ALTER TABLE `tb_salones`
  ADD PRIMARY KEY (`IdSalon`);

--
-- Indices de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD PRIMARY KEY (`IdUsuario`),
  ADD KEY `id_colaborador_idx` (`IdColaborador`),
  ADD KEY `id_rol_idx` (`IdRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_alumnos`
--
ALTER TABLE `tb_alumnos`
  MODIFY `IdAlumno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_asistencia`
--
ALTER TABLE `tb_asistencia`
  MODIFY `IdAsistencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_calendario`
--
ALTER TABLE `tb_calendario`
  MODIFY `IdCalendario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_colaboradores`
--
ALTER TABLE `tb_colaboradores`
  MODIFY `IdColaborador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tb_curso`
--
ALTER TABLE `tb_curso`
  MODIFY `IdCurso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_cylabos`
--
ALTER TABLE `tb_cylabos`
  MODIFY `IdCylabos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_materia`
--
ALTER TABLE `tb_materia`
  MODIFY `IdMateria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_menu`
--
ALTER TABLE `tb_menu`
  MODIFY `IdMenu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tb_profesores`
--
ALTER TABLE `tb_profesores`
  MODIFY `IdProfesor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_programacion`
--
ALTER TABLE `tb_programacion`
  MODIFY `IdProgramacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_rol`
--
ALTER TABLE `tb_rol`
  MODIFY `IdRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tb_salones`
--
ALTER TABLE `tb_salones`
  MODIFY `IdSalon` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_alumnos`
--
ALTER TABLE `tb_alumnos`
  ADD CONSTRAINT `id_user` FOREIGN KEY (`IdAlumno`) REFERENCES `tb_asistencia` (`IdUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tb_curso`
--
ALTER TABLE `tb_curso`
  ADD CONSTRAINT `id_alumno` FOREIGN KEY (`IdAlumno`) REFERENCES `tb_alumnos` (`IdAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_materia` FOREIGN KEY (`IdMateria`) REFERENCES `tb_materia` (`IdMateria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_profesores` FOREIGN KEY (`IdProfesor`) REFERENCES `tb_profesores` (`IdProfesor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_programacion` FOREIGN KEY (`IdProgramacion`) REFERENCES `tb_programacion` (`IdProgramacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_salon` FOREIGN KEY (`IdSalon`) REFERENCES `tb_salones` (`IdSalon`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tb_materia`
--
ALTER TABLE `tb_materia`
  ADD CONSTRAINT `id_cylabos` FOREIGN KEY (`IdCylabus`) REFERENCES `tb_cylabos` (`IdCylabos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tb_menu`
--
ALTER TABLE `tb_menu`
  ADD CONSTRAINT `menu_id` FOREIGN KEY (`RolId`) REFERENCES `tb_rol` (`IdRol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tb_programacion`
--
ALTER TABLE `tb_programacion`
  ADD CONSTRAINT `id_asistencia` FOREIGN KEY (`IdAsistencia`) REFERENCES `tb_asistencia` (`IdAsistencia`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_calendario` FOREIGN KEY (`IdCalendario`) REFERENCES `tb_calendario` (`IdCalendario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD CONSTRAINT `id_colaborador` FOREIGN KEY (`IdColaborador`) REFERENCES `tb_colaboradores` (`IdColaborador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_rol` FOREIGN KEY (`IdRol`) REFERENCES `tb_rol` (`IdRol`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
