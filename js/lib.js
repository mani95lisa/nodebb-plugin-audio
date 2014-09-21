/**
 * Created by mani on 14-6-29.
 */
$(document).ready(function() {
    $(window).on('action:topic.loaded', function () {
        if (!window.location.origin)
            window.location.origin = window.location.protocol+"//"+window.location.host;
        var baseDir =  window.location.origin+'/plugins/nodebb-plugin-audio/dist';
        var $pl = $("#playlist"),
            $time = $('<span class="time" style="float:right"></span>'),
            mp = new _mu.Player({
                mode: 'list',
                baseDir: baseDir
            }),
            reset = function() {
                $pl.find('> li').removeClass('playing pause')
                    .find('.time').remove();
            },
            findCurrItem = function() {
                var link = mp.getCur();
                var item = $pl.find('[data-link="' + link + '"]');
                return item;
            };

        $pl.on('click', '> li', function() {
            var $this = $(this),
                sids;


            if ($this.hasClass('playing')) {
                mp.pause();
            } else {
                sids = $this.parent().find('> li').map(function() {
                    return $(this).data('link');
                }).get();


                mp.reset().add(sids).setCur($this.data('link')).play();
            }
        });

        mp.on('playing pause', function() {
            reset();
            findCurrItem().addClass(mp.getState()).append($time);
        }).on('ended', reset).on('timeupdate', function() {
            $time.text(mp.curPos(true) + ' / ' + mp.duration(true));
        });
    });
});
