const dops = [
  { name: "булочка с сахаром", time: 10, price: 100 },
  { name: "сливки", time: 10, price: 50 },
  { name: 'пирожное "Картошка"', time: 10, price: 100 },
  { name: 'торт "Наполеон"', time: 10, price: 300 },
  { name: 'пирожное "Корзинка"', time: 10, price: 150 },
  { name: "круассан", time: 10, price: 80 },
  { name: "булочка с корицей", time: 10, price: 90 },
  { name: "венская булочка", time: 10, price: 70 },
  { name: "шарлотка", time: 10, price: 110 },
  { name: "кекс", time: 10, price: 50 },
];
const drinks = [
  { name: 'кофе "Эспрессо"', time: 10, price: 150 },
  { name: "чай черный", time: 5, price: 100 },
  { name: "какао", time: 15, price: 120 },
  { name: 'кофе "Американо"', time: 7, price: 80 },
  { name: 'кофе "Лате"', time: 8, price: 90 },
  { name: "горячий шоколад", time: 20, price: 200 },
  { name: "чай зеленый", time: 11, price: 130 },
];

// 840 минут рабочий день (отнимаем самое большее время приготовления напитка чтоб максимально снизить вероятность переработки)
const timeWorkDay = (22 - 8) * 60 - 20;
// пусть год у нас будет 2023
const year = 2023;

class Cafe {
  constructor() {
    this.people = 0;
    this.month = 1;
    this.year = year;
    this.cash = 0;
    this.drinks = [];
    this.dops = [];
    this.statistic = [];
  }
  setMonth(month) {
    this.month = month;
  }
  getMonthName() {
    return new Date(this.year, this.month, 0).toLocaleString("ru-RU", {
      month: "long",
    });
  }
  getCountDrinks() {
    let count = 1;
    for (let i = 0; i < 2; i++) {
      if (chance() < 0.3) {
        count++;
      }
    }
    return count;
  }

  getDopsChance() {
    return chance() < 0.2;
  }
  //формируем стстистику за день
  getDayStatistic(people = getRandom(100, 20)) {
    let timeOrders = 0;
    let countPeople = 0;
    for (let i = 1; i <= people; i++) {
      let countDrinks = this.getCountDrinks();
      for (let i = 0; i < countDrinks; i++) {
        if (timeOrders < timeWorkDay) {
          let drink = drinks[getRandom(7, 0)];
          this.drinks.push(drink);
          timeOrders += drink.time;
          if (this.getDopsChance()) {
            if (timeOrders < timeWorkDay) {
              const dop = dops[getRandom(10, 0)];
              this.dops.push(dop);
              timeOrders += dop.time;
            } else {
              this.people += countPeople; // + " " + timeOrders;
              return;
            }
          }
        } else {
          this.people += countPeople;
          return;
        }
      }
      countPeople++;
    }
    this.people += countPeople;
  }
  //формируем стстистику за месяц
  getMonthStatistic() {
    for (let i = 0; i < getWorkingDays(this.month, this.year); i++) {
      this.getDayStatistic();
    }

    const drinks = this.drinks.reduce((acc, drink) => {
      acc[drink.name] = (acc[drink.name] || 0) + 1;
      return acc;
    }, {});
    const drinksCost = this.drinks.reduce((acc, drink) => {
      acc = acc + drink.price;
      return acc;
    }, 0);
    const dops = this.dops.reduce((acc, dop) => {
      acc[dop.name] = (acc[dop.name] || 0) + 1;
      return acc;
    }, {});
    const dopsCost = this.dops.reduce((acc, dop) => {
      acc = acc + dop.price;
      return acc;
    }, 0);
    this.statistic.push({
      month: this.getMonthName(),
      people: this.people,
      drinks: drinks,
      dops: dops,
      cash: drinksCost + dopsCost,
    });

    this.people = 0;
    this.year = year;
    this.cash = 0;
    this.drinks = [];
    this.dops = [];
  }
  //формируем стстистику за год
  getYearStatistic() {
    for (let i = 1; i < 13; i++) {
      this.setMonth(i);
      this.getMonthStatistic();
    }
  }

