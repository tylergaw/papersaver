var _ = require('underscore');

module.exports = function (env, callback) {
    env.helpers.getSortedContentFolder = function (folder, contents) {
        return _.chain(contents[folder]._.directories)
            .map(function (item) {
                return item.index;
            })
            .sortBy(function (item) {
                return -item.date;
            })
            .value();
    };

    callback();
};