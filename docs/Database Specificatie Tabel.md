# Database Specificatie Tabellen - Magazijn Jamin

## 1. Product

| Kolom naam          | Datatype     | Lengte | Nullable | Opmerking                            |
| :------------------ | :----------- | :----: | :------: | :----------------------------------- |
| **Id**              | INT UNSIGNED |   10   |    No    | PK, Auto Increment                   |
| **Naam**            | VARCHAR      |  100   |    No    | Naam van het snoepproduct            |
| **Barcode**         | VARCHAR      |   13   |    No    | EAN-13 barcode, Uniek                |
| **IsActief**        | BIT          |   1    |    No    | 1 = Actief, 0 = Inactief (DEFAULT 1) |
| **Opmerking**       | VARCHAR      |  255   |   Yes    | Optionele opmerking                  |
| **DatumAangemaakt** | DATETIME     |   6    |    No    | Registratiedatum en tijd             |
| **DatumGewijzigd**  | DATETIME     |   6    |    No    | Laatste wijzigingsdatum en tijd      |

## 2. Allergeen

| Kolom naam          | Datatype     | Lengte | Nullable | Opmerking                       |
| :------------------ | :----------- | :----: | :------: | :------------------------------ |
| **Id**              | INT UNSIGNED |   10   |    No    | PK, Auto Increment              |
| **Naam**            | VARCHAR      |   50   |    No    | Naam van het allergeen          |
| **Omschrijving**    | VARCHAR      |  255   |    No    | Omschrijving van het allergeen  |
| **IsActief**        | BIT          |   1    |    No    | Systeemveld (DEFAULT 1)         |
| **Opmerking**       | VARCHAR      |  255   |   Yes    | Optionele opmerking             |
| **DatumAangemaakt** | DATETIME     |   6    |    No    | Registratiedatum en tijd        |
| **DatumGewijzigd**  | DATETIME     |   6    |    No    | Laatste wijzigingsdatum en tijd |

## 3. Leverancier

| Kolom naam            | Datatype     | Lengte | Nullable | Opmerking                         |
| :-------------------- | :----------- | :----: | :------: | :-------------------------------- |
| **Id**                | INT UNSIGNED |   10   |    No    | PK, Auto Increment                |
| **Naam**              | VARCHAR      |  100   |    No    | Naam van de leverancier           |
| **ContactPersoon**    | VARCHAR      |  100   |    No    | Contactpersoon van de leverancier |
| **LeverancierNummer** | VARCHAR      |   20   |    No    | Uniek leveranciernummer           |
| **Mobiel**            | VARCHAR      |   15   |    No    | Mobiel telefoonnummer             |
| **IsActief**          | BIT          |   1    |    No    | Systeemveld (DEFAULT 1)           |
| **Opmerking**         | VARCHAR      |  255   |   Yes    | Optionele opmerking               |
| **DatumAangemaakt**   | DATETIME     |   6    |    No    | Registratiedatum en tijd          |
| **DatumGewijzigd**    | DATETIME     |   6    |    No    | Laatste wijzigingsdatum en tijd   |

## 4. Magazijn

| Kolom naam             | Datatype     | Lengte | Nullable | Opmerking                                   |
| :--------------------- | :----------- | :----: | :------: | :------------------------------------------ |
| **Id**                 | INT UNSIGNED |   10   |    No    | PK, Auto Increment                          |
| **ProductId**          | INT UNSIGNED |   10   |    No    | FK -> Product(Id), Uniek                    |
| **VerpakkingsEenheid** | DECIMAL      |  4,1   |    No    | Verpakkingseenheid in kg                    |
| **AantalAanwezig**     | INT UNSIGNED |   10   |   Yes    | Voorraad in magazijn (NULL indien onbekend) |
| **IsActief**           | BIT          |   1    |    No    | Systeemveld (DEFAULT 1)                     |
| **Opmerking**          | VARCHAR      |  255   |   Yes    | Optionele opmerking                         |
| **DatumAangemaakt**    | DATETIME     |   6    |    No    | Registratiedatum en tijd                    |
| **DatumGewijzigd**     | DATETIME     |   6    |    No    | Laatste wijzigingsdatum en tijd             |

## 5. ProductPerAllergeen

| Kolom naam          | Datatype     | Lengte | Nullable | Opmerking                       |
| :------------------ | :----------- | :----: | :------: | :------------------------------ |
| **Id**              | INT UNSIGNED |   10   |    No    | PK, Auto Increment              |
| **ProductId**       | INT UNSIGNED |   10   |    No    | FK -> Product(Id)               |
| **AllergeenId**     | INT UNSIGNED |   10   |    No    | FK -> Allergeen(Id)             |
| **IsActief**        | BIT          |   1    |    No    | Systeemveld (DEFAULT 1)         |
| **Opmerking**       | VARCHAR      |  255   |   Yes    | Optionele opmerking             |
| **DatumAangemaakt** | DATETIME     |   6    |    No    | Registratiedatum en tijd        |
| **DatumGewijzigd**  | DATETIME     |   6    |    No    | Laatste wijzigingsdatum en tijd |

## 6. ProductPerLeverancier

| Kolom naam                     | Datatype     | Lengte | Nullable | Opmerking                              |
| :----------------------------- | :----------- | :----: | :------: | :------------------------------------- |
| **Id**                         | INT UNSIGNED |   10   |    No    | PK, Auto Increment                     |
| **LeverancierId**              | INT UNSIGNED |   10   |    No    | FK -> Leverancier(Id)                  |
| **ProductId**                  | INT UNSIGNED |   10   |    No    | FK -> Product(Id)                      |
| **DatumLevering**              | DATE         |   -    |    No    | Datum van de levering                  |
| **Aantal**                     | INT UNSIGNED |   10   |    No    | Aantal geleverde eenheden              |
| **DatumEerstVolgendeLevering** | DATE         |   -    |   Yes    | Verwachte datum eerstvolgende levering |
| **IsActief**                   | BIT          |   1    |    No    | Systeemveld (DEFAULT 1)                |
| **Opmerking**                  | VARCHAR      |  255   |   Yes    | Optionele opmerking                    |
| **DatumAangemaakt**            | DATETIME     |   6    |    No    | Registratiedatum en tijd               |
| **DatumGewijzigd**             | DATETIME     |   6    |    No    | Laatste wijzigingsdatum en tijd        |
