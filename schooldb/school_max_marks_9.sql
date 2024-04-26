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
-- Table structure for table `max_marks_9`
--

DROP TABLE IF EXISTS `max_marks_9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `max_marks_9` (
  `max_marks_id` int DEFAULT NULL,
  `subject_name` text,
  `pen_paper_1_max` int DEFAULT NULL,
  `pen_paper_2_max` int DEFAULT NULL,
  `pen_paper_3_max` int DEFAULT NULL,
  `Multiple_Assessment` int DEFAULT NULL,
  `Portfolio` int DEFAULT NULL,
  `Sub_Enrichment` int DEFAULT NULL,
  `annual_exam` int DEFAULT NULL,
  `grand_total` int DEFAULT NULL,
  `theory_max` text,
  `practical_max` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `max_marks_9`
--

LOCK TABLES `max_marks_9` WRITE;
/*!40000 ALTER TABLE `max_marks_9` DISABLE KEYS */;
INSERT INTO `max_marks_9` VALUES (1,'english',15,5,5,5,5,5,80,100,'',''),(2,'science',5,5,5,5,5,5,80,100,'',''),(3,'hindi',5,15,5,5,5,5,80,100,'',''),(4,'math',5,5,5,5,5,5,80,100,'',''),(5,'punjabi',5,5,5,5,5,5,80,100,'',''),(6,'social_science',5,5,5,5,5,5,80,100,'',''),(7,'IT',5,5,5,5,5,5,80,100,'70','30');
/*!40000 ALTER TABLE `max_marks_9` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-26 11:20:37
