module.exports = function (grunt) {
    grunt.registerTask('runBuild', [
        'less',
        'autoprefixer',
        'clean:build',
        'babel',
        'browserify',
        'copy:copyToDist',
        'clean:cleanBabel'
    ]);
};
