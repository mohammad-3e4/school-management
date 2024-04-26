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
-- Table structure for table `marks_9_c`
--

DROP TABLE IF EXISTS `marks_9_c`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marks_9_c` (
  `marks_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `subject_name` text,
  `pen_paper_1_obt` int DEFAULT NULL,
  `periodic_test_1` int DEFAULT NULL,
  `pen_paper_2_obt` int DEFAULT NULL,
  `periodic_test_2` int DEFAULT NULL,
  `pen_paper_3_obt` int DEFAULT NULL,
  `periodic_test_3` int DEFAULT NULL,
  `periodic_test` int DEFAULT NULL,
  `Multiple_Assessment` int DEFAULT NULL,
  `Portfolio` int DEFAULT NULL,
  `Sub_Enrichment` int DEFAULT NULL,
  `annual_exam` int DEFAULT NULL,
  `grand_total` int DEFAULT NULL,
  `final_grade` text,
  `theory_max` text,
  `practical_max` text,
  `theory_obt` text,
  `practical_obt` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marks_9_c`
--

LOCK TABLES `marks_9_c` WRITE;
/*!40000 ALTER TABLE `marks_9_c` DISABLE KEYS */;
INSERT INTO `marks_9_c` VALUES (1,875,'english',18,4,64,4,45,2,4,5,5,4,52,70,'B2',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `marks_9_c` ENABLE KEYS */;
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
