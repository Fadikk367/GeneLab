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


--------------------------------------------------
-------------------- WIDOKI ----------------------
--------------------------------------------------

CREATE VIEW rodzaje_pracowni(name) AS
	SELECT unnest(enum_range(NULL::rodzaj_pracowni)) AS name;


CREATE VIEW materialy_biologiczne(name) AS
	SELECT unnest(enum_range(NULL::material_biologiczny)) AS name;


CREATE VIEW rodzaje_badan(name) AS
	SELECT unnest(enum_range(NULL::rodzaj_pracowni)) AS name;


CREATE OR REPLACE VIEW wyniki_pracownikow(id, imie, nazwisko, stanowisko, data_zatrudnienia, adres, wykonane_badania) AS
SELECT pr.id,
       d.imie,
       d.nazwisko,
       s.nazwa AS stanowisko,
       pr.data_zatrudnienia,
       CONCAT(miasto, ', ', ulica, ' ', numer) AS adres,
       COUNT(wb.id) AS wykonane_badania
FROM pracownik pr
JOIN dane_osobowe d ON pr.dane_osobowe_id = d.id
JOIN stanowisko s ON pr.stanowisko_id = s.id
JOIN laboratorium_diagnostyczne lab ON pr.laboratorium_id = lab.id
JOIN adres adr ON adr.id = lab.adres_id
JOIN wynik_badania wb ON pr.id = wb.pracownik_id
GROUP BY pr.id, d.imie, d.nazwisko, s.nazwa, pr.data_zatrudnienia, miasto, ulica, numer
ORDER BY wykonane_badania DESC;



CREATE VIEW podsumowanie_laboratoriow(id, adres, liczba_pracownikow, liczba_punktow, suma_zlecen, przychod) AS
WITH points AS (
    SELECT pp.laboratorium_id, count(pp.id) AS liczba_punktow
    FROM punkt_pobran pp
    JOIN laboratorium_diagnostyczne lab_1 ON pp.laboratorium_id = lab_1.id
    GROUP BY pp.laboratorium_id
), employees AS (
    SELECT lab_1.id AS laboratorium_id, COUNT(pr.id) AS liczba_pracownikow
    FROM pracownik pr
    JOIN laboratorium_diagnostyczne lab_1 ON pr.laboratorium_id = lab_1.id
    GROUP BY lab_1.id
)
SELECT lab.id,
       CONCAT(miasto, ', ', ulica, ' ', numer)           AS adres,
       COALESCE(employees.liczba_pracownikow, 0::bigint) AS liczba_pracownikow,
       COALESCE(points.liczba_punktow, 0::bigint)        AS liczba_punktow,
       COALESCE(count(zb.id), 0::bigint)                 AS suma_zlecen,
       COALESCE(sum(zb.koszt), 0::numeric)               AS przychod
FROM laboratorium_diagnostyczne lab
JOIN adres adr ON adr.id = lab.adres_id
LEFT JOIN points ON lab.id = points.laboratorium_id
LEFT JOIN employees ON lab.id = employees.laboratorium_id
LEFT JOIN zlecenie_badania zb ON lab.id = zb.laboratorium_id
GROUP BY lab.id, employees.liczba_pracownikow, points.liczba_punktow, adr.miasto, adr.ulica, adr.numer
HAVING COALESCE(employees.liczba_pracownikow, 0::bigint) > 0 AND COALESCE(points.liczba_punktow, 0::bigint) > 0
ORDER BY liczba_pracownikow, liczba_punktow, suma_zlecen, przychod DESC;



CREATE VIEW pracownik_komplet_informacji(id, email, data_zatrudnienia, premia, stanowisko, pensja, imie, nazwisko) AS
SELECT pr.id,
       pr.email,
       pr.data_zatrudnienia,
       pr.premia,
       st.nazwa AS stanowisko,
       st.pensja,
       d_os.imie,
       d_os.nazwisko
FROM pracownik pr
JOIN stanowisko st ON pr.stanowisko_id = st.id
JOIN dane_osobowe d_os ON pr.dane_osobowe_id = d_os.id
ORDER BY d_os.nazwisko, d_os.imie DESC;


