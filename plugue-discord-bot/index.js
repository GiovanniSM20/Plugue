const app = require('./config/express');

const client = require('./config/discord');

const token = process.env.PLUGUE_DISCORD_BOT;

app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
	res.send('Discord bot')
})

app.listen(app.get('port'), function() {
	console.log('Server running on port', app.get('port'))
})

client.login(token);