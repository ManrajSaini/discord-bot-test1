const dotenv = require("dotenv");
const {Client, GatewayIntentBits, Events} = require("discord.js");
const getMeme = require("./utils/getMeme");


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
            msg.channel.send("You are now subscribed to eye reminders.")
        
    }
});


client.login(process.env.CLIENT_TOKEN);