CREATE VIEW laboratorium_oblozenie_praca(id, adres, oczekujace_badania) AS
SELECT LAB.id, CONCAT(miasto, ', ', ulica, ' ', numer) AS adres, COUNT(*) as oczekujace_badania
FROM zlecenie_badania ZL_BAD
JOIN laboratorium_diagnostyczne LAB ON ZL_BAD.laboratorium_id = LAB.id
JOIN adres ADR on LAB.adres_id = ADR.id
GROUP BY LAB.id, ADR.miasto, ADR.ulica, ADR.numer, ZL_BAD.status
HAVING ZL_BAD.status = 'oczekujace';


CREATE VIEW laboratorium_zlecenia_badan(id, laboratorium_id, nazwa, material, min, max, unit) AS
SELECT ZL_BAD.id, ZL_BAD.laboratorium_id, BAD.nazwa as name, BAD.material, BAD.wartosc_min as min, BAD.wartosc_max as max, BAD.jednostka as unit
FROM zlecenie_badania ZL_BAD
JOIN badanie BAD ON ZL_BAD.badanie_id = BAD.id
WHERE ZL_BAD.status = 'oczekujace';



--------------------------------------------------
-------------- FUNKCJE I TRIGGERY ----------------
--------------------------------------------------

CREATE FUNCTION zaktualizuje_status_zleconego_badania() RETURNS TRIGGER
	LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE zlecenie_badania
    SET status = 'zrealizowane'
    WHERE id = NEW.zlecenie_badania_id;

    RETURN NEW;
END;
$$;


CREATE TRIGGER aktualizacja_statusu_zleconego_badania
after insert on wynik_badania
FOR EACH ROW
EXECUTE PROCEDURE zaktualizuje_status_zleconego_badania();



CREATE FUNCTION zablokuj_probe_ponownego_dodania_wyniku_badania() RETURNS TRIGGER
	LANGUAGE plpgsql
AS $$
DECLARE
    zlecone_badanie zlecenie_badania;
BEGIN
    SELECT INTO zlecone_badanie * FROM zlecenie_badania WHERE id = NEW.zlecenie_badania_id LIMIT 1;

    IF zlecone_badanie.status = 'zrealizowane' THEN
        RAISE EXCEPTION 'To badanie zostało już zrealizowane';
    end if;

    RETURN NEW;
END;
$$;


CREATE TRIGGER blokada_proby_ponownego_dodania_wyniku_badania
before insert on wynik_badania
FOR EACH ROW
EXECUTE PROCEDURE zablokuj_probe_ponownego_dodania_wyniku_badania();



CREATE FUNCTION pobierz_wyniki_badan(kod character varying) RETURNS TABLE(id integer, nazwa character varying, wartosc_min numeric, wartosc_max numeric, wynik numeric, jednostka character varying)
	LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT wb.id, b.nazwa, b.wartosc_min, b.wartosc_max, wb.wartosc as wynik, b.jednostka
    FROM zamowienie_badan ZAM_BAD
    JOIN zlecenie_badania ZB ON ZB.zamowienie_id = ZAM_BAD.id
    JOIN wynik_badania wb on ZB.id = wb.zlecenie_badania_id
    JOIN badanie b on ZB.badanie_id = b.id
    WHERE ZAM_BAD.kod_dostepu = kod;
END;
$$;



CREATE function pobierz_metadane_zamowienia(kod character varying) RETURNS zamowienie_metadane
    LANGUAGE plpgsql
AS
$$
DECLARE
    metadane zamowienie_metadane;
