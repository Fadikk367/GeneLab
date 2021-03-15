# GeneLab

### NOTE
> This project has been written as a final project for university Databases 1 course, therefore both app UI and database structure are in Polish langauge as it was one of the mandatory requirements provided by our lecturer. To be consistient with it further README part will also be in Polish.

Aplikacje webowa będąca jednocześnie sklepem online laboratorium diagnostycznego, panelem zarządzania siecią laboratoriów i miejscem "pracy" pracowników, którzy w odpowiednim panelu mogą wprowadzać wyniki zleconych badań.

### Demo aplikacji dostepne [TUTAJ](https://fadikk367.github.io/GeneLab/#/) *
***UWAGA**
> Backend aplikacji hostowany jest w ramach darmowej oferty Heroku więc potrzebuje on chwili na obudzenie się - zaleca się poczekać aż pojawi się lista kategorii z zakładce "Oferta badań" i po tym zacząć korzystać z aplikacji).


## Interfejs użytkownika
### Strona główna
![Strona główna aplikacji](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/home.png)

### Oferta badań
![Strona główna aplikacji](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/offer.png)

Klienci mogą wybierać badania z dostępnych kategorii i dodawać je do koszyka za pomocą przycisku wózka zakupowego z pluskiem. Jeśli przycisk jest wyszarzony i nie można na niego kliknąć, oznacza to, że to badanie już znajduje się w koszyku.

### Koszyk, składanie zamówienia
![Strona główna aplikacji](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/cart.png)

W zakładce koszyka można usunąć niechciane badania a następnie przejść przez formularz składania zamówienia, w którym do wypełnienia będą dane osobowe, punkt pobrań oraz metoda płatności.

![Strona główna aplikacji](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/order_summary.png)

Na koniec zobaczyć można podsumowanie zakupów.

### Przegląd wyników online
![Profile użytkownika](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/results.png)

Jeśli nasze badania zostały już wykonane (pracownicy laboratorium, pod które podlega wybrany przez nas punkt pobrań wprowadzili ich rezultaty), możemy zobaczyć ich wyniki wprowadzając kod dostępu, który wyświetlony zostanie po złożeniu zamówienia.

Poniżej znajduje się kod dostępu do przykładowych - już wykonanych badań.
KOD:	*8d7d5323-6cd4-431f-ac83-fb8877021065*

### Panel logowania dla pracowników/administratorów
![Profile użytkownika](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/login.png)

Przykładowe dane logowania dla wybranego pracownika:

> email: konrad.rymek@genelab.com
hasło: password

Pracownicy dodawani są przez administratora w odpowiedniej zakładce panelu administracyjnego co jest równoznaczne ze stworzeniem konta pracownika.

### Panel administracyjny
![Profile użytkownika](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/administration.png)

Z poziomu panelu administracyjnego możliwe jest zarządzanie widocznymi wyżej zasobami - ich dodawania, usuwanie, i w niektórych przypadkach modyfikowanie (premie dla pracowników).

![Profile użytkownika](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/admin_panel.png)

Każdy panel składa się z formularza służącego dodawaniu nowych zasobów oraz listy pokazującej zasoby już istniejące.
Na powyższym zdjęciu widoczny jest panel pracowników - tworząc nowego pracownika wybieramy w którym z dostępnych laboratoriów będzie on pracował oraz jakie stanowisko będzie piastował. Pracownik przypisany do danego laboratorium będzie widział a wiec i mógł wprowadzać wyniki badań zleconych tylko do tego konkretnego laboratorium - czyli te zamówione w punktach pobrań podlegających pod dane laboratorium.

### Przegląd raportów i statystyk
![Profile użytkownika](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/reports.png)

Raporty stanowią podsumowania finansowe lub wydajnościowe danych laboratoriów czy pracowników.

## Stack technologiczny

* Frontend - React

* Backend - Express

* Baza danych - PostgreSQL

### Wybrane użyte biblioteki
* react-hook-form - obsługa formularzy z walidacją po stronie klienta,

* material-ui - biblioteka gotowych komponentów Reactowych

* styled-components

* react-router-dom.

### Hosting
Serwerowa część aplikacji umieszczona została na platformie Heroku w ramach darmowego limitu (stąd występujące opóźnienia przy wybudzaniu aplikacji). Na tej samej platformie stworzona została baza danych PostgreSQL. Frontend aplikacji serwowany jest przez usługę github pages.


## Źródła

*  [Dokumentacja MDN](https://developer.mozilla.org/pl/)
*  [Dokumentacja React](https://reactjs.org/docs/getting-started.html)
*  [Dokumentacja PostgreSQL](https://www.postgresql.org/)

### Grafiki
* [Tło strony głównej](https://www.cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg)
* [Zdjęcie profilowe pracownika](https://www.clipartmax.com/middle/m2H7Z5H7A0A0K9b1_about-brent-kovacs-user-profile-placeholder/)