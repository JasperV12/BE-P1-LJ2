-- Step: 01
-- Goal: Create a new database jamin
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      BE Opdracht 02 - Magazijn Jamin
-- **********************************************************************************/

DROP DATABASE IF EXISTS `jamin`;
CREATE DATABASE IF NOT EXISTS `jamin`;
USE `jamin`;

-- Step: 02
-- Goal: Create table Product
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New
-- **********************************************************************************/

DROP TABLE IF EXISTS `ProductPerLeverancier`;
DROP TABLE IF EXISTS `ProductPerAllergeen`;
DROP TABLE IF EXISTS `Magazijn`;
DROP TABLE IF EXISTS `Leverancier`;
DROP TABLE IF EXISTS `Allergeen`;
DROP TABLE IF EXISTS `Product`;

CREATE TABLE `Product`
(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Naam` VARCHAR(100) NOT NULL,
    `Barcode` VARCHAR(13) NOT NULL,
    `IsActief` BIT NOT NULL DEFAULT 1,
    `Opmerking` VARCHAR(255) NULL DEFAULT NULL,
    `DatumAangemaakt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `DatumGewijzigd` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    CONSTRAINT `PK_Product_Id` PRIMARY KEY (`Id`),
    CONSTRAINT `UQ_Product_Barcode` UNIQUE (`Barcode`)
) ENGINE=InnoDB;

-- Step: 03
-- Goal: Fill table Product with data
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New (Winegums IsActief = 0)
-- **********************************************************************************/

