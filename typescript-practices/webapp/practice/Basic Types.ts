/*
 * @Author: Adam Dang
 * @Description: 基础类型 【布尔值】 【数字】 【字符串】 【数组】 【元组】 【枚举】 【null】 【undefined】 【any】 【never】 【void】
 * @Date: 2021-02-23 17:55:46
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-02-24 10:02:50
 */

(() => {
    // ? 布尔值
    const isDone: boolean = false;

    // ? 数字
    const width: number = 300;

    // ! 一般不会用二进制 or 八进制
    let hexLiteral: number = 0xf00d;
    let binaryLiteral: number = 0b1010;
    let octalLiteral: number = 0o744;

    // ? 字符串
    let name: string = 'bob';
    let age: number = 28;
    let sentence: string = `Hello, my name is ${name}, my age is ${age}`;
    console.log('sentence: ', sentence);

    // ? 数组
    let list: number[] = [1, 2]; // * 元素类型后面接上 []，表示由此类型元素组成的一个数组
    let arr: Array<number> = [1, 2]; // * 使用数组泛型，Array<元素类型>

    // ? 元组 Tuple
    let x: [string, number];
    x = ['1', 2];

    // x[5] 报错，因为不存在值

    // ? 枚举， 可以用来定义常量，供其使用
    enum Color {
        Error = 'Error',
        Success = 'Success',
        Infomation = 'Infomation'
    }

    console.log(Color.Error);
    console.log(Color.Infomation);

    // ? Any
    let notSure: any;
    notSure = 'maybe is a string';
    notSure = false;
    notSure = 123;
    let anyList: any[] = [1, 'w', true, {}];

    // ? Object类型,  变量允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法
    let prettySure: Object;
    prettySure = true;
    prettySure = undefined;
    prettySure = null;
    prettySure = 4;

    // ? compare Any && Object
    let any: any = 4;
    let obj: Object = 4;
    console.log(any.toFixed(), 'any 类型是可以调用任意方法');
    // console.log(obj.toFixed(), 'Object类型不能调用任意方法，编译会报错，但是实际运行没有问题');

    // ? Void
    // 当一个函数没有返回值时，你通常会见到其返回值类型是 void
    function noReturn(): void {
        console.log('This is a message.');
    }
    // * 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
    let unusable: void;
    unusable = undefined;
    unusable = null;

    // ? Null 和 Undefined
    // undefined和null两者各自有自己的类型分别叫做undefined和null
    let u: undefined = undefined;
    let n: null = null;

    // ? Never
    // never类型是任何类型的子类型，也可以赋值给任何类型；
    // 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。
    // 即使 any也不可以赋值给never。
    // 返回never的函数必须存在无法达到的终点
    function error(message: string): never {
        throw new Error(message);
    }

    // ? Object
    // object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
    // 使用object类型，就可以更好的表示像Object.create这样的API
    let params: object;
    params = {};
    params = null;
    params = undefined;

    // ? 类型断言, 强烈推荐使用 as 语法，ts 中使用JSX时，只允许 as 语法
    // 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。
    let someValue: any = 'this is a string';

    let strLength: number = (someValue as string).length;

    console.log(strLength);
})();
