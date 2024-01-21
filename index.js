// import { getRandom } from "./funcs";

// class Dop {
//   constructor(dopName, dopTime, dopPrice) {
//     this.name = dopName;
//     this.time = dopTime;
//     this.price = dopPrice;
//   }
//   getNameDop() {
//     return this.name;
//   }
//   getTimeDop() {
//     return this.time;
//   }
//   getPriceDop() {
//     return this.price;
//   }
// }
// class Drink {
//   constructor(drinkName, drinkTime, drinkPrice) {
//     this.name = drinkName;
//     this.time = drinkTime;
//     this.price = drinkPrice;
//   }
//   getNameDrink() {
//     return this.name;
//   }
//   getTimeDrink() {
//     return this.time;
//   }
//   getPriceDrink() {
//     return this.price;
//   }
// }

const dop = [
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
const drink = [
  { name: "кофе Эспрессо", time: 10, price: 150 },
  { name: "чай черный", time: 5, price: 100 },
  { name: "какао", time: 15, price: 120 },
  { name: "кофе Американо", time: 7, price: 80 },
  { name: "кофе Лате", time: 8, price: 90 },
  { name: "горячий шоколад", time: 20, price: 200 },
  { name: "чай зеленый", time: 11, price: 130 },
];

// 840 минут рабочий день
class Cafe {
  constructor() {
    this.people = 0;
    this.month = 1;
    this.cash = 0;
    this.drinks = [];
    this.dops = [];
    this.statistic = [];
  }
  setMonth(month) {
    this.month = month;
  }
  getMonthName() {
    return new Date(2023, this.month, 0).toLocaleString("ru-RU", {
      month: "long",
    });
  }
  getColPeople() {}
  getMonthCash() {}
}

const c = new Cafe(1);
console.log(c.getMonthName());
// var rand = Math.random();
// if (rand < 0.3) {
//   console.log("30% chance");
// }
// if (rand < 0.2) {
//   console.log("20% chance");
// }
