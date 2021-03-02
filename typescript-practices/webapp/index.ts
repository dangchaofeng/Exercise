import { b } from './src/greeter';
import './css/index.css';
console.log(b, 'ccc');
Object.assign({}, { a: 1 });
(async () => {
    await new Promise((resolve, reject) => {
        resolve(1);
    });
})();

console.error(123456);

// 报错module.hot没有，需要npm i @types/webpack-env -D，并且在tsconfig 中的compilerOptions下添加 "types": ["webpack-env"]
if (module.hot) {
    module.hot.accept();
}
