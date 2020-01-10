module.exports = {
    name: "ping",
    alias: ["p", "pong"],
    run: function(client, message) {
        message.channel.send("Pong! " + Math.round(client.ping) + "ms")
    }
}