BEGIN
    SELECT imie, nazwisko, pesel, data_urodzenia, CONCAT(miasto, ', ', ulica, ' ', numer), ZB.data
    FROM zamowienie_badan ZB
    JOIN dane_osobowe DOS ON ZB.dane_osobowe_id = DOS.id
    JOIN punkt_pobran PP ON ZB.punkt_pobran_id = PP.id
    JOIN laboratorium_diagnostyczne ld ON PP.laboratorium_id = ld.id
    JOIN adres a ON ld.adres_id = a.id
    WHERE ZB.kod_dostepu = kod
    LIMIT 1
    INTO metadane;

    IF metadane.pesel IS NULL THEN
        RAISE EXCEPTION 'Bledny kod dostepu!';
    END IF;

    RETURN metadane;
END;
$$;



CREATE FUNCTION sprawdz_czy_mozna_usunac_badanie() RETURNS TRIGGER
	LANGUAGE plpgsql
AS $$
DECLARE
    _sql text;
BEGIN

    SELECT INTO _sql *
    FROM zlecenie_badania
    WHERE badanie_id = OLD.id
    LIMIT 1;

    IF _sql IS NOT NULL THEN
        RAISE EXCEPTION 'Nie można usunąć tego badania ze względu na wymóg zachowania historii wyników!';
    END IF;

    RETURN OLD;
END;
$$;


CREATE TRIGGER sprawdzenie_czy_mozna_usunac_badanie
BEFORE DELETE ON badanie
FOR EACH ROW
EXECUTE PROCEDURE sprawdz_czy_mozna_usunac_badanie();



CREATE FUNCTION znormalizuj_zwaliduj_dane_osobowe() RETURNS TRIGGER
	LANGUAGE plpgsql
AS $$
BEGIN
    NEW.imie := INITCAP(TRIM(NEW.imie));
    NEW.nazwisko := INITCAP(TRIM(NEW.nazwisko));

    IF (NEW.imie !~* '^[a-z]+$') OR (NEW.nazwisko !~* '^[a-z]+$') THEN
        RAISE EXCEPTION 'Imie i nazwisko nie moga byc puste oraz moga zawierac tylko litery (bez polskich znakow)';
    END IF;

    IF (NEW.pesel !~* '^[0-9]{11}$')  THEN
        RAISE EXCEPTION 'Niepoprawny numer pesel - powinien zawierac dokładnie 11 cyrf';
    END IF;

    RETURN NEW;
END;
$$;


CREATE TRIGGER normalizacja_walidacja_danych_osobowych
BEFORE INSERT OR UPDATE ON dane_osobowe
FOR EACH ROW
EXECUTE PROCEDURE znormalizuj_zwaliduj_dane_osobowe();



--------------------------------------------------
-------------------- INSERTY----------------------
--------------------------------------------------


------------------------------------------------------
---------- Struktora placówek i pracowników  ---------
------------------------------------------------------

-- Przykładowe stanowiska
INSERT INTO stanowisko (nazwa, pensja, opis) VALUES
('stażysta', 2000, 'Status studenta odbywającego staż w laboratorium'),
('młodszy diagnosta', 3800, 'młodszy diagnosta zajmuje się wykonywaniem podstawowych badań pod okiem starszego diagnosty'),
('diagnosta', 48000, 'Samodzielny pracownik laboratorium'),
('starszy diagnosta', 6300, 'Starszy diagnosta jest w pełni samodzielnym pracownikiem, opiekuje się młodszymi diagnostami'),
('kierownik', 9600, 'Najwyższa stopniem osoba w laboratorium'),
('administrator systemu', 18000, 'Zarządza systemem informatycznym laboratorium');


-- Adresy dla laboratoriów diagnostycznych
INSERT INTO adres (miasto, ulica, numer) VALUES
('Katowice', 'Rynek', '11'),
('Gdańsk', 'Brzegowa', '1B'),
('Wrocław', 'Rondo Powstańców', '2'),
('Kraków', 'Floriańska', '2'),
('Warszawa', 'Złota', '48/54'),
('Warszawa', 'Aleje Ujazdowskie', '34A');


-- Stworzenie przykładowych laboratoriów diagnostycznych
INSERT INTO laboratorium_diagnostyczne (adres_id, liczba_aparatow) VALUES
(1, 21),
(2, 9),
(3, 22),
(4, 13),
(5, 33),
(6, 23);


