const discord = require("discord.js");
const client = new discord.Client();
require('dotenv').config();
const guild = new discord.Guild(client);

const embed = {
    info: require("./Messages/info"),
}
const prefix = "S-"
client.on("ready", () => {
    console.log("Ready to start servers.");
});

function catchErr (err, message) {
  message.channel.send ("there was an error @" + message.channel, "in guild" + message.guild);
  message.channel.send ("Here is the Error. ```" + err + "```");
  console.log("an error occured while running." + err + "try to fix this ASAP." )
}

function createChannel (guild, message, args) {
  message.guild.channels.create(args[1], {
    type: 'text',
    permissionOverwrites: [
        {
            id: message.guild.id,
            allow: ['VIEW_CHANNEL'],
        }]
    })
          return message.channel.send("Creating Channel:" + args[1]);
}

client.on('shardError', error => {
  console.error('A websocket connection encountered an error:', error);
});

client.on("message", (message) => {
try {
  if ( message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd === "info") {
        return message.channel.send({embed: embed.info.embed });
    }

    if (cmd === "restart") {
      message.channel.send("Restarting...");
      return bot.destroy();
    }

    if (cmd === "channel") {
        if (args.length < 1) return message.channel.send("> S-channel (Create / Delete) (Channel Name)");
        
        switch (args[0]) {
                
          case "create":
            if (client.textChannel === args[1]) {
                return message.channel.send("> ERROR: Unable to Create, Channel Already Exists.");
            }
            else {
              createChannel(guild, message, args);
            };
        default:
          //This Deals a case where no Channel Name Was Given.
          break;
        }
    }

    
  }
  catch (err) {
    catchErr(err, message);
  }
  });

  

client.login(process.env.token);