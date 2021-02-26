/* eslint-disable @typescript-eslint/no-use-before-define */
declare const axios;
declare const jQuery;
declare const $;

declare namespace d {
    namespace cf {
        interface Person {
            name: string;
            age: number;
        }

        // * export 可以在使用的地方以import的形式引入并赋值给别名变量， 也可以直接d.cf.Man来调用， 推荐使用此写法
        export interface Man {
            name: string;
            age: number;
        }
    }
}
