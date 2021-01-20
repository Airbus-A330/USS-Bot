const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'snipe',
    description: 'snipe the last deleted message',
    execute (client, message, args) {
        let content = db.get(`snipe.content`);
        let authorIcon = db.get(`snipe.authorIcon`);
        let authorName = db.get(`snipe.authorName`);

        const snipeEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(authorName, authorIcon)
            .setDescription(content)
            .setTimestamp()
        message.channel.send(snipeEmbed)
    }
}