/**
 * Created by masikann on 3/28/17.
 */


requirejs.config({
    paths: {
        'jquery': '../libraries/jquery',
        'jasmine-jquery': '../libraries/jasmine-jquery',
        'dust': '../libraries/dust-core.min',
        'updateMainContent': 'lib/updateMainContent',
        'updateHistory': 'lib/updateHistory',
        'plugin-popup': 'plugins/plugin-popup',
        'plugin-carousel': 'plugins/plugin-carousel',
        'showOrStopLoading': 'lib/showOrStopLoading'
        //'bookListTemplate': 'listOfBooks-dust'
    },
    shim: {
        'dust': {exports: 'dust'}
    }
})

var main = function($, getFile, dust, updateContent, updateHistory){

    // load combined file and append to main container
    var combinedHTMLFile = getFile.combinedHTMLFile();
    combinedHTMLFile.promise().done(function(data){
        $('.mainContainer').append(data);
    })

    // add events
    var $scriptElement = $('script[data-main][data-start]');
    var startJS = $scriptElement.data('start');
    require([startJS], function(startFile){
        startFile.doThis();
    })

    // to set onpopstate event for history
    updateHistory.popEvent();

}

define(['jquery', 'getFile', 'dust', 'updateMainContent', 'updateHistory'], main);