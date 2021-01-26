const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    // name: 'addmoney',
    description: 'work for some money',
    execute (client, message, args) {
        let user = message.mentions.users.first();
        // let user = `<@${getUser}>`;

        let balance = db.get(`${user}.balance`);
        if (!balance) db.set(`${user}.balance`, 0);
        let newBal = args.slice(args[1].length);
        let addedBal = balance + newBal;
        if (Number.isNaN(addedBal)) {
            message.channel.send('Do you really think that\'s a number, idiot?');
        }

        console.log(addedBal);
        db.set(`${user}.balance`, addedBal)
        let combinedBal = db.get(`${user}.balance`);

        const addEmbed = new Discord.MessageEmbed()
            .setColor('#09ff00')
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`)
            .setDescription(`${message.author} gave ${user} :moneybag:${newBal}. You now have :moneybag:${combinedBal}`)
        message.channel.send(addEmbed)
    }
}