/*
 * @Author: Adam Dang
 * @Description: 泛型： 使用泛型来【创建可重用的组件】，一个组件可以支持多种类型的数据
 * @Date: 2021-02-25 11:18:50
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-02-25 11:18:51
 */

// ? 泛型 之 Hello World
(() => {
    // 给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型。
    // * identity 后面紧跟的<T>是我们把T作为参数传给函数， (arg: T) : T 这两个T是函数的入参和返回值的定义，使用了我们定义的类型变量T
    function identity<T>(arg: T): T {
        return arg;
    }

    // * 使用泛型函数
    // 传入类型参数
    identity<string>('2');
    identity<string[]>(['2']);
    identity<boolean>(true);
    // 让编译器自动进行 类型推论
    identity(1);
    identity({ a: 1 });
})();

// ? 泛型类型
(() => {
    // 示例做了少许改动。 不再描述泛型函数，而是把非泛型函数签名作为泛型类型一部分。
    // 当我们使用 GenericIdentityFn的时候，还得传入一个类型参数来指定泛型类型（这里是：number），锁定了之后代码里使用的类型
    interface GenericIdentityFn<T> {
        (arg: T): T;
    }

    function identity<T>(arg: T): T {
        return arg;
    }
    let myIdentity: GenericIdentityFn<number> = identity;
    myIdentity(123);
})();

// ? 泛型类
(() => {
    // * 说白了， 就是泛型里面的类型变量，充当实际类型，而类型变量的实际值，是由外部使用时传参进来的
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function (x, y) {
        return x + y;
    };
})();

// ? 泛型约束
(() => {
    interface Lengthwise {
        length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length); // Now we know it has a .length property, so no more error
        return arg;
    }
    loggingIdentity({ length: 10 });
    // loggingIdentity(3);  // Error, number doesn't have a .length property
})();

// ? 在泛型约束中使用类型参数
// todo
// 这个没看懂，没理解， 日后熟悉了再看
