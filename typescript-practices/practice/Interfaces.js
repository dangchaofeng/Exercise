/*
 * @Author: Adam Dang
 * @Description: 接口 【接口 继承 接口】 【接口 继承 类】 【类 实现 接口】 【对象 实现 接口】
 * @Date: 2021-02-23 17:56:18
 * @LastEditors: Adam Dang
 * @LastEditTime: 2021-02-23 17:56:18
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
    // ? 接口初探
    // * 基础写法
    // function printLabel(labelledObj: { label: string }) {
    //     console.log(labelledObj.label);
    // }
    function printLabel(labelledObj) {
        console.log(labelledObj.label);
    }
    var myObj = {
        size: 10,
        label: 'size 10 object'
    };
    printLabel(myObj);
    function createSquare(config) {
        var newSquare = { color: 'white', area: 100 };
        if (config.color) {
            // 属性“colr”在类型“SquareConfig”上不存在。你是否指的是“color”?
            newSquare.color = config.color;
        }
        if (config.width) {
            newSquare.area = config.width * config.width;
        }
        return newSquare;
    }
    var p1 = { x: 10, y: 20 };
    // p1.x = 5; // 无法分配到 "x" ，因为它是只读属性。
    var a = [1, 2, 3, 4];
    var ro = a;
    a[0] = 11;
    // ro[0] = 12; // 类型“readonly number[]”中的索引签名仅允许读取。
    var b = [9, 8, 7, 6];
    var mySearch;
    mySearch = function (source, subString) {
        var result = source.search(subString);
        return result > -1;
    };
    var myArray;
    myArray = ['Bob', 'Fred'];
    var myStr = myArray[0];
    var square = { color: 'red', sideLength: 123, penWidth: 1 };
    function getCounter() {
        var counter = function (start) { };
        counter.interval = 123;
        counter.reset = function () { };
        return counter;
    }
    var c = getCounter();
    c(10); // 作为函数使用
    c.reset(); // 作为对象使用
    c.interval = 5.0; // 作为对象使用
    // ? 接口继承类
    var Control = /** @class */ (function () {
        function Control() {
        }
        return Control;
    }());
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Button.prototype.select = function () { };
        return Button;
    }(Control));
    var TextBox = /** @class */ (function (_super) {
        __extends(TextBox, _super);
        function TextBox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextBox.prototype.select = function () { };
        return TextBox;
    }(Control));
    // 错误：“Image”类型缺少“state”属性。
    // class Image implements SelectableControl {
    //     select() {}
    // }
})();
//# sourceMappingURL=Interfaces.js.map