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
const {
    TMP_DIR_DBG,
    WEB_APP_DIR,
    TMP_DIR_BABEL,
    TMP_DIR,
    TARGET_DIR,
    DWC_TARGET_DIR
} = require('../variable');
module.exports = function (grunt) {
    grunt.config.merge({
        copy: {
            copyToDbg: {
                files: [
                    {
                        expand: true,
                        src: ['**/*.js', '!static/*.js', '!test/**/*'],
                        dest: TMP_DIR_DBG,
                        cwd: TMP_DIR_BABEL
                    },
                    {
                        expand: true,
                        src: 'static/*.js',
                        dest: TMP_DIR_DBG,
                        cwd: WEB_APP_DIR
                    },
                    {
                        expand: true,
                        src: '**/*.css',
                        dest: TMP_DIR_DBG,
                        cwd: WEB_APP_DIR
                    }
                ]
            },
            copyToTmp: {
                files: [
                    {
                        expand: true,
                        src: ['**/*.js', '!static/*.js', '!test/**/*'],
                        dest: TMP_DIR,
                        cwd: TMP_DIR_BABEL
                    },
                    {
                        expand: true,
                        src: 'static/*.js',
                        dest: TMP_DIR,
                        cwd: WEB_APP_DIR
                    },
                    {
                        expand: true,
                        src: '**/*.css',
                        dest: TMP_DIR,
                        cwd: WEB_APP_DIR
                    },
                    {
                        expand: true,
                        src: ['**/*', '!**/*.js', '!**/*.css', '!test/**/*'],
                        dest: TMP_DIR,
                        cwd: WEB_APP_DIR
                    }
                ]
            },
            copyToDeploy: {
                files: [
                    {
                        expand: true,
                        src: ['**/*'],
                        dest: DWC_TARGET_DIR,
                        cwd: TARGET_DIR
                    }
                ]
            }
        }
    });

    //   grunt.loadNpmTasks('grunt-contrib-copy');
};
