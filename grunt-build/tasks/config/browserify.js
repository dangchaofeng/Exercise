const { TMP_DIR_BABEL } = require('../variable');
module.exports = function (grunt) {
    // 让浏览器适配require(commonJS,CMD)
    grunt.config.set('browserify', {
        dist: {
            files: [
                {
                    expand: true,
                    src: ['**/*.js'], //所有js文件
                    dest: TMP_DIR_BABEL, //输出到此目录下
                    cwd: TMP_DIR_BABEL //js目录下
                }
            ]
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
};
