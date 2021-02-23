/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
const { TARGET_DIR, TMP_DIR_BABEL } = require('../variable');
module.exports = function (grunt) {
    grunt.config.set('clean', {
        build: [TARGET_DIR],
        cleanBabel: [TMP_DIR_BABEL]
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};
