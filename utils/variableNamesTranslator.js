const result = {
  jednostka: 'mg',
  wartosc_min: 100,
  wartosc_max: 140,
}


const dictionary = {
  id: 'id',
  nazwa: 'name',
  cena: 'price',
  jednostka: 'unit',
  wartosc_min: 'minValue',
  wartosc_max: 'maxValue',
  kategoria_id: 'categoryId',
  material_id: 'materialId',
  pracownia_id: 'laboratoryId',
  imie: 'firstName',
  nazwisko: 'lastName',
  data_urodzenia: 'birthDate',
  opis: 'description',
  dane_osobowe_id: 'personalDataId',
  stanowisko_id: 'positionId',
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
}

const translate = result => {
  const translated = {};

  for (const key in result) {
    const translatedKey = dictionary[key];
    translated[translatedKey] = result[key];
  }

  return translated;
}





const tr = translate(result);

console.log(tr);