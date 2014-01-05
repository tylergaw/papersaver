var _ = require('underscore');

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

    callback();
};