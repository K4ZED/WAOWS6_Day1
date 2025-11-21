-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mall_customer`
--

DROP TABLE IF EXISTS `mall_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mall_customer` (
  `CustomerID` int NOT NULL AUTO_INCREMENT,
  `Gender` varchar(10) NOT NULL,
  `Age` int NOT NULL,
  `Annual_Income` int NOT NULL,
  `Spending_Score` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`CustomerID`),
  KEY `fk_customer_user` (`UserId`),
  CONSTRAINT `fk_customer_user` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mall_customer`
--

LOCK TABLES `mall_customer` WRITE;
/*!40000 ALTER TABLE `mall_customer` DISABLE KEYS */;
INSERT INTO `mall_customer` VALUES (1,'Male',19,15,39,'2025-11-15 23:50:48',NULL),(2,'Male',21,15,81,'2025-11-15 23:50:48',NULL),(3,'Female',20,16,6,'2025-11-15 23:50:48',NULL),(4,'Female',23,16,77,'2025-11-15 23:50:48',NULL),(5,'Female',31,17,40,'2025-11-15 23:50:48',NULL),(6,'Female',22,17,76,'2025-11-15 23:50:48',NULL),(7,'Female',35,18,6,'2025-11-15 23:50:48',NULL),(8,'Female',23,18,94,'2025-11-15 23:50:48',NULL),(9,'Male',64,19,3,'2025-11-15 23:50:48',NULL),(10,'Female',30,19,72,'2025-11-15 23:50:48',NULL),(11,'Male',67,19,14,'2025-11-15 23:50:48',NULL),(12,'Female',35,19,99,'2025-11-15 23:50:48',NULL),(13,'Female',58,20,15,'2025-11-15 23:50:48',NULL),(14,'Female',24,20,77,'2025-11-15 23:50:48',NULL),(15,'Male',37,20,13,'2025-11-15 23:50:48',NULL),(16,'Male',22,20,79,'2025-11-15 23:50:48',NULL),(17,'Female',35,21,35,'2025-11-15 23:50:48',NULL),(18,'Male',20,21,66,'2025-11-15 23:50:48',NULL),(19,'Male',52,23,29,'2025-11-15 23:50:48',NULL),(20,'Female',35,23,98,'2025-11-15 23:50:48',NULL),(21,'Male',35,24,35,'2025-11-15 23:50:48',NULL),(22,'Male',25,24,73,'2025-11-15 23:50:48',NULL),(23,'Female',46,25,5,'2025-11-15 23:50:48',NULL),(24,'Male',31,25,73,'2025-11-15 23:50:48',NULL),(25,'Female',54,28,14,'2025-11-15 23:50:48',NULL),(26,'Male',29,28,82,'2025-11-15 23:50:48',NULL),(27,'Female',45,28,32,'2025-11-15 23:50:48',NULL),(28,'Male',35,28,61,'2025-11-15 23:50:48',NULL),(29,'Female',40,29,31,'2025-11-15 23:50:48',NULL),(30,'Female',23,29,87,'2025-11-15 23:50:48',NULL),(31,'Male',60,30,4,'2025-11-15 23:50:48',NULL),(32,'Female',21,30,73,'2025-11-15 23:50:48',NULL),(33,'Male',53,33,4,'2025-11-15 23:50:48',NULL),(34,'Male',18,33,92,'2025-11-15 23:50:48',NULL),(35,'Female',49,33,14,'2025-11-15 23:50:48',NULL),(36,'Female',21,33,81,'2025-11-15 23:50:48',NULL),(37,'Female',42,34,17,'2025-11-15 23:50:48',NULL),(38,'Female',30,34,73,'2025-11-15 23:50:48',NULL),(39,'Female',36,37,26,'2025-11-15 23:50:48',NULL),(40,'Female',20,37,75,'2025-11-15 23:50:48',NULL),(41,'Female',65,38,35,'2025-11-15 23:50:48',NULL),(42,'Male',24,38,92,'2025-11-15 23:50:48',NULL),(43,'Male',48,39,36,'2025-11-15 23:50:48',NULL),(44,'Female',31,39,61,'2025-11-15 23:50:48',NULL),(45,'Female',49,39,28,'2025-11-15 23:50:48',NULL),(46,'Female',24,39,65,'2025-11-15 23:50:48',NULL),(47,'Female',50,40,55,'2025-11-15 23:50:48',NULL),(48,'Female',27,40,47,'2025-11-15 23:50:48',NULL),(49,'Female',29,40,42,'2025-11-15 23:50:48',NULL),(50,'Female',31,40,42,'2025-11-15 23:50:48',NULL),(51,'Female',49,42,52,'2025-11-15 23:50:48',NULL),(52,'Male',33,42,60,'2025-11-15 23:50:48',NULL),(53,'Female',31,43,54,'2025-11-15 23:50:48',NULL),(54,'Male',59,43,60,'2025-11-15 23:50:48',NULL),(55,'Female',50,43,45,'2025-11-15 23:50:48',NULL),(56,'Male',47,43,41,'2025-11-15 23:50:48',NULL),(57,'Female',51,44,50,'2025-11-15 23:50:48',NULL),(58,'Male',69,44,46,'2025-11-15 23:50:48',NULL),(59,'Female',27,46,51,'2025-11-15 23:50:48',NULL),(60,'Male',53,46,46,'2025-11-15 23:50:48',NULL),(61,'Male',70,46,56,'2025-11-15 23:50:48',NULL),(62,'Male',19,46,55,'2025-11-15 23:50:48',NULL),(63,'Female',67,47,52,'2025-11-15 23:50:48',NULL),(64,'Female',54,47,59,'2025-11-15 23:50:48',NULL),(65,'Male',63,48,51,'2025-11-15 23:50:48',NULL),(66,'Male',18,48,59,'2025-11-15 23:50:48',NULL),(67,'Female',43,48,50,'2025-11-15 23:50:48',NULL),(68,'Female',68,48,48,'2025-11-15 23:50:48',NULL),(69,'Male',19,48,59,'2025-11-15 23:50:48',NULL),(70,'Female',32,48,47,'2025-11-15 23:50:48',NULL),(71,'Male',70,49,55,'2025-11-15 23:50:48',NULL),(72,'Female',47,49,42,'2025-11-15 23:50:48',NULL),(73,'Female',60,50,49,'2025-11-15 23:50:48',NULL),(74,'Female',60,50,56,'2025-11-15 23:50:48',NULL),(75,'Male',59,54,47,'2025-11-15 23:50:48',NULL),(76,'Male',26,54,54,'2025-11-15 23:50:48',NULL),(77,'Female',45,54,53,'2025-11-15 23:50:48',NULL),(78,'Male',40,54,48,'2025-11-15 23:50:48',NULL),(79,'Female',23,54,52,'2025-11-15 23:50:48',NULL),(80,'Female',49,54,42,'2025-11-15 23:50:48',NULL),(81,'Male',57,54,51,'2025-11-15 23:50:48',NULL),(82,'Male',38,54,55,'2025-11-15 23:50:48',NULL),(83,'Male',67,54,41,'2025-11-15 23:50:48',NULL),(84,'Female',46,54,44,'2025-11-15 23:50:48',NULL),(85,'Female',21,54,57,'2025-11-15 23:50:48',NULL),(86,'Male',48,54,46,'2025-11-15 23:50:48',NULL),(87,'Female',55,57,58,'2025-11-15 23:50:48',NULL),(88,'Female',22,57,55,'2025-11-15 23:50:48',NULL),(89,'Female',34,58,60,'2025-11-15 23:50:48',NULL),(90,'Female',50,58,46,'2025-11-15 23:50:48',NULL),(91,'Female',68,59,55,'2025-11-15 23:50:48',NULL),(92,'Male',18,59,41,'2025-11-15 23:50:48',NULL),(93,'Male',48,60,49,'2025-11-15 23:50:48',NULL),(94,'Female',40,60,40,'2025-11-15 23:50:48',NULL),(95,'Female',32,60,42,'2025-11-15 23:50:48',NULL),(96,'Male',24,60,52,'2025-11-15 23:50:48',NULL),(97,'Female',47,60,47,'2025-11-15 23:50:48',NULL),(98,'Female',27,60,50,'2025-11-15 23:50:48',NULL),(99,'Male',48,61,42,'2025-11-15 23:50:48',NULL),(100,'Male',20,61,49,'2025-11-15 23:50:48',NULL),(101,'Female',23,62,41,'2025-11-15 23:50:48',NULL),(102,'Female',49,62,48,'2025-11-15 23:50:48',NULL),(103,'Male',67,62,59,'2025-11-15 23:50:48',NULL),(104,'Male',26,62,55,'2025-11-15 23:50:48',NULL),(105,'Male',49,62,56,'2025-11-15 23:50:48',NULL),(106,'Female',21,62,42,'2025-11-15 23:50:48',NULL),(107,'Female',66,63,50,'2025-11-15 23:50:48',NULL),(108,'Male',54,63,46,'2025-11-15 23:50:48',NULL),(109,'Male',68,63,43,'2025-11-15 23:50:48',NULL),(110,'Male',66,63,48,'2025-11-15 23:50:48',NULL),(111,'Male',65,63,52,'2025-11-15 23:50:48',NULL),(112,'Female',19,63,54,'2025-11-15 23:50:48',NULL),(113,'Female',38,64,42,'2025-11-15 23:50:48',NULL),(114,'Male',19,64,46,'2025-11-15 23:50:48',NULL),(115,'Female',18,65,48,'2025-11-15 23:50:48',NULL),(116,'Female',19,65,50,'2025-11-15 23:50:48',NULL),(117,'Female',63,65,43,'2025-11-15 23:50:48',NULL),(118,'Female',49,65,59,'2025-11-15 23:50:48',NULL),(119,'Female',51,67,43,'2025-11-15 23:50:48',NULL),(120,'Female',50,67,57,'2025-11-15 23:50:48',NULL),(121,'Male',27,67,56,'2025-11-15 23:50:48',NULL),(122,'Female',38,67,40,'2025-11-15 23:50:48',NULL),(123,'Female',40,69,58,'2025-11-15 23:50:48',NULL),(124,'Male',39,69,91,'2025-11-15 23:50:48',NULL),(125,'Female',23,70,29,'2025-11-15 23:50:48',NULL),(126,'Female',31,70,77,'2025-11-15 23:50:48',NULL),(127,'Male',43,71,35,'2025-11-15 23:50:48',NULL),(128,'Male',40,71,95,'2025-11-15 23:50:48',NULL),(129,'Male',59,71,11,'2025-11-15 23:50:48',NULL),(130,'Male',38,71,75,'2025-11-15 23:50:48',NULL),(131,'Male',47,71,9,'2025-11-15 23:50:48',NULL),(132,'Male',39,71,75,'2025-11-15 23:50:48',NULL),(133,'Female',25,72,34,'2025-11-15 23:50:48',NULL),(134,'Female',31,72,71,'2025-11-15 23:50:48',NULL),(135,'Male',20,73,5,'2025-11-15 23:50:48',NULL),(136,'Female',29,73,88,'2025-11-15 23:50:48',NULL),(137,'Female',44,73,7,'2025-11-15 23:50:48',NULL),(138,'Male',32,73,73,'2025-11-15 23:50:48',NULL),(139,'Male',19,74,10,'2025-11-15 23:50:48',NULL),(140,'Female',35,74,72,'2025-11-15 23:50:48',NULL),(141,'Female',57,75,5,'2025-11-15 23:50:48',NULL),(142,'Male',32,75,93,'2025-11-15 23:50:48',NULL),(143,'Female',28,76,40,'2025-11-15 23:50:48',NULL),(144,'Female',32,76,87,'2025-11-15 23:50:48',NULL),(145,'Male',25,77,12,'2025-11-15 23:50:48',NULL),(146,'Male',28,77,97,'2025-11-15 23:50:48',NULL),(147,'Male',48,77,36,'2025-11-15 23:50:48',NULL),(148,'Female',32,77,74,'2025-11-15 23:50:48',NULL),(149,'Female',34,78,22,'2025-11-15 23:50:48',NULL),(150,'Male',34,78,90,'2025-11-15 23:50:48',NULL),(151,'Male',43,78,17,'2025-11-15 23:50:48',NULL),(152,'Male',39,78,88,'2025-11-15 23:50:48',NULL),(153,'Female',44,78,20,'2025-11-15 23:50:48',NULL),(154,'Female',38,78,76,'2025-11-15 23:50:48',NULL),(155,'Female',47,78,16,'2025-11-15 23:50:48',NULL),(156,'Female',27,78,89,'2025-11-15 23:50:48',NULL),(157,'Male',37,78,1,'2025-11-15 23:50:48',NULL),(158,'Female',30,78,78,'2025-11-15 23:50:48',NULL),(159,'Male',34,78,1,'2025-11-15 23:50:48',NULL),(160,'Female',30,78,73,'2025-11-15 23:50:48',NULL),(161,'Female',56,79,35,'2025-11-15 23:50:48',NULL),(162,'Female',29,79,83,'2025-11-15 23:50:49',NULL),(163,'Male',19,81,5,'2025-11-15 23:50:49',NULL),(164,'Female',31,81,93,'2025-11-15 23:50:49',NULL),(165,'Male',50,85,26,'2025-11-15 23:50:49',NULL),(166,'Female',36,85,75,'2025-11-15 23:50:49',NULL),(167,'Male',42,86,20,'2025-11-15 23:50:49',NULL),(168,'Female',33,86,95,'2025-11-15 23:50:49',NULL),(169,'Female',36,87,27,'2025-11-15 23:50:49',NULL),(170,'Male',32,87,63,'2025-11-15 23:50:49',NULL),(171,'Male',40,87,13,'2025-11-15 23:50:49',NULL),(172,'Male',28,87,75,'2025-11-15 23:50:49',NULL),(173,'Male',36,87,10,'2025-11-15 23:50:49',NULL),(174,'Male',36,87,92,'2025-11-15 23:50:49',NULL),(175,'Female',52,88,13,'2025-11-15 23:50:49',NULL),(176,'Female',30,88,86,'2025-11-15 23:50:49',NULL),(177,'Male',58,88,15,'2025-11-15 23:50:49',NULL),(178,'Male',27,88,69,'2025-11-15 23:50:49',NULL),(179,'Male',59,93,14,'2025-11-15 23:50:49',NULL),(180,'Male',35,93,90,'2025-11-15 23:50:49',NULL),(181,'Female',37,97,32,'2025-11-15 23:50:49',NULL),(182,'Female',32,97,86,'2025-11-15 23:50:49',NULL),(183,'Male',46,98,15,'2025-11-15 23:50:49',NULL),(184,'Female',29,98,88,'2025-11-15 23:50:49',NULL),(185,'Female',41,99,39,'2025-11-15 23:50:49',NULL),(186,'Male',30,99,97,'2025-11-15 23:50:49',NULL),(187,'Female',54,101,24,'2025-11-15 23:50:49',NULL),(188,'Male',28,101,68,'2025-11-15 23:50:49',NULL),(189,'Female',41,103,17,'2025-11-15 23:50:49',NULL),(190,'Female',36,103,85,'2025-11-15 23:50:49',NULL),(191,'Female',34,103,23,'2025-11-15 23:50:49',NULL),(192,'Female',32,103,69,'2025-11-15 23:50:49',NULL),(193,'Male',33,113,8,'2025-11-15 23:50:49',NULL),(194,'Female',38,113,91,'2025-11-15 23:50:49',NULL),(195,'Female',47,120,16,'2025-11-15 23:50:49',NULL),(196,'Female',35,120,79,'2025-11-15 23:50:49',NULL),(197,'Female',45,126,28,'2025-11-15 23:50:49',NULL),(198,'Male',32,126,74,'2025-11-15 23:50:49',NULL),(199,'Male',32,137,18,'2025-11-15 23:50:49',NULL),(200,'Male',30,137,83,'2025-11-15 23:50:49',NULL);
/*!40000 ALTER TABLE `mall_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_categories` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Description` text,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` VALUES (1,'Electronics','Electronic gadgets and devices'),(2,'Clothing','Men and women fashion'),(3,'Groceries','Daily needs and fresh food'),(4,'Home','Furniture and home decor'),(5,'Beauty','Cosmetics and skincare products');
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `CategoryID` int NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Stock` int NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ProductID`),
  KEY `CategoryID` (`CategoryID`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `product_categories` (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'Smartphone',750.00,67,'2025-11-15 23:50:49'),(2,1,'Laptop',1200.00,36,'2025-11-15 23:50:49'),(3,2,'T-shirt',25.00,16,'2025-11-15 23:50:49'),(4,2,'Jeans',40.00,52,'2025-11-15 23:50:49'),(5,3,'Milk',2.50,34,'2025-11-15 23:50:49'),(6,3,'Bread',1.20,91,'2025-11-15 23:50:49'),(7,4,'Sofa',550.00,95,'2025-11-15 23:50:49'),(8,4,'Lamp',45.00,71,'2025-11-15 23:50:49'),(9,5,'Lipstick',15.00,36,'2025-11-15 23:50:49'),(10,5,'Perfume',60.00,45,'2025-11-15 23:50:49');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_details`
--

DROP TABLE IF EXISTS `transaction_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_details` (
  `DetailID` int NOT NULL AUTO_INCREMENT,
  `TransactionID` int NOT NULL,
  `ProductID` int NOT NULL,
  `Quantity` int NOT NULL DEFAULT '1',
  `UnitPrice` decimal(10,2) NOT NULL,
  `Subtotal` decimal(12,2) NOT NULL,
  PRIMARY KEY (`DetailID`),
  KEY `TransactionID` (`TransactionID`),
  KEY `ProductID` (`ProductID`),
  CONSTRAINT `transaction_details_ibfk_1` FOREIGN KEY (`TransactionID`) REFERENCES `transactions` (`TransactionID`),
  CONSTRAINT `transaction_details_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_details`
--

LOCK TABLES `transaction_details` WRITE;
/*!40000 ALTER TABLE `transaction_details` DISABLE KEYS */;
INSERT INTO `transaction_details` VALUES (1,1,6,1,1.20,1.20),(2,1,1,3,750.00,2250.00),(3,1,9,1,15.00,15.00),(4,2,3,3,25.00,75.00),(5,2,4,3,40.00,120.00),(6,3,5,2,2.50,5.00),(7,3,3,3,25.00,75.00),(8,3,1,2,750.00,1500.00),(9,4,5,3,2.50,7.50),(10,4,2,1,1200.00,1200.00),(11,4,3,3,25.00,75.00),(12,4,5,2,2.50,5.00),(13,5,5,2,2.50,5.00),(14,5,6,2,1.20,2.40),(15,6,6,1,1.20,1.20),(16,6,7,2,550.00,1100.00),(17,6,1,2,750.00,1500.00),(18,7,6,2,1.20,2.40),(19,7,9,2,15.00,30.00),(20,7,10,1,60.00,60.00),(21,7,3,3,25.00,75.00),(22,8,6,1,1.20,1.20),(23,8,4,1,40.00,40.00),(24,9,5,3,2.50,7.50),(25,9,2,3,1200.00,3600.00),(26,9,9,1,15.00,15.00),(27,10,3,2,25.00,50.00),(28,10,1,2,750.00,1500.00),(29,10,8,3,45.00,135.00),(30,10,2,1,1200.00,1200.00),(31,11,4,1,40.00,40.00),(32,12,4,1,40.00,40.00),(33,12,4,3,40.00,120.00),(34,12,8,3,45.00,135.00),(35,13,8,2,45.00,90.00),(36,13,8,1,45.00,45.00),(37,14,9,3,15.00,45.00),(38,14,7,2,550.00,1100.00),(39,15,1,2,750.00,1500.00),(40,15,6,2,1.20,2.40),(41,16,6,1,1.20,1.20),(42,17,8,3,45.00,135.00),(43,17,5,3,2.50,7.50),(44,18,9,2,15.00,30.00),(45,18,4,2,40.00,80.00),(46,19,8,3,45.00,135.00),(47,19,4,3,40.00,120.00),(48,19,10,3,60.00,180.00),(49,19,9,3,15.00,45.00),(50,20,6,1,1.20,1.20),(51,20,2,3,1200.00,3600.00),(52,21,3,2,25.00,50.00),(53,21,5,2,2.50,5.00),(54,21,7,2,550.00,1100.00),(55,22,10,1,60.00,60.00),(56,22,6,3,1.20,3.60),(57,22,10,3,60.00,180.00),(58,23,2,2,1200.00,2400.00),(59,23,5,3,2.50,7.50),(60,23,5,1,2.50,2.50),(61,23,6,1,1.20,1.20),(62,24,3,2,25.00,50.00),(63,24,5,2,2.50,5.00),(64,24,4,2,40.00,80.00),(65,24,9,2,15.00,30.00),(66,25,1,3,750.00,2250.00),(67,25,9,1,15.00,15.00),(68,25,7,2,550.00,1100.00),(69,26,9,1,15.00,15.00),(70,27,8,1,45.00,45.00),(71,28,8,2,45.00,90.00),(72,29,2,2,1200.00,2400.00),(73,29,10,1,60.00,60.00),(74,29,5,1,2.50,2.50),(75,29,2,1,1200.00,1200.00),(76,30,1,2,750.00,1500.00),(77,30,1,1,750.00,750.00),(78,30,1,1,750.00,750.00),(79,31,4,2,40.00,80.00),(80,32,2,3,1200.00,3600.00),(81,32,3,2,25.00,50.00),(82,32,8,1,45.00,45.00),(83,33,2,1,1200.00,1200.00),(84,33,7,3,550.00,1650.00),(85,33,2,3,1200.00,3600.00),(86,34,7,1,550.00,550.00),(87,34,1,2,750.00,1500.00),(88,35,6,2,1.20,2.40),(89,36,9,2,15.00,30.00),(90,36,2,2,1200.00,2400.00),(91,36,6,3,1.20,3.60),(92,37,4,1,40.00,40.00),(93,38,4,2,40.00,80.00),(94,38,2,3,1200.00,3600.00),(95,38,4,2,40.00,80.00),(96,38,8,1,45.00,45.00),(97,39,5,3,2.50,7.50),(98,39,3,1,25.00,25.00),(99,40,7,3,550.00,1650.00),(100,40,2,3,1200.00,3600.00),(101,40,6,2,1.20,2.40),(102,40,7,2,550.00,1100.00),(103,41,5,3,2.50,7.50),(104,41,5,1,2.50,2.50),(105,41,1,1,750.00,750.00),(106,42,5,3,2.50,7.50),(107,42,3,3,25.00,75.00),(108,43,5,2,2.50,5.00),(109,44,6,2,1.20,2.40),(110,44,1,2,750.00,1500.00),(111,44,6,2,1.20,2.40),(112,44,7,3,550.00,1650.00),(113,45,3,1,25.00,25.00),(114,45,3,3,25.00,75.00),(115,45,2,3,1200.00,3600.00),(116,45,4,1,40.00,40.00),(117,46,4,1,40.00,40.00),(118,46,3,1,25.00,25.00),(119,46,4,1,40.00,40.00),(120,47,9,2,15.00,30.00),(121,47,8,3,45.00,135.00),(122,47,3,3,25.00,75.00),(123,48,9,1,15.00,15.00),(124,48,8,2,45.00,90.00),(125,48,1,2,750.00,1500.00),(126,48,10,2,60.00,120.00),(127,49,5,1,2.50,2.50),(128,49,4,3,40.00,120.00),(129,49,6,1,1.20,1.20),(130,50,4,1,40.00,40.00),(131,50,1,2,750.00,1500.00),(132,50,8,2,45.00,90.00),(133,51,1,1,750.00,750.00),(134,51,2,1,1200.00,1200.00);
/*!40000 ALTER TABLE `transaction_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `TransactionID` int NOT NULL AUTO_INCREMENT,
  `CustomerID` int NOT NULL,
  `TransactionDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `TotalAmount` decimal(12,2) NOT NULL,
  `PaymentMethod` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`TransactionID`),
  KEY `CustomerID` (`CustomerID`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `mall_customer` (`CustomerID`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,111,'2025-10-07 13:43:31',0.00,'e-wallet'),(2,130,'2025-10-07 13:43:31',0.00,'e-wallet'),(3,78,'2025-09-26 13:43:31',0.00,'credit'),(4,58,'2025-10-29 13:43:31',0.00,'credit'),(5,34,'2025-09-13 13:43:31',0.00,'credit'),(6,2,'2025-10-20 13:43:31',0.00,'credit'),(7,79,'2025-09-25 13:43:31',0.00,'credit'),(8,178,'2025-10-05 13:43:31',0.00,'credit'),(9,64,'2025-10-15 13:43:31',0.00,'credit'),(10,170,'2025-11-05 13:43:31',0.00,'credit'),(11,64,'2025-10-20 13:43:31',0.00,'cash'),(12,165,'2025-11-02 13:43:31',0.00,'credit'),(13,116,'2025-10-05 13:43:31',0.00,'e-wallet'),(14,60,'2025-09-23 13:43:31',0.00,'credit'),(15,134,'2025-10-08 13:43:31',0.00,'cash'),(16,62,'2025-09-29 13:43:31',0.00,'cash'),(17,86,'2025-10-04 13:43:31',0.00,'e-wallet'),(18,101,'2025-09-13 13:43:31',0.00,'credit'),(19,23,'2025-10-10 13:43:31',0.00,'credit'),(20,93,'2025-09-17 13:43:31',0.00,'cash'),(21,19,'2025-11-06 13:43:31',0.00,'e-wallet'),(22,110,'2025-10-06 13:43:31',0.00,'cash'),(23,17,'2025-10-12 13:43:31',0.00,'cash'),(24,55,'2025-09-28 13:43:31',0.00,'credit'),(25,21,'2025-10-24 13:43:31',0.00,'credit'),(26,124,'2025-10-31 13:43:31',0.00,'cash'),(27,185,'2025-11-01 13:43:31',0.00,'credit'),(28,25,'2025-11-02 13:43:31',0.00,'cash'),(29,75,'2025-10-02 13:43:31',0.00,'cash'),(30,159,'2025-10-17 13:43:31',0.00,'credit'),(31,11,'2025-11-08 13:43:31',0.00,'credit'),(32,183,'2025-09-26 13:43:31',0.00,'credit'),(33,23,'2025-10-01 13:43:31',0.00,'credit'),(34,175,'2025-10-02 13:43:31',0.00,'e-wallet'),(35,73,'2025-10-17 13:43:31',0.00,'e-wallet'),(36,65,'2025-10-25 13:43:31',0.00,'credit'),(37,82,'2025-09-24 13:43:31',0.00,'credit'),(38,125,'2025-10-27 13:43:31',0.00,'cash'),(39,173,'2025-11-12 13:43:31',0.00,'credit'),(40,111,'2025-09-14 13:43:31',0.00,'e-wallet'),(41,163,'2025-10-16 13:43:31',0.00,'credit'),(42,173,'2025-10-14 13:43:31',0.00,'e-wallet'),(43,91,'2025-11-08 13:43:31',0.00,'cash'),(44,8,'2025-10-30 13:43:31',0.00,'credit'),(45,165,'2025-10-16 13:43:31',0.00,'credit'),(46,130,'2025-10-10 13:43:31',0.00,'cash'),(47,133,'2025-10-12 13:43:31',0.00,'e-wallet'),(48,106,'2025-10-26 13:43:31',0.00,'cash'),(49,19,'2025-10-21 13:43:31',0.00,'credit'),(50,77,'2025-10-15 13:43:31',0.00,'cash'),(51,1,'2025-11-21 10:37:27',1950.00,'cash');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `Role` varchar(20) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'p@gmail.com','$2b$12$ZZ9twEAn43JdZ9.l9XaYx.bvlza3R.deb3GoVEcrfa2H25fcbhp9q',1,'2025-11-20 10:58:17','admin'),(2,'test@gmail.com','$2b$12$z1K3H4bzaDzO.198JR9M8OQwflwg9dHBaY57PJl6iB3S5vJTcMw7G',1,'2025-11-20 11:05:07','user'),(3,'test1@gmail.com','$2b$12$OJ/n/pwEOESkcfU./29b9.v2uD3/8vb/.ez9E4hbIycFK.NbcDbuC',0,'2025-11-21 13:20:28','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-21 13:32:34
