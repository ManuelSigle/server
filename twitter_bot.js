console.log("Twitter_Bot gestartet!");
const twitter_bot = require("./Twitter-Bot/modules/twitter_bot_module");

const is_new_day = () => {
    var date = new Date();
    var date_hour = date.getHours();
    var date_minutes = date.getMinutes();

    if (date_hour == 1 && date_minutes == 0) {
        twitter_bot.creat_new_day();
    }
}

setInterval(is_new_day, 1000);
setInterval(twitter_bot.tweet_check, 1000 * 10);