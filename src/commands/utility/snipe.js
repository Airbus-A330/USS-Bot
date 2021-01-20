const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'snipe',
    description: 'snipe the last deleted message',
    execute (client, message, args) {
        let content = db.get(`snipe.content`);
        let authorIcon = db.get(`snipe.authorIcon`);
        let authorName = db.get(`snipe.authorName`);
        let channelID = db.get(`snipe.channel`);
        if (!channelID === message.channel.id) {
            const noID = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription('There are no messages to snipe in this channel!')
            return message.channel.send(noID)
        }

        const snipeEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(authorName, authorIcon)
            .setDescription(content + `\n---\n<#${channelID}>`)
            .setTimestamp()
        message.channel.send(snipeEmbed)
    }
}