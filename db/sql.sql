CREATE TYPE "status_badania" AS ENUM (
  'oczekujace',
  'oplacone',
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
  'analityka',
  'hematologia',
  'biochemia',
  'immunochemia',
  'serologia',
  'koagulologia',
  'mikrobiologia'
);

CREATE TABLE "dane_osobowe" (
  "id" SERIAL PRIMARY KEY,
  "imie" varchar(20) NOT NULL,
  "nazwisko" varchar(20) NOT NULL,
  "pesel" varchar(11) UNIQUE NOT NULL,
  "data_urodzenia" date NOT NULL
);

CREATE TABLE "pracownik" (
  "id" SERIAL PRIMARY KEY,
  "dane_osobowe_id" int,
  "stanowisko_id" int,
  "laboratorium_id" int,
  "email" varchar(30) NOT NULL,
  "password" varchar(60) NOT NULL,
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
  "nazwa" varchar(20),
  "opis" varchar(200)
);

CREATE TABLE "badanie_kategoria" (
  "badanie_id" int,
  "kategoria_id" int
);

CREATE TABLE "badanie" (
  "id" SERIAL PRIMARY KEY,
  "nazwa" varchar(30) NOT NULL,
  "wartosc_min" decimal NOT NULL,
  "wartosc_max" decimal NOT NULL,
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
  "kod_dostepu" varchar(20) NOT NULL
);

CREATE TABLE "platnosc" (
  "id" SERIAL PRIMARY KEY,
  "zamowienie_id" int,
  "typ" typ_platosci DEFAULT 'gotowka',
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

CREATE TABLE "laboratorium" (
  "id" SERIAL PRIMARY KEY,
  "miasto" varchar(20) NOT NULL,
  "adres" varchar(20) NOT NULL,
  "liczba_aparatow" int DEFAULT 7
);

CREATE TABLE "punkt_pobran" (
  "id" SERIAL PRIMARY KEY,
  "miasto" varchar(20) NOT NULL,
  "adres" varchar(20) NOT NULL,
  "laboratorium_id" int NOT NULL
);

ALTER TABLE "pracownik" ADD FOREIGN KEY ("dane_osobowe_id") REFERENCES "dane_osobowe" ("id");

ALTER TABLE "pracownik" ADD FOREIGN KEY ("stanowisko_id") REFERENCES "stanowisko" ("id");

ALTER TABLE "pracownik" ADD FOREIGN KEY ("laboratorium_id") REFERENCES "laboratorium" ("id");

ALTER TABLE "badanie_kategoria" ADD FOREIGN KEY ("badanie_id") REFERENCES "badanie" ("id");

ALTER TABLE "badanie_kategoria" ADD FOREIGN KEY ("kategoria_id") REFERENCES "kategoria_badan" ("id");

ALTER TABLE "zamowienie_badan" ADD FOREIGN KEY ("dane_osobowe_id") REFERENCES "dane_osobowe" ("id");

ALTER TABLE "zamowienie_badan" ADD FOREIGN KEY ("punkt_pobran_id") REFERENCES "punkt_pobran" ("id");

ALTER TABLE "platnosc" ADD FOREIGN KEY ("zamowienie_id") REFERENCES "zamowienie_badan" ("id");

ALTER TABLE "zlecenie_badania" ADD FOREIGN KEY ("zamowienie_id") REFERENCES "zamowienie_badan" ("id");

ALTER TABLE "zlecenie_badania" ADD FOREIGN KEY ("laboratorium_id") REFERENCES "laboratorium" ("id");

ALTER TABLE "zlecenie_badania" ADD FOREIGN KEY ("badanie_id") REFERENCES "badanie" ("id");

ALTER TABLE "punkt_pobran" ADD FOREIGN KEY ("laboratorium_id") REFERENCES "laboratorium" ("id");


ALTER TABLE "wynik_badania" ADD FOREIGN KEY ("zlecenie_badania_id") REFERENCES "zlecenie_badania" ("id");

ALTER TABLE "wynik_badania" ADD FOREIGN KEY ("pracownik_id") REFERENCES "pracownik" ("id");




INSERT INTO stanowisko (nazwa, pensja, opis) VALUES
('stażysta', 2000, 'status studenta odbywającego staż w laboratorium, przygląda się pracy diagnostów oraz wykonuje najbardziej podstawowe czynności'),
('młodszy diagnosta', 4200, 'młodszy diagnosta zajmuje się wykonywaniem podstawowych badań pod okiem starszego diagnosty'),
('starszy diagnosta', 6300, 'starszy diagnosta jest w pełni samodzielnym pracownikiem odpowiadającym za poprawne wykonywanie badań, opiekuje się młodszymi diagnostami'),
('administrator systemu', 18000, 'zarządza systemem informatycznym, rozwiazuje wszelkie problemy techniczne zwiazane z aplikacją laboratorium');

INSERT INTO laboratorium (miasto, adres, liczba_aparatow) VALUES
('Kraków', 'Złotnicza 28A', 13),
('Warszawa', 'Aleje Ujazdowskie 34', 23);

SELECT unnest(enum_range(NULL::rodzaj_pracowni))


CREATE VIEW rodzaje_pracowni AS
SELECT unnest(enum_range(NULL::rodzaj_pracowni)) as name;

CREATE VIEW rodzaje_badan AS
SELECT unnest(enum_range(NULL::rodzaj_pracowni)) as name;

CREATE VIEW materialy_biologiczne AS
SELECT unnest(enum_range(NULL::material_biologiczny)) as name;


CREATE VIEW pracownik_komplet_informacji AS
SELECT
    pr.email,
    pr.data_zatrudnienia,
    pr.premia,
    st.nazwa as stanowisko,
    st.pensja,
    d_os.imie,
    d_os.nazwisko
FROM pracownik PR
    JOIN stanowisko ST ON PR.stanowisko_id = ST.id
    JOIN dane_osobowe D_OS ON PR.dane_osobowe_id = D_OS.id;

SELECT * FROM pracownik_komplet_informacji


