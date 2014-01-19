// DOCS: http://requirejs.org/docs/api.html#config
require.config({
    paths: {
        'jquery': 'libs/jquery/jquery-2.0.3',
        'underscore': 'libs/underscore/underscore-1.5.2',
    },
    shim: {
        'jquery': {
            exports: 'jquery'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require([
    'jquery',
    'underscore'
], function ($, _) {
    $(function () {
        console.log('help! my panties!');
    });
});