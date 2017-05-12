/**
 * Created by masikann on 3/30/17.
 */

// get file function - will have more functions in future
(function() {
    var main = function ($, pluginPopup) {
        var getFile = {};

        getFile.combinedHTMLFile = function(){
            var combinedHTMLFile = $.get('../target/combinedHTML.html');
            return combinedHTMLFile;
        }

        return getFile;
    }

    define(['jquery', 'plugin-popup'], main);
})();