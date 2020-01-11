module.exports = {
    name: "say",
    alias: ["s", "echo"],
    run: function(client, message) {
        let args = message.content.split(" ").slice(1).join(" ")
        message.channel.send(args);
    }
}