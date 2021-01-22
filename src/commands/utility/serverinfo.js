const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'get info on the server',
    execute (client, message, args) {
        let server = message.guild;

        const serverInfo = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Info about ${server.name}`)
            .setThumbnail(`${server.iconURL({ format: 'png', dynamic: true })}`)
            .addFields(
                { name: 'Server Owner', value: `${server.ownerID}`, inline: true },
                { name: 'Server ID', value: `${server.id}`, inline: true },
                { name: 'Member Count', value: `${server.memberCount}`, inline: true },
                { name: 'Role Count', value: `${server.roles.cache.size}`, inline: true },
                { name: 'Boost Count | Level', value: `${server.premiumSubscriptionCount} | Level ${server.premiumTier}`, inline: true },
                { name: 'Created At', value: `${server.createdAt.toLocaleDateString()}, at ${server.createdAt.toLocaleTimeString()}`, inline: true },
                { name: 'Max Members', value: `${server.maximumMembers}`, inline: true }
            )
        message.channel.send(serverInfo)
    }
}