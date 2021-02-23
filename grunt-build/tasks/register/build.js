module.exports = function (grunt) {
    grunt.registerTask('runBuild', [
        'less',
        'autoprefixer',
        'clean:build',
        'babel',
        'browserify',
        'build',
        'clean:cleanBabel',
        'copy:copyToDeploy'
    ]);
};
