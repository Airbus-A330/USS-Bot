const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'get info on  user',
    execute (client, message, args) {
        let user = message.mentions.users.first();
        message.channel.send(user);
        if (!user) {
            if (!Number.isNaN(args[0])) {
                user = message.guild.users.cache.get(args[0]);
                message.channel.send(user);
            }
        }
    }
}