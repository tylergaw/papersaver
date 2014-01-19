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
    var fullContainer = null;

    function closeFullSizeContainer (e) {
        if (e) {
            e.preventDefault();
        }

        $('.papers .open').removeClass('open');
        fullContainer.addClass('hidden');
        history.pushState({}, '', '/papers/');
    }

    function createFullSizeContainer () {
        var el = $('<div/>', {
            'class': 'paper-container hidden',
            'html': '<button class="close-btn">&times;</button>'
        });

        el.on('click', function (e) {
            if (!$(e.target).is('img')) {
                closeFullSizeContainer();
            }
        });

        $('body').append(el);
        return el;
    }

    function papersOnClick (e) {
        e.preventDefault();

        var el = $(e.currentTarget),
            img = el.find('img').clone();

        el.parents('.paper').addClass('open');
        fullContainer.find('img').remove();
        fullContainer.append(img);
        fullContainer.removeClass('hidden');
        history.pushState({}, '', el.attr('href'));
    }

    $('body').on('keyup', function (e) {
        if (e.keyCode === 27) {
            closeFullSizeContainer();
        }
    });

    $(function () {
        if ($('.papers').length > 0) {
            fullContainer = createFullSizeContainer();
            $('.papers').on('click', 'a', papersOnClick);

            window.onpopstate = function (e) {
                closeFullSizeContainer();
            };
        }
    });
});