-- Adresy dla punktów pobrań, id od 7
INSERT INTO adres (miasto, ulica, numer) VALUES
('Katowice', 'Nowa', '1'),
('Katowice', 'Stara', '5B'),
('Gdańsk', 'Rondo Powstańców', '2'),
('Wrocław', 'Aleja Nadziei', '1'),
('Wrocław', 'Wyspa', '4'),
('Kraków', 'Targowa', '1'),
('Kraków', 'Mariacka', '3'),
('Warszawa', 'Złota', '48/54'),
('Warszawa', 'Przednia', '42/54A'),
('Warszawa', 'Tylna', '41F'),
('Warszawa', 'Prawa', '1'),
('Warszawa', 'Lewa', '2'),
('Warszawa', 'Dolna', '3'),
('Warszawa', 'Górna', '34A'),
('Warszawa', 'Aleje Ujazdowskie', '78A');


-- Stworzenie punktów pobrań
INSERT INTO punkt_pobran (adres_id, laboratorium_id) VALUES
(7, 1),
(8, 1),
(9, 2),
(10, 3),
(11, 3),
(12, 3),
(13, 4),
(14, 4),
(15, 5),
(16, 5),
(17, 5),
(18, 6),
(19, 6),
(20, 6),
(21, 6);


-- Dane osobowe dla przykładowych pracowników
INSERT INTO dane_osobowe (imie, nazwisko, pesel, data_urodzenia) VALUES
('Adrian', 'Markowicz', '99999999999', '1999-07-17'),
('Marcin', 'Kowalski', '88888888888', '1992-03-21'),
('Anna', 'Nowicka', '77777777777', '1991-08-01'),
('Wlodzimierz', 'Paciorek', '66666666666', '1986-01-11'),
('Beata', 'Romanczyk', '55555555555', '2001-01-10'),
('Konrad', 'Rymek', '44444444444', '1999-12-11');


-- Dodanie pracowników
INSERT INTO pracownik (dane_osobowe_id, stanowisko_id, laboratorium_id, email, haslo)VALUES
(1, 6, 6, 'adrian.markowicz@genelab.com', '$2b$10$btzIVXgBPN382Xtujn/5hOjPYDjSdbZEBv9tGUf3.0fai3/jYP8B2'),
(2, 1, 1, 'marcin.kowalski@genelab.com', '$2b$10$btzIVXgBPN382Xtujn/5hOjPYDjSdbZEBv9tGUf3.0fai3/jYP8B2'),
(3, 2, 2, 'anna.nowicka@genelab.com', '$2b$10$btzIVXgBPN382Xtujn/5hOjPYDjSdbZEBv9tGUf3.0fai3/jYP8B2'),
(4, 3, 3, 'wlodzimierz.paciorek@genelab.com', '$2b$10$btzIVXgBPN382Xtujn/5hOjPYDjSdbZEBv9tGUf3.0fai3/jYP8B2'),
(5, 4, 4, 'beata.romanczyk@genelab.com', '$2b$10$btzIVXgBPN382Xtujn/5hOjPYDjSdbZEBv9tGUf3.0fai3/jYP8B2'),
(6, 5, 5, 'konrad.rymek@genelab.com', '$2b$10$btzIVXgBPN382Xtujn/5hOjPYDjSdbZEBv9tGUf3.0fai3/jYP8B2');



------------------------------------------------------
--------------- TWORZENIE OFERTY BADAŃ  --------------
------------------------------------------------------

-- Dodanie przykładowych kategorii badań
INSERT INTO kategoria_badan (nazwa, opis) VALUES
('Choroby nerek', 'Badanie pomagające w diagnozowaniu oraz zwalczaniu wszelakim chorobom nerek'),
('Choroby nowotworowe', 'Badanie pomagające w diagnozowaniu oraz zwalczaniu nowotworów'),
('Alergologia', 'Badanie wykrywające alergie i uczulenia'),
('Choroby trzustki', 'Badanie pomagające w diagnozowaniu oraz zwalczaniu chorób trzustki'),
('Dla wegetarian', 'Badania, których wykonanie zaleca się wegetarianom ze względu na potencjalne niedobory wybranych substancji'),
('Dla sportowców', 'Badania przeznaczone dla sportowców');


