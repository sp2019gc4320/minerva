-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 22, 2019 at 03:17 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `minerva`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblApplicants`
--

CREATE TABLE `tblApplicants` (
  `applicantID` int(255) NOT NULL,
  `PSalutation` varchar(10) NOT NULL,
  `ANotes` longtext NOT NULL,
  `fName` varchar(25) NOT NULL,
  `mName` varchar(25) NOT NULL,
  `lName` varchar(25) NOT NULL,
  `PGender` varchar(1) NOT NULL,
  `AStatus` varchar(10) NOT NULL,
  `AGenQual` varchar(5) NOT NULL,
  `documentID` int(11) NOT NULL,
  `AEmail` varchar(50) NOT NULL,
  `guardinFName` varchar(25) NOT NULL,
  `guardianLName` varchar(25) NOT NULL,
  `guardianEmail` varchar(50) NOT NULL,
  `guardianAddress` varchar(100) NOT NULL,
  `guardianAddress2` varchar(100) NOT NULL,
  `guardianCity` varchar(35) NOT NULL,
  `guardianState` varchar(2) NOT NULL,
  `guardianZip` varchar(5) NOT NULL,
  `guardianMailAddress` varchar(100) NOT NULL,
  `guardianMailCity` varchar(35) NOT NULL,
  `guardianMailState` varchar(2) NOT NULL,
  `guardianMailZip` varchar(5) NOT NULL,
  `ACounty` varchar(25) NOT NULL,
  `AZone` varchar(255) NOT NULL,
  `ARegion` varchar(255) NOT NULL,
  `AUrbanization` varchar(255) NOT NULL,
  `ADOB` datetime NOT NULL,
  `ASSN` varchar(9) NOT NULL,
  `AEthnicity` varchar(15) NOT NULL,
  `AAllergiesToMedication` varchar(100) NOT NULL,
  `ASurgeryHistory` varchar(100) NOT NULL,
  `AHasHealthIns` tinyint(1) NOT NULL,
  `AIsMarried` tinyint(1) NOT NULL,
  `ASpecialNeeds` varchar(255) NOT NULL,
  `ACurrentSchoolStatus` varchar(25) NOT NULL,
  `LastSchoolID` int(11) NOT NULL,
  `ALastGradeLevel` varchar(2) NOT NULL,
  `ALastTimeInSchool` datetime NOT NULL,
  `ApplicationEnteredByID` int(11) NOT NULL,
  `AppSentDate` datetime NOT NULL,
  `AppSubmitDate` datetime NOT NULL,
  `AppEnteredDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblApplicants`
--

INSERT INTO `tblApplicants` (`applicantID`, `PSalutation`, `ANotes`, `fName`, `mName`, `lName`, `PGender`, `AStatus`, `AGenQual`, `documentID`, `AEmail`, `guardinFName`, `guardianLName`, `guardianEmail`, `guardianAddress`, `guardianAddress2`, `guardianCity`, `guardianState`, `guardianZip`, `guardianMailAddress`, `guardianMailCity`, `guardianMailState`, `guardianMailZip`, `ACounty`, `AZone`, `ARegion`, `AUrbanization`, `ADOB`, `ASSN`, `AEthnicity`, `AAllergiesToMedication`, `ASurgeryHistory`, `AHasHealthIns`, `AIsMarried`, `ASpecialNeeds`, `ACurrentSchoolStatus`, `LastSchoolID`, `ALastGradeLevel`, `ALastTimeInSchool`, `ApplicationEnteredByID`, `AppSentDate`, `AppSubmitDate`, `AppEnteredDate`) VALUES
(1, '', '', 'John', '', 'Wick', '', '', '', 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '', '', '', '', 0, 0, '', '', 0, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', '1900-01-01 00:00:00', '0000-00-00 00:00:00'),
(2, '', '', 'Jack', '', 'Eveleigh', '', '', '', 2, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '', '', '', '', 0, 0, '', '', 0, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', '1900-01-01 00:00:00', '0000-00-00 00:00:00'),
(3, '', '', 'Greg', '', 'Gregson', '', '', '', 3, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '', '', '', '', 0, 0, '', '', 0, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', '1900-01-01 00:00:00', '0000-00-00 00:00:00'),
(4, '', '', 'Tim', '', 'Richardson', '', '', '', 4, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '', '', '', '', 0, 0, '', '', 0, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', '1900-01-01 00:00:00', '0000-00-00 00:00:00'),
(5, '', '', 'Billiam', '', 'Williams', '', '', '', 35, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '', '', '', '', 0, 0, '', '', 0, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', '1900-01-01 00:00:00', '0000-00-00 00:00:00'),
(6, '', '', 'Peter', '', 'Johnson', '', '', '', 22, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '', '', '', '', 0, 0, '', '', 0, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', '1900-01-01 00:00:00', '0000-00-00 00:00:00'),
(7, '', '', 'Reginald', '', 'Hoffenstein', '', '', '', 67, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '', '', '', '', 0, 0, '', '', 0, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', '1900-01-01 00:00:00', '0000-00-00 00:00:00'),
(92, '', '', 'Guy', '', 'Buddy', '', '', '', 35, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '', '', '', '', 0, 0, '', '', 0, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', '1900-01-01 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tblCandidatePool`
--

CREATE TABLE `tblCandidatePool` (
  `applicantID` int(11) NOT NULL,
  `fName` varchar(25) NOT NULL,
  `mName` varchar(25) NOT NULL,
  `lName` varchar(25) NOT NULL,
  `PGender` varchar(1) NOT NULL,
  `AStatus` varchar(10) NOT NULL,
  `AEmail` varchar(50) NOT NULL,
  `AGenQual` varchar(5) NOT NULL,
  `documentID` int(11) NOT NULL,
  `guardianEmail` varchar(50) NOT NULL,
  `ShirtSize` varchar(10) NOT NULL,
  `PantsSize` varchar(10) NOT NULL,
  `ShoeSize` varchar(10) NOT NULL,
  `HatSize` varchar(10) NOT NULL,
  `AppSentDate` datetime NOT NULL,
  `AppSubmitDate` datetime NOT NULL,
  `AppEnteredDate` datetime NOT NULL,
  `AcceptedDate` datetime NOT NULL,
  `AAllergiesToMedication` varchar(100) NOT NULL,
  `ASurgeryHistory` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblDeadPool`
--

CREATE TABLE `tblDeadPool` (
  `applicantID` int(11) NOT NULL,
  `fName` varchar(25) NOT NULL,
  `mName` varchar(25) NOT NULL,
  `lName` varchar(25) NOT NULL,
  `PGender` varchar(1) NOT NULL,
  `AStatus` varchar(10) NOT NULL,
  `AGenQual` varchar(5) NOT NULL,
  `AEmail` varchar(50) NOT NULL,
  `guardianEmail` varchar(50) NOT NULL,
  `RejectedDate` datetime NOT NULL,
  `RejectedReason` varchar(100) NOT NULL,
  `DeselectedDate` datetime NOT NULL,
  `DeselcetedReason` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
