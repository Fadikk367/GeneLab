-- W momencie dodania wyniku do badania funkcja automatycznie ustawia status odpowiadającego zlecenia na 'zrealizowane'
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


-- Przy próbie ponownego dodania wyniku do już zrealiwowanego badania zwracany jest błąd a operacja zostaje powstrzymana
-- sytuacja potencjalnie możliwe w przypadku nieodpowiedniej organizacji pracy proacownikó w laboratorium (dwoje diagnostów 
-- jednocześnie wykonuje zlecone badanie)
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