-- Dodanie przykładowych badań
INSERT INTO badanie (nazwa, wartosc_min, wartosc_max, jednostka, cena, material, rodzaj) VALUES
('Albumina', 20, 40, 'uq', 19.99, 'mocz', 'serologia'),
('Cystatyna C', 10, 15, 'ug/dm3', 29.99, 'mocz', 'serologia'),
('Kreatynina', 100, 300, 'mg', 99.99, 'krew', 'hematologia'),
('Mocznik', 34, 37, 'ug', 24.99, 'mocz', 'serologia'),
('Witamina D', 34, 77, 'ug', 59.99, 'krew', 'hematologia'),
('Adrenalina', 120, 140, 'mg/cm3', 34.99, 'krew', 'analityczna'),
('Fosfataza kwaśna', 1, 3, 'mg/cm3', 9.99, 'wymaz', 'mikrobiologia'),
('anty-TG', 30, 39, 'ug', 199.99, 'krew', 'analityczna'),
('Jod, ilościowo', 170, 200, 'mg', 12.99, 'krew', 'koagulologia'),
('Białko całkowite', 23, 29, 'g/kg', 34.99, 'krew', 'immunochemia'),
('Cholesterol HDL', 40, 50, 'ug', 34.99, 'krew', 'hematologia'),
('Cholesterol LDL bezpośrednio', 60, 80, 'ug', 34.99, 'krew', 'hematologia'),
('Panel jelitowy', 10, 100, 'mg', 24.99, 'mocz', 'serologia'),
('Homocysteina', 78, 88, 'mg', 24.99, 'krew', 'hematologia'),
('Witamina B12', 13, 19, 'ug', 34.99, 'krew', 'hematologia');


-- Przypisanie badań do różnych kategorii
INSERT INTO badanie_kategoria (badanie_id, kategoria_id) VALUES
(1, 1),
(1, 4),
(1, 6),
(2, 1),
(2, 2),
(2, 4),
(2, 5),
(3, 1),
(3, 2),
(3, 3),
(3, 6),
(4, 1),
(4, 4),
(4, 5),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(5, 5),
(5, 6),
(6, 2),
(6, 4),
(6, 6),
(7, 2),
(7, 3),
(7, 4),
(8, 2),
(8, 4),
(8, 5),
(8, 6),
(9, 1),
(9, 2),
(9, 5),
(9, 6),
(10, 2),
(10, 3),
(10, 5),
(10, 6),
(11, 1),
(11, 2),
(11, 4),
(11, 5),
(11, 6),
(12, 1),
(12, 2),
(12, 4),
(12, 5),
(13, 1),
(13, 4),
(13, 5),
(14, 1),
(14, 2),
(14, 3),
(14, 4),
(15, 3),
(15, 5),
(15, 6);



------------------------------------------------------
-- DANE PRZYKŁADOWYCH ZAMÓWIEŃ BADAŃ PRZEZ KLIENTÓW --
------------------------------------------------------

-- Dane osobowe klientów
INSERT INTO dane_osobowe (imie, nazwisko, pesel, data_urodzenia) VALUES 
('Joanna', 'Marcinkowska', '00000000000', '1991-01-11'),
('Tomasz', 'Malczyk', '00000000001', '1981-11-21'),
('Michal', 'Marekicz', '00000000002', '1977-01-30'),
('Milena', 'Ostrowska', '00000000004', '1999-03-22'),
('Roman', 'Bosak', '00000000003', '2001-06-06'),
('Adrian', 'Miks', '00000000005', '2002-11-11'),
('Nina', 'Dobrowolska', '00000000006', '1999-12-21'),
('Agata', 'Dymek', '00000000007', '1999-10-13');

