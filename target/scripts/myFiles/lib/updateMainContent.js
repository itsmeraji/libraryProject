/**
 * Created by masikann on 5/3/17.
 */

// update main content
(function(){
    var main = function($){
        var returnObj = {};

        returnObj.updateMainContent = function(linkAction) {
            $('section[data-fragment]').css('display', 'none');
            $('section[data-fragment=' + linkAction + ']').css('display', 'block');
        }

        return returnObj;
    };

    define('updateMainContent', ['jquery'], main);
})()