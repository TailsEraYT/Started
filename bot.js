const discord = require("discord.js");
const client = new discord.Client();
require('dotenv').config();
const embed = {
    info: require("./Messages/info"),
}
const prefix = "S-"
client.on("ready", () => {
    console.log("Ready to start servers.");
});

client.on("message", async message=>0);{
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd === info) {
        message.channel.send({embed: embed.info.embed });
    }

    if (cmd === channel) {
        if (args.length < 1) return message.channel.send("> S-channel (Create / Delete) (Channel Name)");
        
        switch (args[0]) {
                
            case "list":
            if (args.length > 1) {
              switch (args[1]) {
                case "1":
                    var server = message.guild;
                    var ChannelName = args[3];
                    if (client.textChannel === args[3]) {
                        return message.channel.send("> ERROR: Unable to Create, Channel Already Exists.");
                    }
                    else {
                    server.createChannel(args[3], "text");
                  return message.channel.send("Creating Channel:", ChannelName);
                    };
                default:
                  //This Deals a case where no Channel Name Was Given.
                  break;
              }
            } else {
              return message.channel.send("> No Name Selected, Unable to continue.");
            }`  `
            break;
          default:
            return message.channel.send("> Unknown Argument. Are you sure you did this correctly?");
        }
    }

};

client.login(process.env.token);