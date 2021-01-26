const Discord = require('discord.js');

module.exports = {
    name: 'emmanuel',
    description: 'custom commamd',
    execute (client, message, args) {
        let percent = Math.floor(Math.random() * 100);
        console.log(percent);
        
        message.channel.send(`Based on recent nonexistent polling we give Emmanuel a \`\`${percent}%\`\` chance of winning.`)
    },
};