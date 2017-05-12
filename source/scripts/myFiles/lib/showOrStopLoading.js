/**
 * Created by masikann on 5/4/17.
 */


// To show loading indicator - uses popup plugin
(function(){

    var main = function(pluginPopup) {

        var returnObject = {};

        returnObject.showLoading = function(options){
            $('[data-fragment="plugin-ajax-spinner"]').popup(options);
        };

        returnObject.stopLoading = function(options){
            $.extend(options, {remove: 'true'});
            $('[data-fragment="plugin-ajax-spinner"]').popup(options);
        };

        return returnObject;

    };

    define(['plugin-popup'], main);
})();