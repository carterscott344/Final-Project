CREATE DATABASE  IF NOT EXISTS `final_project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `final_project`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: final_project
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `platforms` varchar(255) NOT NULL,
  `japan_release_date` date NOT NULL,
  `usa_release_date` date NOT NULL,
  `usa_boxart` varchar(255) NOT NULL,
  `japan_boxart` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `average_rating` bigint DEFAULT NULL,
  `total_ratings` bigint DEFAULT NULL,
  `metacritic_rating` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'Super Mario Bros.','NES','1985-09-13','1985-10-18','SuperMario US.png','SuperMario JP.png','Platformer',0,0,84),(2,'Super Mario Bros. 2','NES','1986-06-03','1988-10-09','SuperMario 2 US.png','SuperMario 2 JP.png','Platformer',0,0,0),(3,'Super Mario Bros. 3','NES','1988-10-23','1990-02-12','SuperMario 3 US.png','SuperMario 3 JP.png','Platformer',0,0,94),(4,'Super Mario World','SNES','1990-11-21','1991-08-13','SuperMario World US.png','SuperMario World JP.png','Platformer',0,0,0),(5,'Super Mario 64','Nintendo 64','1996-06-23','1996-09-29','SuperMario 64 US.png','SuperMario 64 JP.png','Platformer',0,0,85),(6,'Super Mario Sunshine','GameCube','2002-07-19','2002-08-26','SuperMario Sunshine US.png','SuperMario Sunshine JP.png','Platformer',0,0,92),(7,'New Super Mario Bros.','Nintendo DS','2006-05-25','2006-05-15','NewSuperMarioBros US.png','NewSuperMarioBros JP.png','Platformer',0,0,89),(8,'Super Mario Galaxy','Wii','2007-11-01','2007-11-12','SuperMario Galaxy US.png','SuperMario Galaxy JP.png','Platformer',0,0,97),(9,'New Super Mario Bros. Wii','Wii','2009-12-03','2009-11-15','NewSuperMarioBros Wii US.png','NewSuperMarioBros Wii JP.png','Platformer',0,0,87),(10,'Super Mario Galaxy 2','Wii','2010-05-27','2010-05-23','SuperMario Galaxy 2 US.png','SuperMario Galaxy 2 JP.png','Platformer',0,0,97),(11,'Super Mario 3D Land','Nintendo 3DS','2011-11-03','2011-11-13','SuperMario 3dLand US.png','SuperMario 3dLand JP.png','Platformer',0,0,90),(12,'New Super Mario Bros. 2','Nintendo 3DS','2012-07-28','2012-08-19','NewSuperMarioBros 2 US.png','NewSuperMarioBros 2 JP.png','Platformer',0,0,78),(13,'New Super Mario Bros. U','Wii U','2012-12-08','2012-11-18','NewSuperMarioBros WiiU US.png','NewSuperMarioBros WiiU JP.png','Platformer',0,0,84),(14,'Super Mario 3D World','Wii U','2013-11-21','2013-11-22','SuperMario 3dWorld US.png','SuperMario 3dWorld JP.png','Platformer',0,0,93),(15,'Super Mario Maker','Wii U, Nintendo 3DS','2015-09-10','2015-09-11','SuperMario Maker US.png','SuperMario Maker JP.png','Platformer',0,0,88),(16,'Super Mario Run','iOS, Android','2016-12-15','2016-12-15','SuperMario Run.png','SuperMario Run.png','Platformer',0,0,76),(17,'Super Mario Odyssey','Nintendo Switch','2017-10-27','2017-10-27','SuperMario Odessy US.png','SuperMario Odessy JP.png','Platformer',0,0,97),(18,'Super Mario Maker 2','Nintendo Switch','2019-06-28','2019-06-28','SuperMario Maker2 US.png','SuperMario Maker2 JP.png','Platformer',0,0,88),(19,'Super Mario 3D All-Stars','Nintendo Switch','2020-09-18','2020-09-18','SuperMario 3dAllStars US.png','SuperMario 3dAllStars JP.png','Platformer',0,0,82),(20,'Super Mario Bros. Wonder','Nintendo Switch','2023-10-20','2023-10-20','SuperMario Wonder US.png','SuperMario Wonder JP.png','Platformer',0,0,92),(21,'Super Mario Kart','SNES','1992-08-27','1992-09-01','SuperMarioKart US.png','SuperMarioKart JP.png','Kart Game',0,0,0),(22,'Mario Kart 64','N64','1996-12-14','1997-02-10','MarioKart 64 US.png','MarioKart 64 JP.png','Kart Game',0,0,83),(23,'Mario Kart: Super Circuit','GBA','2001-07-21','2001-08-27','MarioKart SuperCircuit US.png','MarioKart SuperCircuit JP.png','Kart Game',0,0,93),(24,'Mario Kart: Double Dash!!','GameCube','2003-11-07','2003-11-17','MarioKart Double Dash US.png','MarioKart Double Dash JP.png','Kart Game',0,0,87),(25,'Mario Kart DS','Nintendo DS','2005-12-08','2005-11-14','MarioKart DS US.png','MarioKart DS JP.png','Kart Game',0,0,91),(26,'Mario Kart Wii','Wii','2008-04-10','2008-04-27','MarioKart Wii US.png','MarioKart Wii JP.png','Kart Game',0,0,82),(27,'Mario Kart 7','3DS','2011-12-01','2011-12-04','MarioKart 7 US.png','MarioKart 7 JP.png','Kart Game',0,0,85),(28,'Mario Kart 8','Wii U','2014-05-29','2014-05-30','MarioKart 8 US.png','MarioKart 8 JP.png','Kart Game',0,0,88),(29,'Mario Kart 8 Deluxe','Switch','2017-04-28','2017-04-28','MarioKart 8Deluxe US.png','MarioKart 8Deluxe JP.png','Kart Game',0,0,92),(30,'Mario Kart Tour','Mobile','2019-09-25','2019-09-25','MarioKart Tour US.png','MarioKart Tour US.png','Kart Game',0,0,59),(32,'Mario Party','N64','1998-12-18','1999-02-08','MarioParty US.png','MarioParty JP.png','Party Game',0,0,79),(33,'Mario Party 2','N64','1999-12-17','2000-01-24','MarioParty 2 US.png','MarioParty 2 JP.png','Party Game',0,0,0),(34,'Mario Party 3','N64','2000-12-07','2001-05-07','MarioParty 3 US.png','MarioParty 3 JP.png','Party Game',0,0,74),(35,'Mario Party 4','GameCube','2002-10-21','2002-10-21','MarioParty 4 US.png','MarioParty 4 JP.png','Party Game',0,0,70),(36,'Mario Party 5','GameCube','2003-11-10','2003-11-10','MarioParty 5 US.png','MarioParty 5 JP.png','Party Game',0,0,69),(37,'Mario Party 6','GameCube','2004-11-18','2004-12-06','MarioParty 6 US.png','MarioParty 6 JP.png','Party Game',0,0,71),(38,'Mario Party 7','GameCube','2005-11-07','2005-11-07','MarioParty 7 US.png','MarioParty 7 JP.png','Party Game',0,0,64),(39,'Mario Party 8','Wii','2007-05-29','2007-05-29','MarioParty 8 US.png','MarioParty 8 JP.png','Party Game',0,0,62),(40,'Mario Party DS','DS','2007-11-08','2007-11-19','MarioParty DS US.png','MarioParty DS JP.png','Party Game',0,0,72),(41,'Mario Party 9','Wii','2012-03-02','2012-03-11','MarioParty 9 US.png','MarioParty 9 JP.png','Party Game',0,0,73),(43,'Mario Party 10','Wii U','2015-03-12','2015-03-20','MarioParty 10 US.png','MarioParty 10 JP.png','Party Game',0,0,66),(46,'Super Mario Party','Switch','2018-10-05','2018-10-05','SuperMarioParty US.png','SuperMarioParty JP.png','Party Game',0,0,76),(47,'Mario Party Superstars','Switch','2021-10-29','2021-10-29','MarioParty Superstars US.png','MarioParty Superstars JP.png','Party Game',0,0,80);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 18:44:56
