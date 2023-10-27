const dotenv = require("dotenv");
const {Client, GatewayIntentBits, Events} = require("discord.js");

dotenv.config();

const client = new Client({ intents: [ 
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent 
] });

client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag} !`);
});


client.on(Events.MessageCreate, msg => {
    if(msg.content === 'ping'){
        msg.reply("Pong");
    }
});



client.login(process.env.CLIENT_TOKEN);