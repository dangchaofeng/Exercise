/**
 * babel files
 */
const { WEB_APP_DIR, TMP_DIR_BABEL } = require('../variable');
module.exports = function (grunt) {
    grunt.config.set('babel', {
        options: {
            sourceMap: false,
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
                        },
                        modules: 'commonjs', // 选项用于模块转化规则设置，可选配置包括："amd" | "umd" | "systemjs" | "commonjs" | false, 默认使用 "commonjs"。即，将代码中的ES6的import转为require。
                        corejs: '3', // 声明corejs版本
                        useBuiltIns: 'usage' // 不用显示引用@babel/polyfill  entry/false
                    }
                ]
            ]
        },
        dist: {
            files: [
                {
                    expand: true, // Enable dynamic expansion.
                    cwd: WEB_APP_DIR, // Src matches are relative to this path.
                    src: ['**/*.js'],
                    dest: TMP_DIR_BABEL, // Destination path prefix.
                    filter: function (filepath) {
                        return !filepath.match(new RegExp('webapp/(static|test)', 'gi'));
                    }
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-babel');
};
