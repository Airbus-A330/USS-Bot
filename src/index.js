const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const db = require('quick.db');
const fs = require('fs');

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
        const statuses = config.statuses;
        const index = Math.floor(Math.random() * (statuses.length));
        client.user.setActivity(statuses[index], ({ type: "PLAYING" }));
    }, 10000);
    client.user.setStatus('idle')
});

client.on('message', message => {
    if (!message.guild) return;
    let prefix = db.get(`prefix`);
    if (prefix === null) prefix = config.dp;
    if (!message.content.startsWith(prefix) || message.author.bot) {
        if (message.mentions.users.first() === client.user) {
            message.channel.send('Ughhhhh <@559200051629654026> they\'re asking for my nudes again. Can you tell them to shoo pls\n\n||For legal reasons, just like my developer this is a joke||');
        } else return;
    }

    let args = message.content.slice(prefix.length).trim().split(/ +/);
    let commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName)

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

client.login(config.token)