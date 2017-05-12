/**
 * Created by masikann on 5/3/17.
 */

// To update history - back button push
(function(){
    var main = function($, updateContent){

        var returnObj = {};

        // Push to history stack
        returnObj.push = function(linkAction) {
            history.pushState({thisLinkAction: linkAction}, null, linkAction);
        }

        // Handle the pushed object on popstate
        returnObj.popEvent = function(){
            window.onpopstate = function(event){
                var linkAction = (event.state) ? event.state.thisLinkAction : (window.location.href).split('/').pop();
                linkAction = (linkAction === 'index.html')? 'intro' : linkAction;
                console.log('triggered ; ' + linkAction);
                if(linkAction){
                    updateContent.updateMainContent(linkAction);
                }
            }
        }

        return returnObj;
    };

    define('updateHistory', ['jquery', 'updateMainContent'], main);
})()