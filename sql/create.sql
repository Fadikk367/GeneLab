CREATE TYPE "status_badania" AS ENUM (
  'oczekujace',
  'zrealizowane'
);

CREATE TYPE "typ_platosci" AS ENUM (
  'gotowka',
  'karta',
  'przelew'
);

CREATE TYPE "material_biologiczny" AS ENUM (
  'krew',
  'mocz',
  'wymaz'
);

CREATE TYPE "rodzaj_pracowni" AS ENUM (
  'analityczna',
  'hematologia',
  'biochemia',
  'immunochemia',
  'serologia',
  'koagulologia',
  'mikrobiologia'
);

CREATE TYPE zamowienie_metadane AS (
	imie VARCHAR,
	nazwisko VARCHAR,
	pesel VARCHAR,
	data_urodzenia TIMESTAMP,
	adres VARCHAR,
	data TIMESTAMP
);

CREATE TABLE "dane_osobowe" (
  "id" SERIAL UNIQUE,
  "pesel" varchar(11) UNIQUE NOT NULL,
  "imie" varchar(20) NOT NULL,
  "nazwisko" varchar(20) NOT NULL,
  "data_urodzenia" date NOT NULL,
  PRIMARY KEY ("id", "pesel")
);

CREATE TABLE "pracownik" (
  "id" SERIAL PRIMARY KEY,
  "dane_osobowe_id" int,
  "stanowisko_id" int,
  "laboratorium_id" int,
  "email" varchar NOT NULL,
  "haslo" varchar NOT NULL,
  "data_zatrudnienia" date DEFAULT (now()),
  "premia" numeric DEFAULT 0
);

CREATE TABLE "stanowisko" (
  "id" SERIAL PRIMARY KEY,
  "nazwa" varchar(50) NOT NULL,
  "pensja" numeric NOT NULL,
  "opis" text
);

CREATE TABLE "kategoria_badan" (
  "id" SERIAL PRIMARY KEY,
  "nazwa" varchar(20) NOT NULL,
  "opis" varchar(200)
);

CREATE TABLE "badanie_kategoria" (
  "badanie_id" int,
  "kategoria_id" int,
  PRIMARY KEY ("badanie_id", "kategoria_id")
);

CREATE TABLE "badanie" (
  "id" SERIAL PRIMARY KEY,
  "nazwa" varchar(50) NOT NULL,
  "wartosc_min" numeric NOT NULL,
  "wartosc_max" numeric NOT NULL,
  "jednostka" varchar(10) NOT NULL,
  "cena" numeric NOT NULL,
  "material" material_biologiczny NOT NULL,
  "rodzaj" rodzaj_pracowni NOT NULL
);

CREATE TABLE "zamowienie_badan" (
  "id" SERIAL PRIMARY KEY,
  "dane_osobowe_id" int,
  "punkt_pobran_id" int,
  "data" timestamp DEFAULT (now()),
  "kod_dostepu" varchar NOT NULL
);

CREATE TABLE "platnosc" (
  "id" SERIAL PRIMARY KEY,
  "zamowienie_id" int,
  "rodzaj" typ_platosci DEFAULT 'gotowka',
  "data" timestamp DEFAULT (now()),
  "kwota" numeric NOT NULL,
  "zrealizowana" boolean DEFAULT true
);

CREATE TABLE "zlecenie_badania" (
  "id" SERIAL PRIMARY KEY,
  "zamowienie_id" int NOT NULL,
  "laboratorium_id" int NOT NULL,
  "badanie_id" int NOT NULL,
  "status" status_badania DEFAULT 'oczekujace',
  "koszt" numeric NOT NULL
);

CREATE TABLE "wynik_badania" (
  "id" SERIAL PRIMARY KEY,
  "data" timestamp DEFAULT (now()),
  "wartosc" numeric NOT NULL,
  "zlecenie_badania_id" int NOT NULL,
  "pracownik_id" int NOT NULL
);

CREATE TABLE "laboratorium_diagnostyczne" (
  "id" SERIAL PRIMARY KEY,
  "adres_id" int NOT NULL,
  "liczba_aparatow" int DEFAULT 7
);

CREATE TABLE "punkt_pobran" (
  "id" SERIAL PRIMARY KEY,
  "adres_id" int NOT NULL,
  "laboratorium_id" int NOT NULL
);

CREATE TABLE "adres" (
  "id" SERIAL PRIMARY KEY,
  "miasto" varchar(50) NOT NULL,
  "ulica" varchar(50) NOT NULL,
  "numer" varchar(10) NOT NULL
);

ALTER TABLE "pracownik" ADD FOREIGN KEY ("dane_osobowe_id") REFERENCES "dane_osobowe" ("id");

ALTER TABLE "pracownik" ADD FOREIGN KEY ("stanowisko_id") REFERENCES "stanowisko" ("id");

ALTER TABLE "pracownik" ADD FOREIGN KEY ("laboratorium_id") REFERENCES "laboratorium_diagnostyczne" ("id");

ALTER TABLE "badanie_kategoria" ADD FOREIGN KEY ("badanie_id") REFERENCES "badanie" ("id");

ALTER TABLE "badanie_kategoria" ADD FOREIGN KEY ("kategoria_id") REFERENCES "kategoria_badan" ("id");

ALTER TABLE "zamowienie_badan" ADD FOREIGN KEY ("dane_osobowe_id") REFERENCES "dane_osobowe" ("id");

ALTER TABLE "zamowienie_badan" ADD FOREIGN KEY ("punkt_pobran_id") REFERENCES "punkt_pobran" ("id");

ALTER TABLE "platnosc" ADD FOREIGN KEY ("zamowienie_id") REFERENCES "zamowienie_badan" ("id");

ALTER TABLE "zlecenie_badania" ADD FOREIGN KEY ("zamowienie_id") REFERENCES "zamowienie_badan" ("id");

ALTER TABLE "zlecenie_badania" ADD FOREIGN KEY ("laboratorium_id") REFERENCES "laboratorium_diagnostyczne" ("id");

ALTER TABLE "zlecenie_badania" ADD FOREIGN KEY ("badanie_id") REFERENCES "badanie" ("id");

ALTER TABLE "wynik_badania" ADD FOREIGN KEY ("zlecenie_badania_id") REFERENCES "zlecenie_badania" ("id");

ALTER TABLE "wynik_badania" ADD FOREIGN KEY ("pracownik_id") REFERENCES "pracownik" ("id");

ALTER TABLE "laboratorium_diagnostyczne" ADD FOREIGN KEY ("adres_id") REFERENCES "adres" ("id");

ALTER TABLE "punkt_pobran" ADD FOREIGN KEY ("adres_id") REFERENCES "adres" ("id");

ALTER TABLE "punkt_pobran" ADD FOREIGN KEY ("laboratorium_id") REFERENCES "laboratorium_diagnostyczne" ("id");