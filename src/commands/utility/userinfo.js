const Discord = require("discord.js");

module.exports = {
    name: 'userinfo',
    description: 'get info on a user',
    execute (client, message, args) {
        let member = message.mentions.members.first();
        if (!member) {
            if (!Number.isNaN(args[0])) {
                member = message.guild.members.cache.get(`${args[0]}`);
            }
        }
        if (!member) {
            const noUser = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription('Please give a valid mention or userID!')
            return message.channel.send(noUser)
        }
//        let user = userID.id;
        console.log(member);

        const userInfo = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Userinfo - ${member.user.tag}`)
            .setThumbnail(`${member.user.displayAvatarURL({ format: 'png', dynami: true })}`)
            .addFields(
                { name: 'Tag', value: `${member.user.username}#${member.user.discriminator}`, inline: true },
                { name: 'Mention', value: `${member}`, inline: true },
                { name: 'UserID', value: `${member.id}`, inline: true },
                { name: 'Joined', value: `${member.joinedAt.toLocaleDateString()}, at ${member.joinedAt.toLocaleTimeString()}`, inline: true },
                { name: 'Created', value: `${member.user.createdAt.toLocaleDateString()}, at ${member.user.createdAt.toLocaleTimeString()}`, inline: true },
            )
            .addField('Roles', `${member.roles.cache.map(role => role.toString()).join(',')}`, false)
            .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`)
        message.channel.send(userInfo)
    },
}