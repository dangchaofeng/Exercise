/**
 * less
 */

module.exports = function (grunt) {
    grunt.config.set('less', {
        dev: {
            files: {
                'webapp/css/style.css': 'webapp/css/lessFolder/style.less' // compile .less to .css
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
};
