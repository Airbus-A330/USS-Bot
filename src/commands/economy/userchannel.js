const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'userchannel',
    description: 'options for the user economy channels',
    async execute (client, message, args) {
        if (!message.author.id === '559200051629654026') return;
        let character = message.author;
        let option = args[0];
        let econChannel = db.get(`${message.author.id}.econChannelID`);

        // Create channel -------------------------
        if (option === 'create') {
            if (!db.get(`${message.author.id}.econChannelID`)) {
                let econChannel = message.guild.channels.create(`${message.author.username}-businesses`, {
                    type: 'text',
                    permissionOverrides: [
                        {
                            id: message.author.id,
                            allow: ['MANAGE_MESSAGES'],
                        },
                    ],
                }).then(channel => {
                    let category = message.guild.channels.cache.find(c => c.id === '738079217513791578' && c.type === 'category');
                    channel.setParent(category.id);
                    db.set(`${message.author.id}.econChannelID`, channel.id);
                    message.channel.send(`Channel set to <#${db.get(`${message.author.id}.econChannelID`)}>`);
                }).catch(console.error)
            
            } else {
                const alreadyHasChannel = new Discord.MessageEmbed()
                    .setColor('$RANDOM')
                    .setDescription(`You already have a businesses channel! Hyperlink: <#${db.get(`${message.author.id}.econChannelID`)}>`)
                return message.channel.send(alreadyHasChannel)
            }
        
        // Delete channel + confirmation -------------------------
        } else if (option === 'delete') {
            if (message.channel.id === db.get(`${message.author.id}.econChannelID`)) {
                let botMsg = await message.channel.send('Please react below to confirm the deletion');
                botMsg.react('👍')

                const filter = (reaction, user) => {
                    return reaction.emoji.name === '👍' && user.id === message.author.id;
                };

                botMsg.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
                    .then(collected => {
                        if (collected.size === 1) {
                            message.channel.delete();
                            db.delete(`${message.author.id}.econChannelID`);
                        }
                    });
            }
        }
    },
}