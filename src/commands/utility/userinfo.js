module.exports = {
    name: 'userinfo',
    description: 'get info on a user',
    execute (client, message, args) {
        let user = message.mentions.users.first();
        message.channel.send(user);
    },
}

/*
        let user = message.mentions.users.first();
        message.channel.send(user);
        if (!user) {
            if (!Number.isNaN(args[0])) {
                user = message.guild.users.cache.get(args[0]);
                message.channel.send(user);
            }
        }
*/