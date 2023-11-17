/*
Задача на классы и наследование: создайте базовый класс Shape (фигура), который имеет методы для расчета площади и периметра. 
Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник. 
Реализуйте методы расчета площади и периметра для каждой фигуры.
*/

// Базовый класс Shape
class Shape {
  // Метод для расчета площади, который выбросит ошибку, если его не переопределить в подклассе
  getArea() {
    throw new Error("Метод getArea() должен быть реализован");
  }

  // Метод для расчета периметра, который также выбросит ошибку, если его не переопределить
  getPerimeter() {
    throw new Error("Метод getPerimeter() должен быть реализован");
  }
}

// Подкласс, наследует методы от базового класса Shape
class Rectangle extends Shape {
  constructor(width, height) {
    super(); // Вызывает конструктор базового класса Shape
    this.width = width; // Устанавливает ширину прямоугольника
    this.height = height; // Устанавливает высоту прямоугольника
  }

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  getArea() {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }
}

class Triangle extends Shape {
  constructor(side1, side2, side3) {
    super();
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
  }

  getArea() {
    // Вычисление полупериметра треугольника
    const s = this.getPerimeter() / 2;
    // Формула Герона для расчета площади треугольника
    return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
  }

  getPerimeter() {
    return this.side1 + this.side2 + this.side3;
  }
}

const rectangle = new Rectangle(10, 5);
console.log(rectangle.getArea() === 50);
console.log(rectangle.getPerimeter() === 30);

const circle = new Circle(7);
console.log(circle.getArea().toFixed(2) === "153.94");
console.log(circle.getPerimeter().toFixed(2) === "43.98");

const triangle = new Triangle(10, 5, 7);
console.log(triangle.getArea().toFixed(2) === "16.25");
console.log(triangle.getPerimeter() === 22);
