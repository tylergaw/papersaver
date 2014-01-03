module.exports = function (grunt) {
    grunt.initConfig({
        wintersmith: {
            preview: {
                options: {
                    action: 'preview',
                    config: './config-preview.json'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-wintersmith');
};