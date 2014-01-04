module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            build: [
                'build'
            ]
        },
        wintersmith: {
            production: {
                options: {
                    config: './config-production.json'
                }
            },
            preview: {
                options: {
                    action: 'preview',
                    config: './config-preview.json'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-wintersmith');
};