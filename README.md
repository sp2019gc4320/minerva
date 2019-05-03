# minerva

**DOUBLE CHECK THAT ALL TABLE NAMES ARE TOGGLE-CASE (NOT LOWERCASE)**
SQL statements to add new tables:

For tblPeople2

CREATE TABLE  `minerva`.`tblPeople2` ( `PersonID` int(11) NOT NULL AUTO_INCREMENT, `PSalutation` varchar(10) DEFAULT NULL, `PersonFN` varchar(25) DEFAULT NULL, `PersonMN` varchar(25) DEFAULT NULL, `PersonLN` varchar(40) DEFAULT NULL, `PersonGenQual` varchar(5) DEFAULT NULL, `PersonAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `PersonNotes` longtext, `PAddress` varchar(100) DEFAULT NULL, `PAddress2` varchar(100) DEFAULT NULL, `PCity` varchar(35) DEFAULT NULL, `PState` varchar(2) DEFAULT NULL, `PZip` varchar(5) DEFAULT NULL, `PMailAddress` varchar(100) DEFAULT NULL, `PMailAddress2` varchar(100) DEFAULT NULL, `PMailCity` varchar(35) DEFAULT NULL, `PMailState` varchar(2) DEFAULT NULL, `PMailZip` varchar(5) DEFAULT NULL, `PCounty` varchar(25) DEFAULT NULL, `PUrbanization` varchar(255) DEFAULT NULL, `PEmail` varchar(255) DEFAULT NULL, `PDOB` datetime DEFAULT NULL, `PSSN` varchar(9) NOT NULL DEFAULT '', `PGender` varchar(1) NOT NULL DEFAULT '', `PEthnicityIsHispanic` tinyint(1) DEFAULT '0', `EXISTING_PersonID` int(11) DEFAULT NULL, PRIMARY KEY (`PersonID`), UNIQUE KEY `PersonID` (`PersonID`), KEY `EXISTING_PersonID` (`EXISTING_PersonID`), KEY `PDOB` (`PDOB`), KEY `PersonLN` (`PersonLN`), KEY `PSSN` (`PSSN`)) ENGINE=InnoDB AUTO_INCREMENT=2243 DEFAULT CHARSET=utf8

For tblApplicants

CREATE TABLE `minerva`.`tblApplicants` ( `ApplicantID` INT(11) NOT NULL AUTO_INCREMENT ,  `fkPersonID` INT(11) NOT NULL ,  `Income` INT(11) NULL ,  `ReferralSource` VARCHAR(48) NOT NULL ,  `PrevSchool` VARCHAR(48) NOT NULL ,  `PrevSchoolCity` VARCHAR(48) NOT NULL ,  `PrevSchoolState` VARCHAR(48) NOT NULL ,  `StudentClassification` VARCHAR(48) NOT NULL ,  `AcademicCredits` INT(4) NOT NULL ,  `Withdrawl` TINYINT(1) NOT NULL ,  `HighestEducation` VARCHAR(48) NOT NULL ,  `EmploymentStatus` VARCHAR(48) NOT NULL ,  `LegalStatus` TINYINT(1) NOT NULL ,  `LivingWith` VARCHAR(48) NOT NULL ,  `Status` VARCHAR(24) NOT NULL ,    PRIMARY KEY  (`ApplicantID`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

For tblAppDocs

CREATE TABLE `minerva`.`tblAppDocs` ( `dateUploaded` DATE NOT NULL , `applicantID` INT(255) NOT NULL , `docType` VARCHAR(255) NOT NULL , `note` VARCHAR(255) NOT NULL , `filePath` VARCHAR(255) NOT NULL , `documentID` INT(255) NOT NULL AUTO_INCREMENT , PRIMARY KEY (`documentID`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

For tblAppContacts

CREATE TABLE `minerva`.`tblAppContacts` ( `ContactID` INT(11) NOT NULL AUTO_INCREMENT ,  `fkPersonID` INT(11) NOT NULL ,  `Value` VARCHAR(48) NULL ,  `Ext` INT(8) NULL ,  `Description` VARCHAR(255) NULL ,  `ContactType` VARCHAR(24) NOT NULL ,  `IsPreferred` TINYINT(1) NULL ,    PRIMARY KEY  (`ContactID`)) ENGINE = InnoDB;

For tblAppGuardians

CREATE TABLE `minerva`.`tblAppGuardians` ( `GuardianID` INT(11) NOT NULL AUTO_INCREMENT , `fkPersonID` INT(11) NOT NULL , `fName` VARCHAR(255) NOT NULL , `lName` VARCHAR(255) NOT NULL , `Relationship` VARCHAR(48) NOT NULL , `PhoneNum` VARCHAR(15) NOT NULL , `Email` VARCHAR(48) NOT NULL , `IsLegalGuardian` TINYINT(1) NOT NULL , PRIMARY KEY (`GuardianID`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;
