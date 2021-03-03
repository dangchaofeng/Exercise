/*
 * @Author: Adam Dang
 * @Description: 类
 * @Date: 2021-02-23 17:56:24
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-02-23 17:56:24
 */

(() => {
    // ? 类， greeting 公共成员属性， greet 公共成员方法， 属于原型中的方法
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return 'Hello, ' + this.greeting;
        }
    }

    let greeter = new Greeter('world');

    // ? 继承
    class Animal {
        move(distanceInMeters: number = 0) {
            console.log(`Animal moved ${distanceInMeters}m.`);
        }
    }

    class Dog extends Animal {
        bark() {
            console.log('Woof! Woof!');
        }
    }

    const dog = new Dog();
    dog.bark();
    dog.move(10);
    dog.bark();

    // ? 公共， 私有与受保护的修饰符， 默认都是public
    // ? private
    class Student {
        private name: string;
        constructor(theName: string) {
            this.name = theName;
        }
    }

    // new Student('ming').name; // 错误: 'name' 是私有的.

    // ? protected， protected成员在【派生类】中仍然可以访问， 不是【子类的实例】
    class Person {
        protected name: string;
        constructor(name: string) {
            this.name = name;
        }
    }

    class Employee extends Person {
        private department: string;

        constructor(name: string, department: string) {
            super(name);
            this.department = department;
        }

        public getElevatorPitch() {
            return `Hello, my name is ${this.name} and I work in ${this.department}.`;
        }
    }

    let howard = new Employee('Howard', 'Sales');
    console.log(howard.getElevatorPitch());
    // console.log(howard.name); // 错误

    // * 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承
    (() => {
        class Person {
            protected name: string;
            protected constructor(theName: string) {
                this.name = theName;
            }
        }

        // Employee 能够继承 Person
        class Employee extends Person {
            private department: string;

            constructor(name: string, department: string) {
                super(name);
                this.department = department;
            }

            public getElevatorPitch() {
                return `Hello, my name is ${this.name} and I work in ${this.department}.`;
            }
        }

        let howard = new Employee('Howard', 'Sales');
        // let john = new Person('John'); // 错误: 'Person' 的构造函数是被保护的.
    })();

    // ? readonly修饰符
    // 你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
    class Octopus {
        readonly name: string;
        readonly numberOfLegs: number = 8;
        constructor(theName: string) {
            this.name = theName;
        }
    }
    let dad = new Octopus('Man with the 8 strong legs');
    // dad.name = 'Man with the 3-piece suit'; // 错误! name 是只读的.

    // ? 参数属性
    // 在上面的例子中，我们必须在Octopus类里定义一个只读成员 name和一个参数为 theName的构造函数，并且立刻将 theName的值赋给 name，
    // 这种情况经常会遇到。 参数属性可以方便地让我们在一个地方定义并初始化一个成员。 下面的例子是对之前 Octopus类的修改版，使用了参数属性：
    class Octopus1 {
        readonly numberOfLegs: number = 8;
        constructor(readonly name: string) {}
    }

    // ? 存取器， 使用get 、 set 修饰符 对函数进行修饰
    let passcode = 'secret passcode';

    class Employee1 {
        private _fullName: string;

        get fullName(): string {
            return this._fullName;
        }

        set fullName(newName: string) {
            if (passcode && passcode == 'secret passcode') {
                this._fullName = newName;
            } else {
                console.log('Error: Unauthorized update of employee!');
            }
        }
    }

    let employee = new Employee1();
    employee.fullName = 'Bob Smith';
    if (employee.fullName) {
        console.log(employee.fullName);
    }

    // ? 静态属性， 想要访问这个属性的时候，都要在 origin前面加上类名 【Grid.origin】
    class Grid {
        static origin = { x: 0, y: 0 };
        calculateDistanceFromOrigin(point: { x: number; y: number }) {
            let xDist = point.x - Grid.origin.x;
            let yDist = point.y - Grid.origin.y;
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        }
        constructor(public scale: number) {}
    }

    let grid1 = new Grid(1.0); // 1x scale
    let grid2 = new Grid(5.0); // 5x scale

    console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
    console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));

    console.log(Grid.origin);

    // ? 抽象类
    // 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。
    // 不同于接口，抽象类可以包含成员的实现细节。
    // abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
    abstract class Animal1 {
        abstract makeSound(): void;
        move(): void {
            console.log('roaming the earch...');
        }
    }

    //
    abstract class Department {
        constructor(public name: string) {}

        printName(): void {
            console.log('Department name: ' + this.name);
        }

        abstract printMeeting(): void; // 必须在派生类中实现
    }

    class AccountingDepartment extends Department {
        constructor() {
            super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
        }

        printMeeting(): void {
            console.log('The Accounting Department meets each Monday at 10am.');
        }

        generateReports(): void {
            console.log('Generating accounting reports...');
        }
    }

    let department: Department; // 允许创建一个对抽象类型的引用
    // department = new Department(); // 错误: 不能创建一个抽象类的实例
    department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
    department.printName();
    department.printMeeting();
    // department.generateReports(); // 错误: 方法在声明的抽象类中不存在

    // ? 把类当做接口使用 【接口 继承 类】

    class Point {
        x: number;
        y: number;
    }

    interface Point3d extends Point {
        z: number;
    }

    let point3d: Point3d = { x: 1, y: 2, z: 3 };
})();