-- Zamówienia złożone przez klientów
INSERT INTO zamowienie_badan (dane_osobowe_id, punkt_pobran_id, data, kod_dostepu) VALUES 
(7, 15, '2021-02-10 22:30:18.828000', 'bfdb6897-1e42-4e97-9578-74fe33fea995'),
(8, 1, '2021-02-10 22:32:42.155000', 'e5f56ccd-1a7d-416c-8a3e-58ab3f3bd412'),
(9, 3, '2021-02-10 22:34:07.394000', 'bc7d4966-2e60-4cfa-9fbc-4d6f5097c90b'),
(10, 5, '2021-02-10 22:35:35.472000', '85e8f7cf-77e9-4e88-ba9f-af39ef0ad181'),
(11, 6, '2021-02-10 22:37:09.915000', 'fb064ad6-396b-4483-bce8-4eb9adf718ab'),
(12, 11, '2021-02-10 22:39:33.004000', '49ac891b-06a8-4d17-bef0-8475061bb5e8'),
(13, 11, '2021-02-10 22:40:55.234000', '8d7d5323-6cd4-431f-ac83-fb8877021065'),
(14, 11, '2021-02-10 22:42:29.586000', '67965d93-aed7-445a-8f53-e84de07a2beb');

-- Zlecenia badąń utworzone w procesie zkłądanai zamówień
INSERT INTO zlecenie_badania (zamowienie_id, laboratorium_id, badanie_id, status, koszt)VALUES 
(1, 6, 1, 'oczekujace', 19.99),
(1, 6, 11, 'oczekujace', 34.99),
(1, 6, 12, 'oczekujace', 34.99),
(1, 6, 2, 'oczekujace', 29.99),
(1, 6, 14, 'oczekujace', 24.99),
(1, 6, 9, 'oczekujace', 12.99),
(1, 6, 3, 'oczekujace', 99.99),
(1, 6, 4, 'oczekujace', 24.99),
(1, 6, 13, 'oczekujace', 24.99),
(2, 1, 8, 'oczekujace', 199.99),
(2, 1, 10, 'oczekujace', 34.99),
(2, 1, 9, 'oczekujace', 12.99),
(2, 1, 3, 'oczekujace', 99.99),
(3, 2, 10, 'oczekujace', 34.99),
(3, 2, 8, 'oczekujace', 199.99),
(3, 2, 11, 'oczekujace', 34.99),
(4, 3, 15, 'oczekujace', 34.99),
(4, 3, 5, 'oczekujace', 59.99),
(4, 3, 13, 'oczekujace', 24.99),
(4, 3, 4, 'oczekujace', 24.99),
(4, 3, 8, 'oczekujace', 199.99),
(4, 3, 10, 'oczekujace', 34.99),
(5, 3, 8, 'oczekujace', 199.99),
(5, 3, 3, 'oczekujace', 99.99),
(5, 3, 5, 'oczekujace', 59.99),
(6, 5, 1, 'oczekujace', 19.99),
(6, 5, 11, 'oczekujace', 34.99),
(6, 5, 12, 'oczekujace', 34.99),
(6, 5, 2, 'oczekujace', 29.99),
(6, 5, 14, 'oczekujace', 24.99),
(6, 5, 9, 'oczekujace', 12.99),
(6, 5, 3, 'oczekujace', 99.99),
(6, 5, 4, 'oczekujace', 24.99),
(6, 5, 13, 'oczekujace', 24.99),
(7, 5, 6, 'oczekujace', 34.99),
(7, 5, 1, 'oczekujace', 19.99),
(7, 5, 8, 'oczekujace', 199.99),
(7, 5, 10, 'oczekujace', 34.99),
(7, 5, 11, 'oczekujace', 34.99),
(7, 5, 9, 'oczekujace', 12.99),
(7, 5, 3, 'oczekujace', 99.99),
(7, 5, 15, 'oczekujace', 34.99),
(7, 5, 5, 'oczekujace', 59.99),
(8, 5, 10, 'oczekujace', 34.99),
(8, 5, 7, 'oczekujace', 9.99),
(8, 5, 14, 'oczekujace', 24.99),
(8, 5, 3, 'oczekujace', 99.99),
(8, 5, 15, 'oczekujace', 34.99),
(8, 5, 5, 'oczekujace', 59.99);


