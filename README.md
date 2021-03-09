# GeneLab

### NOTE
> This project has been written as a final project for university Databases 1 course, therefore both app UI and database structure are in Polish langauge as it was one of the mandatory requirements provided by our lecturer. To be consistient with it further README part will also be in Polish.

Aplikacje webowa będąca jednocześnie sklepem online laboratorium diagnostycznego, panelem zarządzania siecią laboratoriów i miejscem "pracy" pracowników, którzy w odpowiednim panelu mogą wprowadzać wyniki zleconych badań.

## Interfejs użytkownika
### Strona główna
![Strona główna aplikacji](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/home.png)

### Oferta badań
![Strona główna aplikacji](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/offer.png)

### Koszyk, składanie zamówienia
![Strona główna aplikacji](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/cart.png)

![Strona główna aplikacji](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/order_summary.png)

### Przegląd wyników online
![Profile użytkownika](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/results.png)

### Panel logowania dla pracowników/administratorów
![Profile użytkownika](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/login.png)

### Panel administracyjny
![Profile użytkownika](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/administration.png)

![Profile użytkownika](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/admin_panel.png)

### Przegląd raportów i statystyk
![Profile użytkownika](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/genelab/reports.png)





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