  getStatistic() {
    this.getYearStatistic();
    return this.statistic;
  }
}

const cafe = new Cafe();

const statistic = cafe.getStatistic();
console.log(statistic);

//отрисовка информации в HTML
const cafeHTML = document.getElementById("root");

const h2 = document.createElement("h1");
h2.innerText = "Статистика работы кафе за " + year + " г.";
h2.style.display = "flex";
h2.style.justifyContent = "center";

cafeHTML.append(h2);
cafeHTML.append(document.createElement("hr"));

statistic.map((item) => {
  const month = document.createElement("div");
  month.innerText = item.month.toUpperCase();
  month.style.display = "flex";
  month.style.justifyContent = "center";
  month.style.fontSize = "24px";

  cafeHTML.append(month);

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "space-around";

  //вывод секции напитки
  const drinks = document.createElement("div");
  const drinksList = document.createElement("table");
  const drinksHead = document.createElement("tr");
  const drinkHeadTd = document.createElement("td");
  drinkHeadTd.colSpan = 2;
  drinkHeadTd.style.textAlign = "center";
  drinkHeadTd.style.textDecoration = "underline";
  drinkHeadTd.style.fontWeight = "700";

  drinkHeadTd.innerHTML = "Напитки:";

  drinksHead.append(drinkHeadTd);
  drinksList.append(drinksHead);
  Object.keys(item.drinks).map((drink) => {
    const drinksListItem = document.createElement("tr");
    const drinkName = document.createElement("td");
    drinkName.innerText = drink;
    drinksListItem.append(drinkName);
    const drinkCol = document.createElement("td");
    drinkCol.innerText = item.drinks[drink] + " шт";
    drinksListItem.append(drinkCol);
    drinksList.append(drinksListItem);
  });
  drinks.append(drinksList);
  wrapper.append(drinks);
  const dops = document.createElement("div");

  //вывод секции дополнительно
  const dopsList = document.createElement("table");
  const dopsHead = document.createElement("tr");
  const dopHeadTd = document.createElement("td");
  dopHeadTd.colSpan = 2;
  dopHeadTd.style.textAlign = "center";
  dopHeadTd.style.textDecoration = "underline";
  dopHeadTd.style.fontWeight = "700";
  dopHeadTd.innerHTML = "Дополнительно:";
  dopsHead.append(dopHeadTd);
  dopsList.append(dopsHead);
  Object.keys(item.dops).map((dop) => {
    const dopsListItem = document.createElement("tr");
    const dopName = document.createElement("td");
    dopName.innerText = dop;
    dopsListItem.append(dopName);
    const dopCol = document.createElement("td");
    dopCol.innerText = item.dops[dop] + " шт";
    dopsListItem.append(dopCol);
    dopsList.append(dopsListItem);
  });
  dops.append(dopsList);

  wrapper.append(dops);

  cafeHTML.append(wrapper);
  cafeHTML.append(document.createElement("hr"));
  const wrapper2 = document.createElement("div");
  wrapper2.style.display = "flex";
  wrapper2.style.justifyContent = "space-evenly";

  const people = document.createElement("div");
  people.innerHTML = `Количество поесетителей за месяц: ${item.people} ч.`;
  wrapper2.append(people);
  const cash = document.createElement("div");
  cash.innerHTML = `Выручка за месяц: ${item.cash} р.`;
  wrapper2.append(cash);

  cafeHTML.append(wrapper2);

  cafeHTML.append(document.createElement("hr"));
});

// считаем общую выручку за год
const totalCash = statistic.reduce((acc, item) => {
  acc += item.cash;
  return acc;
}, 0);

const total = document.createElement("div");
total.style.display = "flex";
total.style.marginTop = "20px";
total.style.fontWeight = "700";
total.style.fontSize = "24px";

total.style.justifyContent = "center";

total.innerHTML = `Общий доход кафе за ${year} год: ${totalCash} р.`;
cafeHTML.append(total);
