-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: school
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_name` varchar(45) NOT NULL,
  `class_value` varchar(45) NOT NULL,
  `english` varchar(255) DEFAULT 'no',
  `science` varchar(255) DEFAULT 'no',
  `physics` varchar(255) DEFAULT 'no',
  `chemistry` varchar(255) DEFAULT 'no',
  `hindi` varchar(255) DEFAULT 'no',
  `math` varchar(255) DEFAULT 'no',
  `computer` varchar(255) DEFAULT 'no',
  `drawing` varchar(255) DEFAULT 'no',
  `psychology` varchar(255) DEFAULT 'no',
  `evs` varchar(255) DEFAULT 'no',
  `punajbi` varchar(255) DEFAULT 'no',
  `social_science` varchar(255) DEFAULT 'no',
  `physical_education` varchar(255) DEFAULT 'no',
  `biology` varchar(255) DEFAULT 'no',
  `accountancy` varchar(255) DEFAULT 'no',
  `bussiness_studies` varchar(255) DEFAULT 'no',
  `economics` varchar(255) DEFAULT 'no',
  `vocational_music` varchar(255) DEFAULT 'no',
  `sociology` varchar(255) DEFAULT 'no',
  `history` varchar(255) DEFAULT 'no',
  `political_science` varchar(255) DEFAULT 'no',
  `IT` varchar(255) DEFAULT 'no',
  PRIMARY KEY (`class_id`),
  UNIQUE KEY `class_id_UNIQUE` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'1-A','first','yes','no','no','no','no','yes','no','no','no','no','yes','no','no','no','no','no','no','no','no','no','no','no'),(2,'1-B','first','3','no','no','no','no','yes','no','no','no','no','yes','no','no','no','no','no','no','no','no','no','no','no'),(3,'2-A','second','yes','no','no','no','no','yes','no','no','no','no','yes','no','no','no','no','no','no','no','no','no','no','no'),(4,'2-B','second','yes','no','no','no','no','yes','no','no','no','no','yes','no','no','no','no','no','no','no','no','no','no','no'),(5,'3-A','third','yes','no','no','no','no','yes','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no','no'),(6,'3-B','third','yes','no','no','no','no','yes','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no','no'),(7,'4-A','fourth','yes','no','no','no','yes','yes','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no','no'),(8,'4-B','fourth','yes','no','no','no','yes','yes','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no','no'),(9,'5-A','fifth','yes','no','no','no','yes','yes','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no','no'),(10,'5-B','fifth','yes','no','no','no','3','yes','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no','no'),(11,'5-C','fifth','yes','no','no','no','yes','yes','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no','no'),(12,'6-A','sixth','yes','yes','no','no','yes','yes','no','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no'),(13,'6-B','sixth','yes','no','no','no','yes','yes','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no','no'),(14,'6-C','sixth','yes','yes','no','no','yes','yes','no','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no'),(15,'7-A','seventh','yes','yes','no','no','yes','yes','no','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no'),(16,'7-B','seventh','yes','yes','no','no','yes','yes','no','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no'),(17,'7-C','seventh','yes','yes','no','no','yes','yes','yes','yes','no','no','yes','yes','yes','no','no','no','no','no','no','no','no','no'),(18,'8-A','eighth','yes','yes','no','no','no','yes','yes','yes','no','no','yes','yes','yes','no','no','no','no','no','no','no','no','no'),(19,'8-B','eighth','yes','yes','no','no','yes','yes','no','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','no'),(20,'8-C','eighth','yes','yes','no','no','yes','yes','yes','yes','no','no','yes','yes','yes','no','no','no','no','no','no','no','no','no'),(21,'9-A','ninth','yes','yes','no','no','yes','yes','no','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','yes'),(22,'9-B','ninth','yes','yes','no','no','yes','yes','no','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','yes'),(23,'9-C','ninth','yes','yes','no','no','yes','yes','no','no','no','no','yes','yes','no','no','no','no','no','no','no','no','no','yes'),(24,'11-A','eleven','yes','no','yes','yes','no','yes','no','no','no','no','yes','no','yes','yes','no','no','no','yes','no','no','no','no'),(25,'11-B','eleven','yes','no','yes','yes','no','yes','no','no','no','no','no','no','yes','no','no','no','no','yes','no','no','no','no'),(26,'11-C','eleven','yes','no','no','no','no','yes','no','no','no','no','no','no','yes','no','yes','yes','yes','yes','no','no','no','no'),(27,'11-D','eleven','yes','no','no','no','yes','no','no','no','yes','no','yes','no','yes','no','no','no','yes','yes','yes','yes','yes','yes'),(28,'11-E','eleven','yes','no','no','no','yes','no','no','no','yes','no','yes','no','yes','no','no','no','yes','yes','yes','no','yes','no'),(29,'11-F','eleven','yes','no','no','no','yes','no','no','no','no','no','yes','no','yes','no','no','no','no','yes','no','yes','yes','no');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-26 11:20:40