INSERT INTO `Product` (`Id`, `Naam`, `Barcode`, `IsActief`, `Opmerking`, `DatumAangemaakt`, `DatumGewijzigd`) VALUES
    (1, 'Mintnopjes', '8719587231278', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (2, 'Schoolkrijt', '8719587326713', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (3, 'Honingdrop', '8719587327836', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (4, 'Zure Beren', '8719587321441', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (5, 'Cola Flesjes', '8719587321237', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (6, 'Turtles', '8719587322245', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (7, 'Witte Muizen', '8719587328256', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (8, 'Reuzen Slangen', '8719587325641', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (9, 'Zoute Rijen', '8719587322739', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (10, 'Winegums', '8719587327527', 0, 'Wordt niet meer geproduceerd', SYSDATE(6), SYSDATE(6)),
    (11, 'Drop Munten', '8719587322345', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (12, 'Kruis Drop', '8719587322265', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (13, 'Zoute Ruitjes', '8719587323256', 1, NULL, SYSDATE(6), SYSDATE(6));

-- Step: 04
-- Goal: Create table Allergeen
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New
-- **********************************************************************************/

CREATE TABLE `Allergeen`
(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Naam` VARCHAR(50) NOT NULL,
    `Omschrijving` VARCHAR(255) NOT NULL,
    `IsActief` BIT NOT NULL DEFAULT 1,
    `Opmerking` VARCHAR(255) NULL DEFAULT NULL,
    `DatumAangemaakt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `DatumGewijzigd` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    CONSTRAINT `PK_Allergeen_Id` PRIMARY KEY (`Id`)
) ENGINE=InnoDB;

-- Step: 05
-- Goal: Fill table Allergeen with data
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New
-- **********************************************************************************/

INSERT INTO `Allergeen` (`Id`, `Naam`, `Omschrijving`, `IsActief`, `Opmerking`, `DatumAangemaakt`, `DatumGewijzigd`) VALUES
    (1, 'Gluten', 'Dit product bevat gluten', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (2, 'Gelatine', 'Dit product bevat gelatine', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (3, 'AZO-Kleurstof', 'Dit product bevat AZO-kleurstoffen', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (4, 'Lactose', 'Dit product bevat lactose', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (5, 'Soja', 'Dit product bevat soja', 1, NULL, SYSDATE(6), SYSDATE(6));

-- Step: 06
-- Goal: Create table Leverancier
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New
-- **********************************************************************************/

CREATE TABLE `Leverancier`
(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Naam` VARCHAR(100) NOT NULL,
    `ContactPersoon` VARCHAR(100) NOT NULL,
    `LeverancierNummer` VARCHAR(20) NOT NULL,
    `Mobiel` VARCHAR(15) NOT NULL,
    `IsActief` BIT NOT NULL DEFAULT 1,
    `Opmerking` VARCHAR(255) NULL DEFAULT NULL,
    `DatumAangemaakt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `DatumGewijzigd` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    CONSTRAINT `PK_Leverancier_Id` PRIMARY KEY (`Id`),
    CONSTRAINT `UQ_Leverancier_LeverancierNummer` UNIQUE (`LeverancierNummer`)
) ENGINE=InnoDB;

-- Step: 07
-- Goal: Fill table Leverancier with data
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New (Quality Street toegevoegd)
-- **********************************************************************************/

INSERT INTO `Leverancier` (`Id`, `Naam`, `ContactPersoon`, `LeverancierNummer`, `Mobiel`, `IsActief`, `Opmerking`, `DatumAangemaakt`, `DatumGewijzigd`) VALUES
    (1, 'Venco', 'Bert van Linge', 'L1029384719', '06-28493827', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (2, 'Astra Sweets', 'Jasper del Monte', 'L1029284315', '06-39398734', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (3, 'Haribo', 'Sven Stalman', 'L1029324748', '06-24383291', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (4, 'Basset', 'Joyce Stelterberg', 'L1023845773', '06-48293823', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (5, 'De Bron', 'Remco Veenstra', 'L1023857736', '06-34291234', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (6, 'Quality Street', 'Johan Nooij', 'L1029234586', '06-23458456', 1, NULL, SYSDATE(6), SYSDATE(6));

-- Step: 08
-- Goal: Create table Magazijn
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New
-- **********************************************************************************/

CREATE TABLE `Magazijn`
(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `ProductId` INT UNSIGNED NOT NULL,
    `VerpakkingsEenheid` DECIMAL(4,1) NOT NULL,
    `AantalAanwezig` INT UNSIGNED NULL,
    `IsActief` BIT NOT NULL DEFAULT 1,
    `Opmerking` VARCHAR(255) NULL DEFAULT NULL,
    `DatumAangemaakt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `DatumGewijzigd` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    CONSTRAINT `PK_Magazijn_Id` PRIMARY KEY (`Id`),
    CONSTRAINT `UQ_Magazijn_ProductId` UNIQUE (`ProductId`),
    CONSTRAINT `FK_Magazijn_ProductId_Product_Id`
        FOREIGN KEY (`ProductId`) REFERENCES `Product` (`Id`)
) ENGINE=InnoDB;

-- Step: 09
-- Goal: Fill table Magazijn with data
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New
-- **********************************************************************************/

INSERT INTO `Magazijn` (`Id`, `ProductId`, `VerpakkingsEenheid`, `AantalAanwezig`, `IsActief`, `Opmerking`, `DatumAangemaakt`, `DatumGewijzigd`) VALUES
    (1, 1, 5.0, 453, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (2, 2, 2.5, 400, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (3, 3, 5.0, 1, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (4, 4, 1.0, 800, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (5, 5, 3.0, 234, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (6, 6, 2.0, 345, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (7, 7, 1.0, 795, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (8, 8, 10.0, 233, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (9, 9, 2.5, 123, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (10, 10, 3.0, NULL, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (11, 11, 2.0, 367, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (12, 12, 1.0, 467, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (13, 13, 5.0, 20, 1, NULL, SYSDATE(6), SYSDATE(6));

-- Step: 10
-- Goal: Create table ProductPerAllergeen
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New
-- **********************************************************************************/

CREATE TABLE `ProductPerAllergeen`
(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `ProductId` INT UNSIGNED NOT NULL,
    `AllergeenId` INT UNSIGNED NOT NULL,
    `IsActief` BIT NOT NULL DEFAULT 1,
    `Opmerking` VARCHAR(255) NULL DEFAULT NULL,
    `DatumAangemaakt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `DatumGewijzigd` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    CONSTRAINT `PK_ProductPerAllergeen_Id` PRIMARY KEY (`Id`),
    CONSTRAINT `UQ_ProductPerAllergeen_Product_Allergeen` UNIQUE (`ProductId`, `AllergeenId`),
    CONSTRAINT `FK_ProductPerAllergeen_ProductId_Product_Id`
        FOREIGN KEY (`ProductId`) REFERENCES `Product` (`Id`),
    CONSTRAINT `FK_ProductPerAllergeen_AllergeenId_Allergeen_Id`
        FOREIGN KEY (`AllergeenId`) REFERENCES `Allergeen` (`Id`)
) ENGINE=InnoDB;

-- Step: 11
-- Goal: Fill table ProductPerAllergeen with data
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New
-- **********************************************************************************/

INSERT INTO `ProductPerAllergeen` (`Id`, `ProductId`, `AllergeenId`, `IsActief`, `Opmerking`, `DatumAangemaakt`, `DatumGewijzigd`) VALUES
    (1, 1, 2, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (2, 1, 1, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (3, 1, 3, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (4, 3, 4, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (5, 6, 5, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (6, 9, 2, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (7, 9, 5, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (8, 10, 2, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (9, 12, 4, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (10, 13, 1, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (11, 13, 4, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (12, 13, 5, 1, NULL, SYSDATE(6), SYSDATE(6));

-- Step: 12
-- Goal: Create table ProductPerLeverancier
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New
-- **********************************************************************************/

CREATE TABLE `ProductPerLeverancier`
(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `LeverancierId` INT UNSIGNED NOT NULL,
    `ProductId` INT UNSIGNED NOT NULL,
    `DatumLevering` DATE NOT NULL,
    `Aantal` INT UNSIGNED NOT NULL,
    `DatumEerstVolgendeLevering` DATE NULL,
    `IsActief` BIT NOT NULL DEFAULT 1,
    `Opmerking` VARCHAR(255) NULL DEFAULT NULL,
    `DatumAangemaakt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `DatumGewijzigd` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    CONSTRAINT `PK_ProductPerLeverancier_Id` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_ProductPerLeverancier_LeverancierId_Leverancier_Id`
        FOREIGN KEY (`LeverancierId`) REFERENCES `Leverancier` (`Id`),
    CONSTRAINT `FK_ProductPerLeverancier_ProductId_Product_Id`
        FOREIGN KEY (`ProductId`) REFERENCES `Product` (`Id`)
) ENGINE=InnoDB;

-- Step: 13
-- Goal: Fill table ProductPerLeverancier with data
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New (data conform specificatie)
-- **********************************************************************************/

INSERT INTO `ProductPerLeverancier`
    (`Id`, `LeverancierId`, `ProductId`, `DatumLevering`, `Aantal`, `DatumEerstVolgendeLevering`, `IsActief`, `Opmerking`, `DatumAangemaakt`, `DatumGewijzigd`)
VALUES
    (1, 1, 1, '2024-11-09', 23, '2024-11-16', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (2, 1, 1, '2024-11-18', 21, '2024-11-25', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (3, 1, 2, '2024-11-09', 12, '2024-11-16', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (4, 1, 3, '2024-11-10', 11, '2024-11-17', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (5, 2, 4, '2024-11-14', 16, '2024-11-21', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (6, 2, 4, '2024-11-21', 23, '2024-11-28', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (7, 2, 5, '2024-11-14', 45, '2024-11-21', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (8, 2, 6, '2024-11-14', 30, '2024-11-21', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (9, 3, 7, '2024-11-12', 12, '2024-11-19', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (10, 3, 7, '2024-11-19', 23, '2024-11-26', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (11, 3, 8, '2024-11-10', 12, '2024-11-17', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (12, 3, 9, '2024-11-11', 1, '2024-11-18', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (13, 4, 10, '2024-11-16', 24, '2024-11-30', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (14, 5, 11, '2024-11-10', 47, '2024-11-17', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (15, 5, 11, '2024-11-19', 60, '2024-11-26', 1, NULL, SYSDATE(6), SYSDATE(6)),
    (16, 5, 12, '2024-11-11', 45, NULL, 1, NULL, SYSDATE(6), SYSDATE(6)),
    (17, 5, 13, '2024-11-12', 23, NULL, 1, NULL, SYSDATE(6), SYSDATE(6));

-- Step: 14
-- Goal: Create Stored Procedures for User Story 01 & User Story 02
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            30-09-2026      Jasper                      New Stored Procedures
-- **********************************************************************************/

DELIMITER $$

-- Procedure 1: Overzicht van alle leveranciers gesorteerd op aantal verschillende producten aflopend
DROP PROCEDURE IF EXISTS `spGetLeveranciersOverzicht`$$
CREATE PROCEDURE `spGetLeveranciersOverzicht`()
BEGIN
    SELECT 
        l.Id,
        l.Naam,
        l.ContactPersoon,
        l.LeverancierNummer,
        l.Mobiel,
        COUNT(DISTINCT ppl.ProductId) AS AantalVerschillendeProducten
    FROM Leverancier l
    LEFT JOIN ProductPerLeverancier ppl ON l.Id = ppl.LeverancierId
    GROUP BY l.Id, l.Naam, l.ContactPersoon, l.LeverancierNummer, l.Mobiel
    ORDER BY AantalVerschillendeProducten DESC, l.Naam ASC;
END$$

-- Procedure 2: Geleverde verschillende producten van een leverancier gesorteerd op Aantal in Magazijn aflopend
DROP PROCEDURE IF EXISTS `spGetGeleverdeProductenByLeverancier`$$
CREATE PROCEDURE `spGetGeleverdeProductenByLeverancier`(IN p_LeverancierId INT UNSIGNED)
BEGIN
    SELECT 
        p.Id AS ProductId,
        p.Naam AS NaamProduct,
        p.IsActief,
        m.AantalAanwezig,
        m.VerpakkingsEenheid,
        MAX(ppl.DatumLevering) AS LaatsteLevering
    FROM ProductPerLeverancier ppl
    INNER JOIN Product p ON ppl.ProductId = p.Id
    LEFT JOIN Magazijn m ON p.Id = m.ProductId
    WHERE ppl.LeverancierId = p_LeverancierId
    GROUP BY p.Id, p.Naam, p.IsActief, m.AantalAanwezig, m.VerpakkingsEenheid
    ORDER BY m.AantalAanwezig DESC;
END$$

-- Procedure 3: Ophalen leveringsdetails voor het invoerscherm 'Levering Product' (Wireframe-04)
DROP PROCEDURE IF EXISTS `spGetLeveringProductDetails`$$
CREATE PROCEDURE `spGetLeveringProductDetails`(
    IN p_LeverancierId INT UNSIGNED,
    IN p_ProductId INT UNSIGNED
)
BEGIN
    SELECT 
        p.Id AS ProductId,
        p.Naam AS ProductNaam,
        p.IsActief,
        l.Id AS LeverancierId,
        l.Naam AS LeverancierNaam,
        l.ContactPersoon,
        l.Mobiel,
        m.AantalAanwezig,
        m.VerpakkingsEenheid
    FROM Product p
    CROSS JOIN Leverancier l ON l.Id = p_LeverancierId
    LEFT JOIN Magazijn m ON p.Id = m.ProductId
    WHERE p.Id = p_ProductId;
END$$

-- Procedure 4: Toevoegen van een nieuwe levering en bijwerken van de magazijnvoorraad
DROP PROCEDURE IF EXISTS `spAddProductLevering`$$
CREATE PROCEDURE `spAddProductLevering`(
    IN p_LeverancierId INT UNSIGNED,
    IN p_ProductId INT UNSIGNED,
    IN p_Aantal INT UNSIGNED,
    IN p_DatumEerstVolgendeLevering DATE
)
BEGIN
    DECLARE v_IsActief BIT;
    DECLARE v_ProductNaam VARCHAR(100);
    DECLARE v_LeverancierNaam VARCHAR(100);

    SELECT IsActief, Naam INTO v_IsActief, v_ProductNaam
    FROM Product WHERE Id = p_ProductId;

    SELECT Naam INTO v_LeverancierNaam
    FROM Leverancier WHERE Id = p_LeverancierId;

    -- Controleer of het product actief is
    IF v_IsActief = 0 THEN
        SELECT 
            0 AS Success, 
            CONCAT('Het product ', v_ProductNaam, ' van de leverancier ', v_LeverancierNaam, ' wordt niet meer geproduceerd') AS Message;
    ELSE
        -- Magazijn voorraad verhogen
        UPDATE Magazijn
        SET AantalAanwezig = COALESCE(AantalAanwezig, 0) + p_Aantal,
            DatumGewijzigd = NOW(6)
        WHERE ProductId = p_ProductId;

        -- Nieuwe levering registreren
        INSERT INTO ProductPerLeverancier
            (LeverancierId, ProductId, DatumLevering, Aantal, DatumEerstVolgendeLevering, IsActief, Opmerking, DatumAangemaakt, DatumGewijzigd)
        VALUES
            (p_LeverancierId, p_ProductId, CURDATE(), p_Aantal, p_DatumEerstVolgendeLevering, 1, NULL, NOW(6), NOW(6));

        SELECT 
            1 AS Success, 
            'Levering succesvol toegevoegd' AS Message;
    END IF;
END$$

DELIMITER ;
