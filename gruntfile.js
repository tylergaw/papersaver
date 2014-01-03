module.exports = function (grunt) {
    grunt.initConfig({
        wintersmith: {
            preview: {
                options: {
                    config: './config-preview.json'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-wintersmith');
};