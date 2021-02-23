/**
 * grunt task autoprefixer
 * autoprefixer
 * @Author   weiber
 * @DateTime 2016-04-24T03:15:36+0800
 * @param    {[type]}                 grunt [description]
 * @return   {[type]}                       [description]
 */
const { WEB_APP_DIR } = require('../variable');
module.exports = function (grunt) {
    grunt.config.set('autoprefixer', {
        options: {
            browsers: [
                'Chrome >= 20',
                'Firefox >= 24',
                'Explorer >= 6',
                'Opera >= 12',
                'Safari >= 6'
            ],
            map: false
        },
        local: {
            expand: true,
            src: ['css/*.css'],
            cwd: WEB_APP_DIR,
            dest: WEB_APP_DIR
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
};
