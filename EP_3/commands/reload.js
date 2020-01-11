module.exports = {
    name: "reload",
    alias: ["refresh"],
    run: function(client, message) {
        if(!client.owners.includes(message.author.id)) return message.channel.send("Owners Only");
        let args = message.content.split(" ").slice(1).join(" ");
        // Hello World => [Hello, World, Codes, Rokz]
        //                  0       1      2     3
        if(!args) return message.channel.send(`${client.prefix}reload <command>`);
        if(!client.commands.has(args)) return message.channel.send("Command Not Found");
        try {
            delete require.cache[require.resolve(`./${args}.js`)];
            client.commands.delete(args);
            let command = require("./" + args);
            client.commands.set(args, command)
            command.alias.forEach(alias => {
                client.alises.delete(alias);
                client.alises.set(alias, command);
            });
        } catch(e) {
            return message.channel.send(e.message);
        }

        message.channel.send(`\`${args}\` Reloaded.`);
    }
}