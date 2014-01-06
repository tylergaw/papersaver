var _ = require('underscore'),
    moment = require('moment');

module.exports = function (env, callback) {
    env.utils.getSortedPaperDirs = function (contents) {
        return _.chain(contents._.directories)
            .map(function (item) {
                if (item) {
                    return item.index;
                }
            })
            .sortBy(function (item) {
                if (item) {
                    return -item.date;
                }
            })
            .filter(function (item) {
                if (item) {
                    return item;
                }
            })
            .value();
    };

    env.utils.getDateFormatted = function (date, offset) {
        var m = moment(date);

        if (offset) {
            m = m.zone(offset);
        }

        return m.format('MMMM Do YYYY [at] h:mma');
    };

    callback();
};