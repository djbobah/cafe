const dops = [
  { name: "булочка с сахаром", time: 10, price: 100 },
  { name: "сливки", time: 10, price: 50 },
  { name: "пирожное Картошка", time: 10, price: 100 },
  { name: "Торт", time: 10, price: 300 },
  { name: "пирожное Корзинка", time: 10, price: 150 },
  { name: "круассан", time: 10, price: 80 },
  { name: "булочка с корицей", time: 10, price: 90 },
  { name: "венская булочка", time: 10, price: 70 },
  { name: "шарлотка", time: 10, price: 110 },
  { name: "кекс", time: 10, price: 50 },
];
const drinks = [
  { name: "кофе Эспрессо", time: 10, price: 150 },
  { name: "чай черный", time: 5, price: 100 },
  { name: "какао", time: 15, price: 120 },
  { name: "кофе Американо", time: 7, price: 80 },
  { name: "кофе Лате", time: 8, price: 90 },
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

// cafe.getYearStatistic();
console.log(cafe.getStatistic());
