/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
const { WEB_APP_DIR, TMP_DIR_BABEL, TARGET_DIR } = require('../variable');
module.exports = function (grunt) {
    grunt.config.merge({
        copy: {
            copyToDist: {
                files: [
                    {
                        expand: true,
                        src: ['**/*.js', '!static/*.js', '!test/**/*'],
                        dest: TARGET_DIR,
                        cwd: TMP_DIR_BABEL
                    },
                    {
                        expand: true,
                        src: 'static/*.js',
                        dest: TARGET_DIR,
                        cwd: WEB_APP_DIR
                    },
                    {
                        expand: true,
                        src: '**/*.css',
                        dest: TARGET_DIR,
                        cwd: WEB_APP_DIR
                    },
                    {
                        expand: true,
                        src: ['**/*', '!**/*.js', '!**/*.css', '!test/**/*'],
                        dest: TARGET_DIR,
                        cwd: WEB_APP_DIR
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
