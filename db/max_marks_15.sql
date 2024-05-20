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
-- Table structure for table `max_marks_15`
--

DROP TABLE IF EXISTS `max_marks_15`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `max_marks_15` (
  `max_marks_id` int DEFAULT NULL,
  `subject_name` text,
  `term1_art_interest` int DEFAULT NULL,
  `term1_art_creativity` int DEFAULT NULL,
  `term1_art_skill` int DEFAULT NULL,
  `term2_art_interest` int DEFAULT NULL,
  `term2_art_creativity` int DEFAULT NULL,
  `term2_art_skill` int DEFAULT NULL,
  `term1_music_interest` int DEFAULT NULL,
  `term1_music_rhythm` int DEFAULT NULL,
  `term1_music_melody` int DEFAULT NULL,
  `term2_music_interest` int DEFAULT NULL,
  `term2_music_rhythm` int DEFAULT NULL,
  `term2_music_melody` int DEFAULT NULL,
  `term1_personality_courteousness` int DEFAULT NULL,
  `term1_personality_confidence` int DEFAULT NULL,
  `term1_personality_care_of_belonging` int DEFAULT NULL,
  `term1_personality_neatness` int DEFAULT NULL,
  `term1_personality_regularity` int DEFAULT NULL,
  `term1_personality_initiative` int DEFAULT NULL,
  `term1_personality_self_control` int DEFAULT NULL,
  `term1_personality_respect` int DEFAULT NULL,
  `term1_personality_sharing` int DEFAULT NULL,
  `term2_personality_courteousness` int DEFAULT NULL,
  `term2_personality_confidence` int DEFAULT NULL,
  `term2_personality_care_of_belonging` int DEFAULT NULL,
  `term2_personality_neatness` int DEFAULT NULL,
  `term2_personality_regularity` int DEFAULT NULL,
  `term2_personality_initiative` int DEFAULT NULL,
  `term2_personality_self_control` int DEFAULT NULL,
  `term2_personality_respect` int DEFAULT NULL,
  `term2_personality_sharing` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `max_marks_15`
--

LOCK TABLES `max_marks_15` WRITE;
/*!40000 ALTER TABLE `max_marks_15` DISABLE KEYS */;
INSERT INTO `max_marks_15` VALUES (1,'art',10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10),(2,'english',10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10),(3,'health',10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10),(4,'math',10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10),(5,'punjabi',10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10);
/*!40000 ALTER TABLE `max_marks_15` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-19 21:30:56
