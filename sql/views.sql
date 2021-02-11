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