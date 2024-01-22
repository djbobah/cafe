const dops = [
  { name: "лед", time: 10, price: 100 },
  { name: "сливки", time: 10, price: 100 },
  { name: "пирожное", time: 10, price: 100 },
  { name: "торт", time: 10, price: 100 },
  { name: "пирожное Корзинка", time: 10, price: 100 },
  { name: "круассан", time: 10, price: 100 },
  { name: "булочка с корицей", time: 10, price: 100 },
  { name: "венская булочка", time: 10, price: 100 },
  { name: "шарлотка", time: 10, price: 100 },
  { name: "кекс", time: 10, price: 100 },
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
    // console.log("year ", this.year);
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
    // console.log(people);
    for (let i = 1; i <= people; i++) {
      let countDrinks = this.getCountDrinks();
      for (let i = 0; i < countDrinks; i++) {
        if (timeOrders < timeWorkDay) {
          let drink = drinks[getRandom(7, 1)];
          this.drinks.push(drink);
          timeOrders += drink.time;
          if (this.getDopsChance()) {
            if (timeOrders < timeWorkDay) {
              const dop = dops[getRandom(10, 1)];
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
      // console.log(i);
      this.getDayStatistic();
    }

    const drinks = this.drinks.reduce((acc, drink) => {
      acc[drink.name] = (acc[drink.name] || 0) + 1;
      return acc;
    }, 0);
    // return getWorkingDays(this.month, this.year);
    this.statistic.push({
      month: this.getMonthName(),
      people: this.people,
      drinks: drinks,
      dops: this.dops,
    });
  }

  getStatistic() {
    return this.statistic;
  }

  getMonthCash() {}
}

const c = new Cafe();
console.log(c.getMonthName());
// console.log(chance());
// console.log(c.getCountDrinks());
// console.log(c.getDopsChance());
// c.getDayStatistic();

c.getMonthStatistic();
console.log(c.getStatistic());
// console.log(c.getDops());
// console.log(c.getDrinks());

// var rand = Math.random();
// if (rand < 0.3) {
//   console.log("30% chance");
// }
// if (rand < 0.2) {
//   console.log("20% chance");
// }
