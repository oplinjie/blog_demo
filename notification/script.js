(function() {
    function notifyMe() {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("This browser does not support system notifications");
        }
        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            var notification = new Notification("Hi there!");
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function(permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    var notification = new Notification("Hi there!");
                }
            });
        }

        // Finally, if the user has denied notifications and you 
        // want to be respectful there is no need to bother them any more.
    }

    notifyMe();



    var quotes = [
        'Hey! My mascara has run out. I\'m so depressed!',
        'Why does no one love me?',
        'You just don\'t care about real problems like mine.',
        'My dress is not as dark as my soul...',
        'Why? Whhhyyyyyy?',
        'I\'m hungry! Why is there nothing to eat around here?',
        'I hate it when people say I look like a goth. Emos are so different.',
        'My floor-length leather trenchcoat makes me feel too hot...',
        'My thoughts give way to nothing but dark sollioquies.',
        'My toast is slightly burnt. Please end my suffering.'
    ]

    /* Creating a notification */
    function randomNotification() {
        var randomQuote = quoteChooser();
        var options = {
            body: randomQuote,
            icon: 'images/left.png',
        }

        var n = new Notification('Emogotchi says', options);
        setTimeout(n.close.bind(n), 5000); /* 5s 后自动消失 */
    }

    function quoteChooser() {
        var randomNumber = Math.floor(Math.random() * 10);
        quote = quotes[randomNumber];
        return quote;
    }

    randomNotification();
})();