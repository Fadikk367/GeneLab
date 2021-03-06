const dictionary = {
  id: 'id',
  nazwa: 'name',
  cena: 'price',
  jednostka: 'unit',
  wartosc_min: 'minValue',
  wartosc_max: 'maxValue',
  kategoria_id: 'categoryId',
  material_id: 'materialId',
  material: 'material',
  pracownia_id: 'laboratoryId',
  imie: 'firstName',
  nazwisko: 'lastName',
  data_urodzenia: 'birthDate',
  opis: 'description',
  dane_osobowe_id: 'personalDataId',
  stanowisko_id: 'positionId',
  stanowisko: 'position',
  email: 'email',
  haslo: 'password',
  data_zatrudnienia: 'employmentDate',
  premia: 'bonus',
  pensja: 'salary',
  data: 'date',
  wartosc: 'value',
  zlecenie_badania_id: 'examinationOrderId',
  pracownik_id: 'employeeId',
  kod_dostepu: 'accessCode',
  zamowienie_id: 'orderId',
  badanie_id: 'examinationId',
  status: 'status',
  koszt: 'price',
  rodzaj: 'type',
  miasto: 'city',
  ulica: 'street',
  numer: 'number',
  adres: 'address',
  liczba_aparatow: 'numberOfDevices',
  laboratorium_id: 'laboratoryId',
  kategoria_id: 'categoryId',
  kod_dostepu: 'accessCode',
  kwota: 'amount',
  wykonane_badania: 'doneExaminations',
  liczba_pracownikow: 'employeesCount',
  liczba_punktow: 'pointsCount',
  suma_zlecen: 'examinationOrdersCount',
  przychod: 'income',
}

export const translateResultRow = result => {
  const translated = {};

  for (const key in result) {
    const translatedKey = dictionary[key] || key;
    translated[translatedKey] = result[key];
  }

  return translated;
}

export const translateResultRows = rows => {
  const translatedRows = [];

  for (const row of rows) {
    translatedRows.push(translateResultRow(row))
  }

  return translatedRows;
}