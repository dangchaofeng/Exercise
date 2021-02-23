module.exports = function (grunt) {
    ('use strict');
    const includeAll = require('include-all');
    const path = require('path');
    /**
     * Loads Grunt configuration modules from the specified
     * relative path. These modules should export a function
     * that, when run, should either load/configure or register
     * a Grunt task.
     */
    function loadTasks(relPath) {
        return (
            includeAll({
                dirname: path.resolve(__dirname, relPath),
                filter: /(.+)\.js$/
            }) || {}
        );
    }

    /**
     * Invokes the function from a Grunt configuration module with
     * a single argument - the `grunt` object.
     */
    function invokeConfigFn(tasks) {
        for (const taskName in tasks) {
            if (tasks.hasOwnProperty(taskName)) {
                tasks[taskName](grunt);
            }
        }
    }

    // Load task functions
    const taskConfigurations = loadTasks('./tasks/config');
    const registerDefinitions = loadTasks('./tasks/register');

    // Run task functions to configure Grunt.
    invokeConfigFn(taskConfigurations);
    invokeConfigFn(registerDefinitions);
};
