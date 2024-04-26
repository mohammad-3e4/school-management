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
-- Table structure for table `fees`
--

DROP TABLE IF EXISTS `fees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fees` (
  `fees_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `basic_fees` varchar(45) DEFAULT NULL,
  `due_basic_fees` varchar(45) DEFAULT NULL,
  `tution_fees` varchar(45) DEFAULT NULL,
  `due_tution_fees` varchar(45) DEFAULT NULL,
  `total_bus_fees` varchar(45) DEFAULT NULL,
  `paid_bus_fees` varchar(45) DEFAULT NULL,
  `due_bus_fees` varchar(45) DEFAULT NULL,
  `parking_fees` varchar(45) DEFAULT NULL,
  `due_parking_fees` varchar(45) DEFAULT NULL,
  `total_fees` varchar(45) DEFAULT NULL,
  `paid_fees` varchar(45) DEFAULT NULL,
  `due_fees` varchar(45) DEFAULT NULL,
  `date_time` varchar(45) DEFAULT NULL,
  `payment_method` varchar(45) DEFAULT NULL,
  `months` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`fees_id`),
  KEY `fs_key_idx` (`student_id`),
  CONSTRAINT `fs_key` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fees`
--

LOCK TABLES `fees` WRITE;
/*!40000 ALTER TABLE `fees` DISABLE KEYS */;
INSERT INTO `fees` VALUES (1,1,'20','1980','20','180','20','20','0','20','0','2240','80','2160','2024-03-31','Cash','January,February,March'),(2,4,'2000','7000','800','100','50','50','0','80','10','10040','2930','7110','2024-04-01','Online','January,February,March'),(3,2,'2000','0','200','0','50','50','0','20','0','2270','2270','0','2024-04-01','Online','January'),(4,4,'9000','0','900','0','50','50','0','90','0','10040','10040','0','2024-04-01','Cheque','April,May'),(5,5,'8000','1000','900','0','90','90','0','90','0','10080','9080','1000','2024-04-01','Cheque','January,February,March'),(6,4,'','9000','','900','','','0','','90','9990','','9990','2024-04-09','Online','January,February,March');
/*!40000 ALTER TABLE `fees` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-26 11:20:35
