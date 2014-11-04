(function(module) {
    "use strict";
    var Audio = {};

    Audio.parse = function(postContent, callback) {
        var re = /\[audio\](.*)\s.*\s.*\[\/audio\]/gm;
        if (re.test(postContent) !== false) {
            var arr = postContent.match(re);
            var audioString = arr[0];
            re = /href="(.*?)">(.*?)</gm;
            arr = audioString.match(re);
            var result = '<ul id="playlist" style="list-style-type: none;padding: 0;">';
            arr.forEach(function(value){
                var url = value.replace(re, '$1');
                var name = value.replace(re, '$2');
                result += '<li data-link="'+url+'"><i class="play-btn"></i>'+name+'</li>'
            });
            result+='</ul>';
            re = /\[audio\](.*)\s.*\s.*\[\/audio\]/gm;
            postContent = postContent.replace(re, result);
        }
        callback(null, postContent);
    };

    module.exports = Audio;
}(module));