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
-- Table structure for table `biodaata`
--

DROP TABLE IF EXISTS `biodaata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `biodaata` (
  `student_id` int DEFAULT NULL,
  `admission_no` text,
  `student_name` text,
  `class_name` int DEFAULT NULL,
  `section` text,
  `roll_no` text,
  `father_name` text,
  `mother_name` text,
  `date_of_birth` text,
  `address` text,
  `alternative_phone_no` text,
  `father_occupation` text,
  `mother_occupation` text,
  `religion` text,
  `reserve_category` text,
  `quota` text,
  `date_of_admission` text,
  `height` text,
  `weight` text,
  `blood_group` text,
  `gender` text,
  `email` text,
  `password` int DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `ews` text,
  `bpl` text,
  `createdAt` text,
  `student_image` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biodaata`
--

LOCK TABLES `biodaata` WRITE;
/*!40000 ALTER TABLE `biodaata` DISABLE KEYS */;
INSERT INTO `biodaata` VALUES (1,'001','pankajbhai',5,'a','01','frehser','32mkldfglk','2024-03-15','chandigarh','07351509125','farmer','homemaker','Muslim','obc','','2024-03-21','','','a','Male','Kasifsaif784@gmail.com',908,9837729235,'','','2024-03-13 09:26:09',NULL),(2,'002','parth',5,'a','02','sdv','jbh','1995-02-02','chd','9562','hnj','edwcfve','hindu','gen',NULL,'2024-03-03',NULL,NULL,'b','Male','p@p.com',908,52,'',NULL,'2021-02-02 00:00:00',NULL),(3,'003','mohammad',5,'a','03','dsf','edfv','1995-11-11','gvfcd','562','gbvfecd','wedcfv','sikh','obc',NULL,'2023-03-02',NULL,NULL,'b','Male','m@m.com',908,6230,NULL,NULL,'2024-03-02 00:00:00',NULL),(4,'004','ajay',9,'a','01','father','mother','1995-12-11','kkfr','752','yhgyuh','hyu','hindu','obc',NULL,'2024-02-02',NULL,NULL,'a','Male','ajay@gmail.com',6,969,NULL,NULL,'2024-03-02 00:00:00',NULL),(5,'005','sahil',9,'a','02','f','m','1995-05-08','mmk','6523','jijnj','jjji','hindu','gen',NULL,'2024-6-5',NULL,NULL,'b','Male','sahil@gmail.com',526,56256,NULL,NULL,'2024-03-02 00:00:00',NULL),(6,'006','gurpreet',11,'a','01','hfgdvs','dsf','1995-05-08','wce','368','io','wefwe','sikh','sc',NULL,'2024-6-5',NULL,NULL,'b','Female','gurpreet@gmail.com',265,55652134654,NULL,NULL,'2024-03-02 00:00:00',NULL),(14,'700','abhishek',11,'a','2','scdvfgbnhj','gjhnklm','1995-05-08','cw','386','tft','wcecw','sikh','sc',NULL,'2024-06-05',NULL,NULL,'a','Male','abhi@gmail.com',6,161,NULL,NULL,'2024-03-02 00:00:00',NULL),(15,'800','manpreet',6,'a','1','xcwc','vrev','1995-05-08','sdcre','452','85jg','gj','sikh','gen',NULL,'2024-06-05',NULL,NULL,'b','Female','M@mm.com',417,56,NULL,NULL,'2024-03-02 00:00:00',NULL),(16,'900','poonam',6,'a','2','wrv','ervrve','1995-05-08','evwce','72082','ih','yjyf','hindu','gen',NULL,'2024-06-05',NULL,NULL,'c','Female','pp@p.com',753,256,NULL,NULL,'2024-03-02 00:00:00',NULL),(17,'1000','payal',6,'a','3','rerv','vrvrv','1995-05-08','vwe','72837','ygj','jyt','hindu','gen',NULL,'2024-06-05',NULL,NULL,'b','Female','ppp@pp.com',742,265,NULL,NULL,'2024-03-02 00:00:00',NULL),(18,'11000','aaa',6,'a','1','meer','test-11','2024-03-15','chandigarh','7351509125','farmer','homemaker','Muslim','obc','','2024-03-21','','','a','Male','test11@gmial.com',123456,9837729235,'','','2024-03-13 00:00:00','');
/*!40000 ALTER TABLE `biodaata` ENABLE KEYS */;
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
