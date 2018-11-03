#!/bin/bash

DROP DATABASE CS3320;

create database CS3320;

USE CS3320;

CREATE TABLE IF NOT EXISTS clientInformation (
  clientId INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR (100) NOT NULL,
  state VARCHAR (2) NOT NULL,
  zipCode VARCHAR (10) NOT NULL,
  phone VARCHAR (10) NOT NULL,
  email VARCHAR (255) NOT NULL
  );

CREATE TABLE IF NOT EXISTS fuelQuote (
  quoteId INT AUTO_INCREMENT PRIMARY KEY,
  clientId INT NOT NULL,
  gallonsRequested double,
  requestDate datetime,
  deliveryDate datetime,
  deliveryAddress VARCHAR (255) NOT NULL,
  deliveryCity VARCHAR (100) NOT NULL,
  deliveryState VARCHAR (2) NOT NULL,
  deliveryZipCode VARCHAR (10) NOT NULL,
  deliveryContactName VARCHAR (255) NOT NULL,
  deliveryContactPhone VARCHAR (10) NOT NULL,
  deliveryContactEmail VARCHAR (255) NOT NULL,
  suggestedPrice double,
  totalAmountDue double,
  CONSTRAINT FK_clientId FOREIGN KEY (clientId) REFERENCES clientInformation(clientId)
 );
