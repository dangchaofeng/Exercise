/*
 * @Author: Adam Dang
 * @Description: 类
 * @Date: 2021-02-23 17:56:24
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-02-23 17:56:24
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function () {
    // ? 类， greeting 公共成员属性， greet 公共成员方法， 属于原型中的方法
    var Greeter = /** @class */ (function () {
        function Greeter(message) {
            this.greeting = message;
        }
        Greeter.prototype.greet = function () {
            return 'Hello, ' + this.greeting;
        };
        return Greeter;
    }());
    var greeter = new Greeter('world');
    // ? 继承
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.move = function (distanceInMeters) {
            if (distanceInMeters === void 0) { distanceInMeters = 0; }
            console.log("Animal moved " + distanceInMeters + "m.");
        };
        return Animal;
    }());
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Dog.prototype.bark = function () {
            console.log('Woof! Woof!');
        };
        return Dog;
    }(Animal));
    var dog = new Dog();
    dog.bark();
    dog.move(10);
    dog.bark();
    // ? 公共， 私有与受保护的修饰符， 默认都是public
    // ? private
    var Student = /** @class */ (function () {
        function Student(theName) {
            this.name = theName;
        }
        return Student;
    }());
    // new Student('ming').name; // 错误: 'name' 是私有的.
    // ? protected， protected成员在【派生类】中仍然可以访问， 不是【子类的实例】
    var Person = /** @class */ (function () {
        function Person(name) {
            this.name = name;
        }
        return Person;
    }());
    var Employee = /** @class */ (function (_super) {
        __extends(Employee, _super);
        function Employee(name, department) {
            var _this = _super.call(this, name) || this;
            _this.department = department;
            return _this;
        }
        Employee.prototype.getElevatorPitch = function () {
            return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
        };
        return Employee;
    }(Person));
    var howard = new Employee('Howard', 'Sales');
    console.log(howard.getElevatorPitch());
    // console.log(howard.name); // 错误
    // * 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承
    (function () {
        var Person = /** @class */ (function () {
            function Person(theName) {
                this.name = theName;
            }
            return Person;
        }());
        // Employee 能够继承 Person
        var Employee = /** @class */ (function (_super) {
            __extends(Employee, _super);
            function Employee(name, department) {
                var _this = _super.call(this, name) || this;
                _this.department = department;
                return _this;
            }
            Employee.prototype.getElevatorPitch = function () {
                return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
            };
            return Employee;
        }(Person));
        var howard = new Employee('Howard', 'Sales');
        // let john = new Person('John'); // 错误: 'Person' 的构造函数是被保护的.
    })();
    // ? readonly修饰符
    // 你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
    var Octopus = /** @class */ (function () {
        function Octopus(theName) {
            this.numberOfLegs = 8;
            this.name = theName;
        }
        return Octopus;
    }());
    var dad = new Octopus('Man with the 8 strong legs');
    // dad.name = 'Man with the 3-piece suit'; // 错误! name 是只读的.
    // ? 参数属性
    // 在上面的例子中，我们必须在Octopus类里定义一个只读成员 name和一个参数为 theName的构造函数，并且立刻将 theName的值赋给 name，
    // 这种情况经常会遇到。 参数属性可以方便地让我们在一个地方定义并初始化一个成员。 下面的例子是对之前 Octopus类的修改版，使用了参数属性：
    var Octopus1 = /** @class */ (function () {
        function Octopus1(name) {
            this.name = name;
            this.numberOfLegs = 8;
        }
        return Octopus1;
    }());
    // ? 存取器， 使用get 、 set 修饰符 对函数进行修饰
    var passcode = 'secret passcode';
    var Employee1 = /** @class */ (function () {
        function Employee1() {
        }
        Object.defineProperty(Employee1.prototype, "fullName", {
            get: function () {
                return this._fullName;
            },
            set: function (newName) {
                if (passcode && passcode == 'secret passcode') {
                    this._fullName = newName;
                }
                else {
                    console.log('Error: Unauthorized update of employee!');
                }
            },
            enumerable: false,
            configurable: true
        });
        return Employee1;
    }());
    var employee = new Employee1();
    employee.fullName = 'Bob Smith';
    if (employee.fullName) {
        console.log(employee.fullName);
    }
    // ? 静态属性， 想要访问这个属性的时候，都要在 origin前面加上类名 【Grid.origin】
    var Grid = /** @class */ (function () {
        function Grid(scale) {
            this.scale = scale;
        }
        Grid.prototype.calculateDistanceFromOrigin = function (point) {
            var xDist = point.x - Grid.origin.x;
            var yDist = point.y - Grid.origin.y;
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        };
        Grid.origin = { x: 0, y: 0 };
        return Grid;
    }());
    var grid1 = new Grid(1.0); // 1x scale
    var grid2 = new Grid(5.0); // 5x scale
    console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
    console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
    console.log(Grid.origin);
    // ? 抽象类
    // 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。
    // 不同于接口，抽象类可以包含成员的实现细节。
    // abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
    var Animal1 = /** @class */ (function () {
        function Animal1() {
        }
        Animal1.prototype.move = function () {
            console.log('roaming the earch...');
        };
        return Animal1;
    }());
    //
    var Department = /** @class */ (function () {
        function Department(name) {
            this.name = name;
        }
        Department.prototype.printName = function () {
            console.log('Department name: ' + this.name);
        };
        return Department;
    }());
    var AccountingDepartment = /** @class */ (function (_super) {
        __extends(AccountingDepartment, _super);
        function AccountingDepartment() {
            return _super.call(this, 'Accounting and Auditing') || this;
        }
        AccountingDepartment.prototype.printMeeting = function () {
            console.log('The Accounting Department meets each Monday at 10am.');
        };
        AccountingDepartment.prototype.generateReports = function () {
            console.log('Generating accounting reports...');
        };
        return AccountingDepartment;
    }(Department));
    var department; // 允许创建一个对抽象类型的引用
    // department = new Department(); // 错误: 不能创建一个抽象类的实例
    department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
    department.printName();
    department.printMeeting();
    // department.generateReports(); // 错误: 方法在声明的抽象类中不存在
    // ? 把类当做接口使用 【接口 继承 类】
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    var point3d = { x: 1, y: 2, z: 3 };
})();
//# sourceMappingURL=Classes.js.map