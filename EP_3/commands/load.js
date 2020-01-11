module.exports = {
    name: "load",
    alias: ["l"],
    run: function(client, message) {
        if(!client.owners.includes(message.author.id)) return message.channel.send("Owners Only");
        let args = message.content.split(" ").slice(1).join(" ")
        if(!args) return message.channel.send(`${client.prefix}load <command>`);
        if(client.commands.has(args)) return message.channel.send("Command Is Already loaded");
        try {
            let command = require("./" + args);
            client.commands.set(args, command)
            command.alias.forEach(alias => {
                client.alises.set(alias, command);
            });
        } catch(e) {
            return message.channel.send(e.message);
        }
        message.channel.send("`"+args+"` loaded!");
    }
}