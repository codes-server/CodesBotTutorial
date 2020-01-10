const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");

let prefix = "!"
//!ping
//#ping


client.commands = new Discord.Collection();
client.alises = new Discord.Collection();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  fs.readdir("./commands/", (error, files) => {
    if(error) throw error;
    files.forEach(file => {
      let commandName = file.split(".js")[0]
      let command = require("./commands/" + commandName)
      client.commands.set(commandName, command);
      command.alias.forEach(alias => {
        client.alises.set(alias, command);
      });
    });
  });

});

client.on('message', message => {
  
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let commandName = args.shift().toLowerCase();

  try {
    let command = require("./commands/" + commandName + ".js");
    if(!command) return;
    client.commands.get(commandName).run(client, message);
  } catch(error) {
    if(client.alises.get(commandName)) {
      client.alises.get(commandName).run(client, message);
    } else return;
  }
});

client.login(config.token);