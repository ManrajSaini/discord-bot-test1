const dotenv = require("dotenv");
const {Client, GatewayIntentBits, Events} = require("discord.js");
const getMeme = require("./utils/getMeme");

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


client.login(process.env.CLIENT_TOKEN);