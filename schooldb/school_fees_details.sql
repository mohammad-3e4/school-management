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
-- Table structure for table `fees_details`
--

DROP TABLE IF EXISTS `fees_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fees_details` (
  `Fees_detail_id` int NOT NULL AUTO_INCREMENT,
  `class_value` varchar(45) DEFAULT NULL,
  `Basic_fees` int NOT NULL,
  `tution_fees` varchar(45) DEFAULT NULL,
  `parking_fees` varchar(45) DEFAULT NULL,
  `transport_fees` varchar(45) DEFAULT NULL,
  `obc_relaxation` varchar(45) DEFAULT NULL,
  `sc_relaxation` varchar(45) DEFAULT NULL,
  `ews_relaxation` varchar(45) DEFAULT NULL,
  `bpl_relaxation` varchar(45) DEFAULT NULL,
  `st_relaxation` varchar(45) DEFAULT NULL,
  `quota_relaxation` varchar(45) DEFAULT NULL,
  `other_realxation` varchar(45) DEFAULT NULL,
  `due_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Fees_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fees_details`
--

LOCK TABLES `fees_details` WRITE;
/*!40000 ALTER TABLE `fees_details` DISABLE KEYS */;
INSERT INTO `fees_details` VALUES (2,'nursery',6000,'0','30','50','2','5','5','5','8','6','0','10'),(8,'1',500,'50','50',NULL,'5','5','5','5','5','5','5','5'),(9,'5',2000,'200','20',NULL,'2','5','5','5','8','6','','10'),(10,'9',9000,'900','90',NULL,'2','','5','5','','','','9');
/*!40000 ALTER TABLE `fees_details` ENABLE KEYS */;
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
