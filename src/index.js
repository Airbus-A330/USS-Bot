const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const db = require('quick.db');
const fs = require('fs');

client.commands = new Map()

fs.readdirSync(__dirname + `/commands`).forEach(folder => {
    fs.readdirSync(__dirname + `/commands/${folder}`).forEach(file => {
        const command = require(__dirname + `/commmands/${folder}/${file}`);
        client.commands.set(command.name, command);
    })
})

client.on('ready', () => {
    console.log(`Ready! Logged in as - ${client.user.tag}`);
    setInterval(() => {
        const statuses = config.statuses;
        const index = Math.floor(Math.random() * (statuses.length - 1) + 1);
        client.user.setActivity(statuses[index], ({ type: "PLAYING" }));
    }, 10000);
    client.user.setStatus('idle')
});

client.on('message', message => {
    if (!message.guild) return;
    let prefix = db.get(`prefix`);
    if (prefix === null) prefix = config.dp;
    if (!message.startsWith(prefix) || message.author.bot) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/);
    let commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;

    client.commands.get(commandName).execute(client, message, args);
});

client.login(config.token)