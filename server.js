const dotenv = require("dotenv");
const {Client, GatewayIntentBits, Events} = require("discord.js");
const getMeme = require("./utils/getMeme");
const getWeather = require("./utils/getWeather");

let interval;
dotenv.config();

const client = new Client({ intents: [ 
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent 
] });


client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag} !`);
});


client.on(Events.MessageCreate, async msg => {
    switch(msg.content){
        case "ping":
            msg.reply("Pong !!");
            break;
        
        case "!meme":
            msg.channel.send("Here's your meme 😂");
            msg.channel.sendTyping();
            const img = await getMeme();
            msg.channel.send(img);
            break;

        case "!eye":
            msg.channel.send("You are now subscribed to eye reminders.");
            interval = setInterval(() => {
                msg.channel.send("Please take an eye break now!")
                    .catch(console.error);
            }, 1000*5);
            break;

        case "!stop":
            msg.channel.send("You have stopped the eye reminders");
            clearInterval(interval);
            break;
    }
});


client.on(Events.MessageCreate, async msg =>{
    let isWeatherChannel = msg.content.toLowerCase().startsWith("!weather");

    if(isWeatherChannel){
        const parts = msg.content.split("/");

        if(parts.length !== 3){
            msg.channel.send("Invalid input");
            return;
        }

        const city = parts[0].split(" ")[1] || "";
        const state = parts[1] || "";
        const country = parts[2] || "";

        const res = await getWeather(city, state, country);

        const temp = res.data.temp;
        const feels = res.data.feels_like;
        const humidity = res.data.humidity;
        const min = res.data.min_temp;
        const max = res.data.max_temp;
        const wind = res.data.wind_speed;

        const loc = city + " " + state + " " + country;

        msg.channel.send(`
            📍Location : ${loc}
            🌡️Temperature : ${temp}
            👍Feels like : ${feels}
            ❄️Min. Temperature : ${min}
            🔆Max. Temperature : ${max}
            💧Humidity : ${humidity}
            🍃Wind : ${wind}
        `);

    }
});


client.login(process.env.CLIENT_TOKEN);