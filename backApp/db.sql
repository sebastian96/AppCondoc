-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: appcondoc
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.38-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_alumnos`
--

DROP TABLE IF EXISTS `tb_alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_alumnos` (
  `IdAlumno` int(11) NOT NULL AUTO_INCREMENT,
  `NomAlumno` varchar(45) COLLATE utf8_bin NOT NULL,
  `ApeAlumno` varchar(45) COLLATE utf8_bin NOT NULL,
  `TipDocAlumno` varchar(45) COLLATE utf8_bin NOT NULL,
  `DocumnetoAlumno` varchar(45) COLLATE utf8_bin NOT NULL,
  `HuelllaAlumno` text COLLATE utf8_bin NOT NULL,
  `FotoAlumno` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`IdAlumno`),
  CONSTRAINT `id_user` FOREIGN KEY (`IdAlumno`) REFERENCES `tb_asistencia` (`IdUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_alumnos`
--

LOCK TABLES `tb_alumnos` WRITE;
/*!40000 ALTER TABLE `tb_alumnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_asistencia`
--

DROP TABLE IF EXISTS `tb_asistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_asistencia` (
  `IdAsistencia` int(11) NOT NULL AUTO_INCREMENT,
  `IdProgramacion` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  PRIMARY KEY (`IdAsistencia`),
  KEY `id_alumno_idx` (`IdUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_asistencia`
--

LOCK TABLES `tb_asistencia` WRITE;
/*!40000 ALTER TABLE `tb_asistencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_asistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_calendario`
--

DROP TABLE IF EXISTS `tb_calendario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_calendario` (
  `IdCalendario` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha` date NOT NULL,
  `HoraInicial` time NOT NULL,
  `HoraFinal` time NOT NULL,
  PRIMARY KEY (`IdCalendario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_calendario`
--

LOCK TABLES `tb_calendario` WRITE;
/*!40000 ALTER TABLE `tb_calendario` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_calendario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_colaboradores`
--

DROP TABLE IF EXISTS `tb_colaboradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_colaboradores` (
  `IdColaborador` int(11) NOT NULL AUTO_INCREMENT,
  `NomColaborador` varchar(45) COLLATE utf8_bin NOT NULL,
  `ApeColaborador` varchar(45) COLLATE utf8_bin NOT NULL,
  `CorreoColaborador` varchar(45) COLLATE utf8_bin NOT NULL,
  `TipDocColaborador` varchar(45) COLLATE utf8_bin NOT NULL,
  `DocumentoColaborador` varchar(45) COLLATE utf8_bin NOT NULL,
  `HuellaColaborador` text COLLATE utf8_bin NOT NULL,
  `FotoColaborador` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`IdColaborador`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_colaboradores`
--

LOCK TABLES `tb_colaboradores` WRITE;
/*!40000 ALTER TABLE `tb_colaboradores` DISABLE KEYS */;
INSERT INTO `tb_colaboradores` VALUES (1,'Super','Administrador','super@admin.com','CC','1548789525','','');
/*!40000 ALTER TABLE `tb_colaboradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_curso`
--

DROP TABLE IF EXISTS `tb_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_curso` (
  `IdCurso` int(11) NOT NULL AUTO_INCREMENT,
  `NomCurso` varchar(45) COLLATE utf8_bin NOT NULL,
  `IdMateria` int(11) NOT NULL,
  `IdSalon` int(11) NOT NULL,
  `IdProfesor` int(11) NOT NULL,
  `IdAlumno` int(11) NOT NULL,
  `IdProgramacion` int(11) NOT NULL,
  PRIMARY KEY (`IdCurso`),
  KEY `id_materia_idx` (`IdMateria`),
  KEY `id_alumno_idx` (`IdAlumno`),
  KEY `id_profesores_idx` (`IdProfesor`),
  KEY `id_salon_idx` (`IdSalon`),
  KEY `id_programacion_idx` (`IdProgramacion`),
  CONSTRAINT `id_alumno` FOREIGN KEY (`IdAlumno`) REFERENCES `tb_alumnos` (`IdAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_materia` FOREIGN KEY (`IdMateria`) REFERENCES `tb_materia` (`IdMateria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_profesores` FOREIGN KEY (`IdProfesor`) REFERENCES `tb_profesores` (`IdProfesor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_programacion` FOREIGN KEY (`IdProgramacion`) REFERENCES `tb_programacion` (`IdProgramacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_salon` FOREIGN KEY (`IdSalon`) REFERENCES `tb_salones` (`IdSalon`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_curso`
--

LOCK TABLES `tb_curso` WRITE;
/*!40000 ALTER TABLE `tb_curso` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_cylabos`
--

DROP TABLE IF EXISTS `tb_cylabos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_cylabos` (
  `IdCylabos` int(11) NOT NULL AUTO_INCREMENT,
  `Tema` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`IdCylabos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_cylabos`
--

LOCK TABLES `tb_cylabos` WRITE;
/*!40000 ALTER TABLE `tb_cylabos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_cylabos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_materia`
--

DROP TABLE IF EXISTS `tb_materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_materia` (
  `IdMateria` int(11) NOT NULL AUTO_INCREMENT,
  `NomMateria` varchar(45) COLLATE utf8_bin NOT NULL,
  `FechaMateria` datetime NOT NULL,
  `IdCylabus` int(11) NOT NULL,
  PRIMARY KEY (`IdMateria`),
  KEY `id_cylabos_idx` (`IdCylabus`),
  CONSTRAINT `id_cylabos` FOREIGN KEY (`IdCylabus`) REFERENCES `tb_cylabos` (`IdCylabos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_materia`
--

LOCK TABLES `tb_materia` WRITE;
/*!40000 ALTER TABLE `tb_materia` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_materia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_menu`
--

DROP TABLE IF EXISTS `tb_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_menu` (
  `IdMenu` int(11) NOT NULL AUTO_INCREMENT,
  `TituloMenu` varchar(45) COLLATE utf8_bin NOT NULL,
  `ClaseMenu` varchar(45) COLLATE utf8_bin NOT NULL,
  `UrlMenu` varchar(45) COLLATE utf8_bin NOT NULL,
  `RolId` int(11) NOT NULL,
  PRIMARY KEY (`IdMenu`),
  KEY `id_rol_idx` (`RolId`),
  CONSTRAINT `menu_id` FOREIGN KEY (`RolId`) REFERENCES `tb_rol` (`IdRol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_menu`
--

LOCK TABLES `tb_menu` WRITE;
/*!40000 ALTER TABLE `tb_menu` DISABLE KEYS */;
INSERT INTO `tb_menu` VALUES (1,'Crear Usuarios','fas fa-users','crearUsuarios',4),(2,'Cursos','fab fa-buromobelexperte','GestionCurso',4),(3,'Materias','fas fa-book-open','GestionMaterias',4);
/*!40000 ALTER TABLE `tb_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_profesores`
--

DROP TABLE IF EXISTS `tb_profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_profesores` (
  `IdProfesor` int(11) NOT NULL AUTO_INCREMENT,
  `NomProfesor` varchar(45) COLLATE utf8_bin NOT NULL,
  `ApeProfesor` varchar(45) COLLATE utf8_bin NOT NULL,
  `TipDocProfesor` varchar(45) COLLATE utf8_bin NOT NULL,
  `DocumentoProfesor` varchar(45) COLLATE utf8_bin NOT NULL,
  `HuellaProfesor` text COLLATE utf8_bin NOT NULL,
  `FotoProfesor` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`IdProfesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_profesores`
--

LOCK TABLES `tb_profesores` WRITE;
/*!40000 ALTER TABLE `tb_profesores` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_programacion`
--

DROP TABLE IF EXISTS `tb_programacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_programacion` (
  `IdProgramacion` int(11) NOT NULL AUTO_INCREMENT,
  `IdCurso` int(11) NOT NULL,
  `IdCalendario` int(11) NOT NULL,
  `IdAsistencia` int(11) NOT NULL,
  PRIMARY KEY (`IdProgramacion`),
  KEY `id_calendario_idx` (`IdAsistencia`),
  KEY `id_calendario_idx1` (`IdCalendario`),
  CONSTRAINT `id_asistencia` FOREIGN KEY (`IdAsistencia`) REFERENCES `tb_asistencia` (`IdAsistencia`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_calendario` FOREIGN KEY (`IdCalendario`) REFERENCES `tb_calendario` (`IdCalendario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_programacion`
--

LOCK TABLES `tb_programacion` WRITE;
/*!40000 ALTER TABLE `tb_programacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_programacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rol`
--

DROP TABLE IF EXISTS `tb_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_rol` (
  `IdRol` int(11) NOT NULL AUTO_INCREMENT,
  `NomRol` varchar(45) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`IdRol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rol`
--

LOCK TABLES `tb_rol` WRITE;
/*!40000 ALTER TABLE `tb_rol` DISABLE KEYS */;
INSERT INTO `tb_rol` VALUES (4,'Administrador');
/*!40000 ALTER TABLE `tb_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_salones`
--

DROP TABLE IF EXISTS `tb_salones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_salones` (
  `IdSalon` int(11) NOT NULL AUTO_INCREMENT,
  `NomSalon` varchar(45) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`IdSalon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_salones`
--

LOCK TABLES `tb_salones` WRITE;
/*!40000 ALTER TABLE `tb_salones` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_salones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuarios`
--

DROP TABLE IF EXISTS `tb_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_usuarios` (
  `IdUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(45) COLLATE utf8_bin NOT NULL,
  `Password` varchar(45) COLLATE utf8_bin NOT NULL,
  `IdColaborador` int(11) NOT NULL,
  `IdRol` int(11) NOT NULL,
  PRIMARY KEY (`IdUsuario`),
  KEY `id_colaborador_idx` (`IdColaborador`),
  KEY `id_rol_idx` (`IdRol`),
  CONSTRAINT `id_colaborador` FOREIGN KEY (`IdColaborador`) REFERENCES `tb_colaboradores` (`IdColaborador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_rol` FOREIGN KEY (`IdRol`) REFERENCES `tb_rol` (`IdRol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuarios`
--

LOCK TABLES `tb_usuarios` WRITE;
/*!40000 ALTER TABLE `tb_usuarios` DISABLE KEYS */;
INSERT INTO `tb_usuarios` VALUES (1,'admin','123456',1,4);
/*!40000 ALTER TABLE `tb_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-05 19:59:28
