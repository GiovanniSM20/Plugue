# plugue-discord-bot

# TODO
- Make a simple web page to added commands to bot.
- Added to the web page a mode to added dates.
- Added RegEx logic.

### Discord.js 
- The moudule is most easy then the messenger, you can see.
``` javascript
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
```

Then the client.on () method receives the parameter of what kind of input will be given, in the case below it is of the message type. In the conditional, if the content of the message is as desired, a response will be given.
``` javascript 
  client.on('message', message => {
	if (message.content === '/user-input') {
		message.reply('bot-response');
	}
});
```
