module.exports = {
    name: "shutdown",
    alias: ["stop", "ايقاف"],
    run: async function(client, message) {
        if(!client.owners.includes(message.author.id)) return message.channel.send("Owners Only");
        try {
            await message.channel.send("جاري الايقاف");
            process.exit(1);
        } catch(err) {
            return message.channel.send(e.message); 
        }
    }
}