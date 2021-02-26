/*
 * @Author: Adam Dang
 * @Description: 接口 【接口 继承 接口】 【接口 继承 类】 【类 实现 接口】 【对象 实现 接口】
 * @Date: 2021-02-23 17:56:18
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-02-23 17:56:18
 */
(() => {
    // ? 接口初探
    // * 基础写法
    // function printLabel(labelledObj: { label: string }) {
    //     console.log(labelledObj.label);
    // }

    // * 接口写法
    interface LabelledValue {
        label: string;
    }
    function printLabel(labelledObj: LabelledValue) {
        console.log(labelledObj.label);
    }
    let myObj = {
        size: 10,
        label: 'size 10 object'
    };

    printLabel(myObj);

    // ? 可选属性
    interface SquareConfig {
        color?: string;
        width?: number;
    }
    function createSquare(config: SquareConfig): { color: string; area: number } {
        let newSquare = { color: 'white', area: 100 };
        if (config.color) {
            // 属性“colr”在类型“SquareConfig”上不存在。你是否指的是“color”?
            newSquare.color = config.color;
        }
        if (config.width) {
            newSquare.area = config.width * config.width;
        }
        return newSquare;
    }

    // ? 只读属性
    interface Point {
        readonly x: number;
        readonly y: number;
    }
    let p1: Point = { x: 10, y: 20 };
    // p1.x = 5; // 无法分配到 "x" ，因为它是只读属性。

    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = a;
    a[0] = 11;
    // ro[0] = 12; // 类型“readonly number[]”中的索引签名仅允许读取。
    let b: readonly number[] = [9, 8, 7, 6];
    // b[0] = 99; // 类型“readonly number[]”中的索引签名仅允许读取。

    // * readonly vs const
    // 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。

    // ? 额外的属性检查
    // let mySquare1 = createSquare({ colour: 'red', width: 100 });
    // 报错，类型“{ colour: string; width: number; }”的参数不能赋给类型“SquareConfig”的参数。
    // 对象文字只能指定已知的属性，但“colour”中不存在类型“SquareConfig”。是否要写入 color?
    // * 解决方案1， 使用断言
    // let mySquare2 = createSquare({ colour: 'red', width: 100 } as SquareConfig);
    // * 解决方案2， 使用修改interface， 添加一个字符串索引签名【带有任意数量的其它属性】
    // interface SquareConfig {
    //     color?: string;
    //     width?: number;
    //     [propName: string]: any;
    // }
    // let mySquare3 = createSquare({ colour: 'red', width: 100 });
    // * 解决方案3，先赋值给变量，传参使用变量去传,  因为 squareOptions不会经过额外属性检查，所以编译器不会报错。
    // let squareOptions = { colour: 'red', width: 100 };
    // let mySquare4 = createSquare(squareOptions);

    // ? 接口 描述 函数类型, 一般不怎么使用
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }
    let mySearch: SearchFunc;
    mySearch = function (source: string, subString: string) {
        let result = source.search(subString);
        return result > -1;
    };

    // ? 接口 描述 可索引类型
    interface StringArray {
        [index: number]: string;
    }

    let myArray: StringArray;
    myArray = ['Bob', 'Fred'];

    let myStr: string = myArray[0];

    // TypeScript支持两种索引签名：字符串和数字。
    // 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
    // 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。
    // 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。
    // class Animal {
    //     name: string;
    // }
    // class Dog extends Animal {
    //     breed: string;
    // }

    // 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
    // interface NotOkay {
    //     [x: number]: Animal;
    //     [x: string]: Dog;
    // }

    // ? 接口 描述 类类型, 【类 实现 接口】
    // 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。
    interface ClockInterface {
        currentTime: Date;
        setTime(d: Date): void;
    }
    // class Clock implements ClockInterface {
    //     currentTime: Date;
    //     setTime(d: Date) {
    //         this.currentTime = d;
    //     }
    //     constructor(h: number, m: number) {}
    // }

    // * 类静态部分与实例部分的区别
    // constructor存在于类的静态部分，所以不在检查的范围内。
    // 详细看文档，有点难理解， 应该实战中用的也少
    // interface ClockConstructor {
    //     new (hour: number, minute: number);
    // }

    // class Clock implements ClockConstructor {
    //     currentTime: Date;
    //     constructor(hour: number, minute: number) {}
    // }

    // ? 继承接口,  可以继承多个。 接口可以划分为模块，继承使用
    interface Shape {
        color: string;
    }
    interface PenStroke {
        penWidth: number;
    }
    interface Square extends Shape, PenStroke {
        sideLength: number;
    }
    let square: Square = { color: 'red', sideLength: 123, penWidth: 1 };

    // ? 混合类型
    // 一个对象可以同时做为函数和对象使用，并带有额外的属性。
    interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
    }

    function getCounter(): Counter {
        let counter = <Counter>function (start: number) {};
        counter.interval = 123;
        counter.reset = function () {};
        return counter;
    }

    let c = getCounter();
    c(10); // 作为函数使用
    c.reset(); // 作为对象使用
    c.interval = 5.0; // 作为对象使用

    // ? 接口继承类
    class Control {
        private state: any;
    }

    interface SelectableControl extends Control {
        select(): void;
    }

    class Button extends Control implements SelectableControl {
        select() {}
    }

    class TextBox extends Control {
        select() {}
    }

    // 错误：“Image”类型缺少“state”属性。
    // class Image implements SelectableControl {
    //     select() {}
    // }
})();

// * 对应声明文件中的export来使用
import AliasMan = d.cf.Man;
(() => {
    console.log(123);
    class Student implements d.cf.Person {
        // private id: string;
        constructor(private id: string, public name: string, public age: number) {}
    }
    const a: Student = new Student('1', 'dangchaofeng', 28);
    console.log('age', a.age);
    console.log('name', a.name);

    class Boy implements AliasMan {
        constructor(public name: string, public age: number) {}
    }

    const boy: Boy = new Boy('peng', 1);
    console.log(boy.name);
})();
