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
-- Table structure for table `max_marks_2`
--

DROP TABLE IF EXISTS `max_marks_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `max_marks_2` (
  `max_marks_id` int DEFAULT NULL,
  `subject_name` text,
  `pen_paper_term1_pt1` int DEFAULT NULL,
  `multiple_assessment_term1_pt1` int DEFAULT NULL,
  `pen_paper_term1_pt2` int DEFAULT NULL,
  `multiple_assessment_term1_pt2` int DEFAULT NULL,
  `pen_paper_term1_pt3` int DEFAULT NULL,
  `multiple_assessment_term1_pt3` int DEFAULT NULL,
  `best_of_two_term1` int DEFAULT NULL,
  `weightage_term1` int DEFAULT NULL,
  `portfoilo_term1` int DEFAULT NULL,
  `sub_enrich_act_term1` int DEFAULT NULL,
  `hly_exam_term1` int DEFAULT NULL,
  `total_marks_term1` int DEFAULT NULL,
  `pen_paper_term2_pt1` int DEFAULT NULL,
  `multiple_assessment_term2_pt1` int DEFAULT NULL,
  `pen_paper_term2_pt2` int DEFAULT NULL,
  `multiple_assessment_term2_pt2` int DEFAULT NULL,
  `pen_paper_term2_pt3` int DEFAULT NULL,
  `multiple_assessment_term2_pt3` int DEFAULT NULL,
  `best_of_two_term2` int DEFAULT NULL,
  `weightage_term2` int DEFAULT NULL,
  `portfoilo_term2` int DEFAULT NULL,
  `sub_enrich_act_term2` int DEFAULT NULL,
  `annual_exam_term2` int DEFAULT NULL,
  `total_marks_term2` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `max_marks_2`
--

LOCK TABLES `max_marks_2` WRITE;
/*!40000 ALTER TABLE `max_marks_2` DISABLE KEYS */;
INSERT INTO `max_marks_2` VALUES (1,'english',5,5,5,5,5,5,20,10,5,5,80,100,5,5,5,5,5,5,20,10,5,5,80,100),(2,'math',5,5,5,5,5,5,20,10,5,5,80,100,5,5,5,5,5,5,20,10,5,5,80,100),(3,'punjabi',5,5,5,5,5,5,20,10,5,5,80,100,5,5,5,5,5,5,20,10,5,5,80,100);
/*!40000 ALTER TABLE `max_marks_2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-26 11:20:39
