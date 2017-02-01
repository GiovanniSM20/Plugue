const discord = require('discord.js');
const client = new discord.Client();


client.on('ready', () => {
	console.log('The bot is alive!');
});

client.on('message', message => {
	if (message.content.toLowerCase() === '/ping') {
		message.reply('pong');
	}
});

client.on('message', message => {
	if (message.content.toLowerCase() === '/status') {
		message.reply("Is everything all right for now. o/");
	}
});

module.exports = client;