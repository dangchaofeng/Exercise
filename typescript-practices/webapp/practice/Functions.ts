/*
 * @Author: Adam Dang
 * @Description: 函数 【参数定义类型】 【函数返回值定义类型】 【直接函数定义类型】 【可选参数】 【参数默认值】 【箭头函数】 【重载函数】
 * @Date: 2021-02-25 10:16:06
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-02-25 10:16:07
 */

// ? 为函数定义类型
// 可以给每个参数添加类型之后再为函数本身添加返回值类型。 TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。
(() => {
    // Named function
    function add(x: number, y: number): number {
        return x + y;
    }

    // Anonymous function
    let myAdd = function (x: number, y: number): number {
        return x + y;
    };
})();

// ? 书写完整函数类型, 【类型推断】 function(x, y)中并未指定参数类型，但是根据函数的类型可以推断出来，鼠标移到参数上即可看到
(() => {
    let myAdd: (baseVal: number, increment: string) => string = function (x, y) {
        return x + y;
    };
})();

// ? 可选参数和默认参数
(() => {
    // * age：默认参数，提供默认值； height：可选参数，可传可不传
    function buildName(firstName: string, lastName: string, age: number = 0, height?: number) {
        return firstName + ' ' + lastName;
    }
    buildName('a', 'b');
})();

// ? 剩余参数
(() => {
    function buildName(firstName: string, lastName: string, ...restArgs: string[]) {
        console.log(restArgs, 'restArgs is an array');
        return firstName + ' ' + lastName;
    }
    buildName('a', 'b', '2', '3', '5');
})();

// ? this 和 箭头函数： es6 也有，不用专门练习了。

// ? 重载： 有点鸡肋，就是if分支，不是真正意义上的重载
(() => {
    let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

    // * 两个重载列表 => 为同一个函数提供多个函数类型定义来进行函数重载
    function pickCard(x: { suit: string; card: number }[]): number;
    function pickCard(x: number): { suit: string; card: number };
    // * 重载实现函数
    function pickCard(x): any {
        // Check to see if we're working with an object/array
        // if so, they gave us the deck and we'll pick the card
        if (typeof x == 'object') {
            let pickedCard = Math.floor(Math.random() * x.length);
            return pickedCard;
        }
        // Otherwise just let them pick the card
        else if (typeof x == 'number') {
            let pickedSuit = Math.floor(x / 13);
            return { suit: suits[pickedSuit], card: x % 13 };
        }
    }

    let myDeck = [
        { suit: 'diamonds', card: 2 },
        { suit: 'spades', card: 10 },
        { suit: 'hearts', card: 4 }
    ];
    let pickedCard1 = myDeck[pickCard(myDeck)];
    console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit);

    let pickedCard2 = pickCard(15);
    console.log('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit);
})();
