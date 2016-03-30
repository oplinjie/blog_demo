(function(window) {

    function Notifier() {};

    var queue = [];

    /* 是否支持 */
    Notifier.prototype.HasSupport = function() {
        if ("Notification" in window) {
            return true;
        } else {
            return false;
        }
    }

    /* 获取权限 */
    Notifier.prototype.GetPermission = function() {
        if (!this.IsGetPermission()) {
            window.Notification.requestPermission(function(permission) {
                // 判断用户的选择
                if (permission === "granted") {
                    return 'granted';
                } else {
                    return 'denied';
                }
            });
        } else {
            return 'granted';
        }
    }

    /* 是否已获取 */
    Notifier.prototype.IsGetPermission = function() {
        if (this.HasSupport()) {
            if (window.Notification.permission === "granted") {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    /* 提示通知 */
    Notifier.prototype.Notify = function(title, body, icon, time, url) {
        /*
           title: 标题，
           body: 提示内容，
           icon：显示图标
           time： 自动关闭时间
           url：点击进入的链接

           time,icon,url为可选的
        */
        if (this.IsGetPermission()) {
            icon = typeof(icon) === 'string' ? icon : 'http://lib.oplinjie.cn/wallhaven-312613.png';
            time = time == undefined ? 0 : isNaN(time) ? time : 0;
            url = typeof(url) === 'string' ? url : 'https://www.google.com.hk/';

            var options = {
                body: body,
                icon: icon
            };

            var n = new Notification(title, options);

            if (time != 0) {
                setTimeout(n.close.bind(n), time);
            }

            n.onclick = function() {
                window.open(url);
            }

        } else {
            this.GetPermission(); // 未获得权限返回false
        }

    }

    window.Notifier = new Notifier;

})(window);