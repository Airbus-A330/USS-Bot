module.exports = {
    name: 'ping',
    description: 'ping the bot server',
    async execute (client, message, args) {
        let pingMsg = await message.channel.send('Pinging...');
        pingMsg.edit(`Ping: \`\`${pingMsg.createdAt - message.createdAt}ms\`\``).catch(() => pingMsg.edit('Welp, I ran into an error. Try again in a bit'));
    },
}