-- Wyniki badań wprowadzone przez pracowników
INSERT INTO wynik_badania (data, wartosc, zlecenie_badania_id, pracownik_id) VALUES 
('2021-02-10 22:30:37.355000', 30, 1, 1),
('2021-02-10 22:30:40.584000', 45, 2, 1),
('2021-02-10 22:30:44.733000', 81, 3, 1),
('2021-02-10 22:30:47.252000', 12, 4, 1),
('2021-02-10 22:30:50.172000', 79, 5, 1),
('2021-02-10 22:30:53.532000', 211, 6, 1),
('2021-02-10 22:30:56.192000', 87, 7, 1),
('2021-02-10 22:30:59.104000', 35, 8, 1),
('2021-02-10 22:31:02.075000', 34, 9, 1),
('2021-02-10 22:32:56.469000', 31, 10, 2),
('2021-02-10 22:32:59.749000', 26, 11, 2),
('2021-02-10 22:33:02.564000', 178, 12, 2),
('2021-02-10 22:33:05.042000', 99, 13, 2),
('2021-02-10 22:34:15.201000', 21, 14, 3),
('2021-02-10 22:34:24.483000', 33, 15, 3),
('2021-02-10 22:34:28.884000', 45, 16, 3),
('2021-02-10 22:35:42.615000', 16, 18, 4),
('2021-02-10 22:35:45.355000', 78, 17, 4),
('2021-02-10 22:35:47.361000', 12, 19, 4),
('2021-02-10 22:35:50.050000', 45, 20, 4),
('2021-02-10 22:35:52.153000', 11, 21, 4),
('2021-02-10 22:35:54.732000', 31, 22, 4),
('2021-02-10 22:38:20.185000', 34, 23, 4),
('2021-02-10 22:38:23.339000', 121, 24, 4),
('2021-02-10 22:38:26.195000', 35, 25, 4),
('2021-02-10 22:39:39.640000', 12, 26, 6),
('2021-02-10 22:39:41.701000', 44, 27, 6),
('2021-02-10 22:39:44.256000', 66, 28, 6),
('2021-02-10 22:39:46.188000', 12, 29, 6),
('2021-02-10 22:39:48.900000', 77, 30, 6),
('2021-02-10 22:39:52.921000', 195, 31, 6),
('2021-02-10 22:39:55.760000', 175, 32, 6),
('2021-02-10 22:39:58.461000', 31, 33, 6),
('2021-02-10 22:40:00.393000', 12, 34, 6),
('2021-02-10 22:41:02.197000', 121, 35, 6),
('2021-02-10 22:41:04.557000', 43, 36, 6),
('2021-02-10 22:41:06.610000', 33, 37, 6),
('2021-02-10 22:41:08.908000', 24, 38, 6),
('2021-02-10 22:41:11.094000', 43, 39, 6),
('2021-02-10 22:41:13.509000', 187, 40, 6),
('2021-02-10 22:41:16.933000', 343, 41, 6),
('2021-02-10 22:41:19.193000', 65, 42, 6),
('2021-02-10 22:41:21.441000', 31, 43, 6);

INSERT INTO platnosc (zamowienie_id, rodzaj, data, kwota, zrealizowana)VALUES 
(1, 'przelew', '2021-02-10 22:30:18.824315', 307.91, true),
(2, 'przelew', '2021-02-10 22:32:42.151701', 347.96, true),
(3, 'przelew', '2021-02-10 22:34:07.390765', 269.97, true),
(4, 'przelew', '2021-02-10 22:35:35.468731', 379.94, true),
(5, 'przelew', '2021-02-10 22:37:09.911792', 359.97, true),
(6, 'przelew', '2021-02-10 22:39:33.000680', 307.91, true),
(7, 'przelew', '2021-02-10 22:40:55.230648', 532.91, true),
(8, 'przelew', '2021-02-10 22:42:29.582476', 264.94, true);