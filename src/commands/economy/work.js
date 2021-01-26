const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'work',
    aliases: ['w'],
    cooldown:  30,
    description: 'work for some money',
    execute (client, message, args) {
        let user = message.author;

        var responses = [
            "You worked at your minimum-wage job and earned",
            "You mowed lawns and earned",
            "You worked as a working-class American and earned"
        ]
        
        const whichResponse = Math.floor(Math.random() * (responses.length));
        let response = responses[whichResponse];

        let balance = db.get(`${user}.balance`);
        if (balance === null || balance === undefined) balance = 0;
        let newBal = Math.round(Math.random() * 100);

        let combinedBal = balance + newBal;
        db.set(`${user}.balance`, combinedBal)

        const workEmbed = new Discord.MessageEmbed()
            .setColor('#09ff00')
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`)
            .setDescription(`${response} :moneybag:${newBal}. You now have :moneybag:${combinedBal}`)
        message.channel.send(workEmbed)
    }
}