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
-- Table structure for table `marks_7_c`
--

DROP TABLE IF EXISTS `marks_7_c`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marks_7_c` (
  `marks_id` int DEFAULT NULL,
  `student_id` text,
  `subject_name` text,
  `pen_paper_term1_pt1` text,
  `multiple_assessment_term1_pt1` text,
  `pen_paper_term1_pt2` text,
  `multiple_assessment_term1_pt2` text,
  `pen_paper_term1_pt3` text,
  `multiple_assessment_term1_pt3` text,
  `best_of_two_term1` text,
  `weightage_term1` text,
  `portfoilo_term1` text,
  `sub_enrich_act_term1` text,
  `hly_exam_term1` text,
  `total_marks_term1` text,
  `final_grade_term1` text,
  `pen_paper_term2_pt1` text,
  `multiple_assessment_term2_pt1` text,
  `pen_paper_term2_pt2` text,
  `multiple_assessment_term2_pt2` text,
  `pen_paper_term2_pt3` text,
  `multiple_assessment_term2_pt3` text,
  `best_of_two_term2` text,
  `weightage_term2` text,
  `portfoilo_term2` text,
  `sub_enrich_act_term2` text,
  `annual_exam_term2` text,
  `total_marks_term2` text,
  `final_grade_term2` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marks_7_c`
--

LOCK TABLES `marks_7_c` WRITE;
/*!40000 ALTER TABLE `marks_7_c` DISABLE KEYS */;
INSERT INTO `marks_7_c` VALUES (1,'','','','','','','','','','','','','','','','','','','','','','','','','','','',''),(2,'','','','','','','','','','','','','','','','','','','','','','','','','','','','');
/*!40000 ALTER TABLE `marks_7_c` ENABLE KEYS */;
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
