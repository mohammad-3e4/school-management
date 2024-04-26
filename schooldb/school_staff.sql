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
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `staff_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `phone` bigint NOT NULL,
  `avatar` text,
  `gender` varchar(45) NOT NULL,
  `religion` varchar(45) NOT NULL,
  `address` text NOT NULL,
  `role` text NOT NULL,
  `designation` varchar(45) NOT NULL,
  `qualification` varchar(45) NOT NULL,
  `experience` varchar(45) NOT NULL,
  `bank_account_number` varchar(45) DEFAULT NULL,
  `ifsc_code` varchar(45) DEFAULT NULL,
  `reset_password_token` text,
  `reset_password_expiry` text,
  `joining_date` text NOT NULL,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `staff_id_UNIQUE` (`staff_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'Kashif','Kasifsaif784@gmail.com','123456',9837729235,'','Male','Muslim','Vill allipur hasanpur road gajraula  post gajraula distt amroha, uttar Pradesh pin 244235','admin','TGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(2,'parth','parthp9386@gmail.com','000000',121,'','Male','Hindu','kurukshetra','admin','mohali','Graduate','2','','',NULL,NULL,'3/14/2024, 12:10:33 PM'),(3,'Nidhi Arora','nidhiarora061084@gmail.com','123456',121,'','Female','Hindu','Chandigarh','teacher','mohali','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(4,'Manvinder Kaur','mona22nov@yahoo.com','Khalsa@123',121,'','Female','Hindu','Chandigarh','teacher','TGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(5,'Harneet Kaur','harneetclickarts@gmail.com','Khalsa@123',121,'','Female','Hindu','Mohali','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(6,'Pinki','pinkipohal82@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(7,'Rekha','rekhakalia19@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','TGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(8,'Ramanjit Kaur','ramanjitkhatra@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(9,'Rachna Sharma','rachna81.sharma@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','TGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(10,'Rajwinder Kaur ','rajusaroy89@gmail.com','Khalsa@123',121,'','Male','Hindu','Mohali','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(11,'Harsimran Kaur','k.simz1460@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh ','teacher','PGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(12,'Anjali Mishra','anjalimishra6240@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','TGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(13,'Vanita Sharma','vanitasharma30b@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','TGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(14,'Parminder Kaur','pam_74@rediffmail.com','Khalsa@123',121,'','Male','Hindu','Mohali','teacher','PGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(15,'Anju','goyalanju1986@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(16,'Iknoor Kaur','ishamritkaur4@gmail.com','Khalsa@123',121,'','Male','Hindu','Mohali','teacher','TGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(17,'Sarina','sarinakataria6@gmail.com','Khalsa@123',121,'','Male','Hindu','Nayagaon','teacher','PGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(18,'Seema Sharma','sseema.sharma1983@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(19,'Charanjit Kaur','charan0087@gmail.com','Khalsa@123',121,'','Male','Hindu','Mohali','teacher','PGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(20,'Gagandeep Kaur','gkkaur712@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(21,'Versha','vershak799@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(22,'Parminderjit kaur','parminders.contact@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(23,'Gurmohan kaur','gurmohankaur111@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh ','teacher','TGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(24,'Jaswinder Kaur','jasmitsahota@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(25,'Dalvinder Singh','dsdullu@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','TGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(26,'Gurdeep Kaur ','gurdeep0818@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(27,'Prableen kaur ','prableenk18@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh ','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(28,'Sunita Maurya','mssunitamaurya@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh ','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(29,'Poonam','poona4120@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh ','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(30,'Suman','suman.saharan1984@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh ','teacher','PRT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(31,'Sonu','sonubabbar36@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh ','teacher','TGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(32,'Ruchi Daman Singh','ruchie0943@gmail.com','Khalsa@123',121,'','Male','Hindu','Chandigarh ','teacher','TGT','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(33,'GNKSSS','gurunanak_30b@rediffmail.com','Nanak@1965',121,'','Male','Hindu','Chandigarh','admin','Administrative','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(34,'ASHA SHARMA','ashakashish79@gmail.com','Khalsa@123',121,'','Male','Hindu','CHANDIGARH','admin','PST','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(35,'Namrta Kumari ','namrtakumari1676@gmail.com','Namrta@167651',121,'','Male','Hindu','1676 ESIC Society sector 51B Chandigarh ','admin','TGT Science and Maths ','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(36,'DEVINDERJEET KAUR','devinderjeetkang@gmail.com','Khalsa@123',121,'','Male','Hindu','#716, Sector 10, Panchkulla','teacher','PGT Mathematics','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(37,'Ravneet Kaur','rav0184@gmail.com','Khalsa@123',121,'','Male','Hindu','# 3108, Sector 44D,Chandigarh','teacher','PGT English','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(38,'Mandeep Kaur','mandeep.kaur.fantu@gmail.com','Khalsa@123',121,'','Male','Hindu','# 5240, Sector 38 West, Chandigarh','teacher','PGT Punjabi','Graduate','2','','','','','3/14/2024, 12:10:33 PM'),(39,'Iqbal Singh','iqbalkandhola@gmail.com','Khalsa@123',121,'','Male','Hindu','Punjab','teacher','Teacher','Graduate','2','','','','','3/14/2024, 12:10:33 PM');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-26 11:20:41
