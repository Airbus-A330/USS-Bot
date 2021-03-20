const Discord = require('discord.js');
const { dp, statuses, token } = require('./config.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const db = require('quick.db');
const fs = require('fs');
require("dotenv").config();

const cooldowns = new Discord.Collection();
client.commands = new Map()

fs.readdirSync(__dirname + `/commands`).forEach(folder => {
    fs.readdirSync(__dirname + `/commands/${folder}`).forEach(file => {
        const command = require(__dirname + `/commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    })
})

client.on('ready', () => {
    console.log(`Ready! Logged in as - ${client.user.tag}`);
    setInterval(() => {
        const statuses = statuses;
        const index = Math.floor(Math.random() * (statuses.length));
        client.user.setActivity(statuses[index].status, ({ type: statuses[index].type, url: statuses[index].url }));
    }, 10000);
    client.user.setStatus('idle')
});

client.on('message', message => {
    if (!message.guild) return;
    let prefix = db.get(`prefix`);
    if (prefix === null) prefix = dp;
    if (!message.content.startsWith(prefix) || message.author.bot) {
        if (message.mentions.users.first() === client.user) {
            message.channel.send('I hate to break it to you but as of now I am completely useless so yeah. I\'m in-development, if you have questions ask my boss/developer, <@559200051629654026>. (I don\'t like him but I have to listen to him so yeah)');
        } else return;
    }

    let args = message.content.slice(prefix.length).trim().split(/ +/);
    let commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = Math.floor(command.cooldown) * 60000;

    let user = message.author;
    if (db.has(`${user}.cooldown`)) {
    const expirationTime = db.get(`${user}.cooldown`) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 60000;

            const cooldownEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setDescription(`You must wait ${timeLeft.toFixed()} minutes before using that command again!`)
            return message.channel.send(cooldownEmbed)
        }
    }
    
    db.set(`${user}.cooldown`, now);
    setTimeout(() => db.delete(`${user}.cooldown`), cooldownAmount);

    command.execute(client, message, args);
});

client.on('messageDelete', async (message) => {
    db.set(`snipe.content`, message.content);
    db.set(`snipe.authorName`, message.author.tag);
    db.set(`snipe.authorIcon`, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
    db.set(`snipe.channel`, message.channel.id);
});

client.login(token).catch(console.error);
