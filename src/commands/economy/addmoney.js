const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'addmoney',
    description: 'work for some money',
    execute (client, message, args) {
        let user = message.mentions.users.first().id;

        let balance = db.get(`${user}.balance`);
        let newBal = args.slice(args[1].length) + balance;
        if (Number.isNaN(newBal)) {
            message.channel.send('Do you really think that\'s a number, idiot?');
        }

        console.log(newBal);
        db.set(`${user}.balance`, newBal)
        let combinedBal = db.get(`${user}.balance`);

        const addEmbed = new Discord.MessageEmbed()
            .setColor('#09ff00')
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`)
            .setDescription(`${message.author} gave ${user} :moneybag:${newBal}. You now have :moneybag:${combinedBal}`)
        message.channel.send(addEmbed)
    }
}