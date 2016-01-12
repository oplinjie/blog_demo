var swipe = (function() {
    var mouseData = {
            sX: 0,
            eX: 0,
            sY: 0,
            eY: 0
        },
        pos1,
        pos2,
        pos3,
        dirX,
        dirY,
        right,
        width,
        el,
        touchStart = function(ev) {
            pos1 = ev.changedTouches[0];
            // 记录开始时位置
            mouseData.sX = pos1.pageX;
            mouseData.sY = pos1.pageY;
        },
        touchMove = function(ev, element) {
            el = element;
            pos2 = ev.changedTouches[0];
            //记录结束时位置
            mouseData.eX = pos2.pageX;
            mouseData.eY = pos2.pageY;

            //求位置差
            dirX = mouseData.sX - mouseData.eX;
            dirY = Math.abs(mouseData.eY - mouseData.sY);

            mouseData.sX = mouseData.eX;
            mouseData.sY = mouseData.eY;

            right = parseInt(el.css('right'));
            width = parseInt(el.css('width'));
            //位置偏移小于5时切换
            if (dirY < 5) {
                right = right + dirX;
                if (right <= 0 && Math.abs(right) < width) {
                    el.css('right', right + 'px');
                } else if (Math.abs(right) > width) {
                    el.css('right', '-30%');
                } else if (right > 0) {
                    el.css('right', '0');
                }
            }
        },
        touchEnd = function(ev) {
            //大于50%直接100%
            //小于50%直接0
            if (Math.abs(right) < (width / 2)) {
                el.css('right', '0');
            } else if (Math.abs(right) > (width / 2)) {
                el.css('right', '-30%');
            }
        }
    return {
        touchStart: touchStart,
        touchMove: touchMove,
        touchEnd: touchEnd
    }
})();

//use
$('.item')
    .on('touchstart', function(e) {
        $('.item_link').css('right', '-30%');
        swipe.touchStart(e);
    })
    .on('touchmove', function(e) {
        swipe.touchMove(e, $(this).children('.item_link'));
    }).on('touchend', swipe.touchEnd);