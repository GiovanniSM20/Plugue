'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Index.
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot, bots will control the world')
})

// Facebook verification.
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// To post data
app.post('/webhook/', function (req, res) {
	
	let messaging_events = req.body.entry[0].messaging
	
	for (let i = 0; i < messaging_events.length; i++) {
		
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		
		// Eventos de menssagens
		if (event.message && event.message.text) {
			let text = event.message.text
			
			// Menssagem de saudação, expressão regular para detectar as palavras mais comuns de saudação.
			if (text.match(/^ola|oi|hi/gi)) {
				sendTextMessage(sender, "Olá, meu nome é Bot Plugue. Muito prazer! Sou seu assistente digital para tirar todas as suas dúvidas sobre nosso trabalho com muito mais praticidade e agilidade. Pode me chamar sempre que precisar e a qualquer hora do dia! Veja como posso te ajudar");
				sendHelloMessage(sender);
				continue
			}

			// Menssagem direta para listar os workshops atuais.
			if (text.match(/^workshop|oficina|eventos/gi)) {
				sendTextMessage(sender, "Nós temos os seguintes eventos disponíveis:")
				sendEventMessage(sender)
				continue
			}
		} else if (event.postback && event.postback.payload) {
				sendTextMessage(sender,event.postback.payload, token)
				continue
		}
	}

	res.sendStatus(200)
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.PAGE_ACCESS_TOKEN
const token = process.env.PLUGUE_PAGE_ACCESS_TOKEN

function sendTextMessage(sender, text) {
	let messageData = { text:text }

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendEventMessage(sender) {
	let messageData = {
      "attachment": 
      {
          "type": "template",
          "payload": 
          {
            "template_type": "generic",
            "elements": 
            [{
              "title": "Workshop de Arduino",
              "subtitle": "Arduino que vai te ajudar a dar um start na sua mente!",
              "image_url": "http://blog.fazedores.com/wp-content/uploads/2014/08/arduino-sensor-ultrassonico-display-lcd-close.jpg",
              "buttons": 
              [{
                  "type": "web_url",
                  "url": "https://www.facebook.com/events/1802161933385470/",
                  "title": "Ver evento"
              }],
          }, {
              "title": "Workshop Produção de Jogos",
              "subtitle": "Workshop sobre produção de jogos que vai te ajudar a dar um start na produção!",
              "image_url": "https://problemspersonalcomputerlp.files.wordpress.com/2015/04/the-games-logo-272khb4.jpg",
              
              "buttons":
              [{
                "type": "web_url",
                "url": "https://www.facebook.com/events/1364221003622074/",
                "title": "Ver evento"
              }],
            }]
          }      
    	}
  }

  request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
          recipient: {id:sender},
          message: messageData,
      }
  }, function(error, response, body) {
      if (error) {
          console.log('Error sending messages: ', error)
      } else if (response.body.error) {
          console.log('Error: ', response.body.error)
      }
  })
}

function sendHelloMessage(sender) {
	let messageData = {
      "attachment": 
      {
          "type": "template",
          "payload": 
          {
              "template_type": "generic",
              "elements": 
              [{
                  "title": "Confira nossos eventos:",
                  "image_url": "https://scontent.fgig4-1.fna.fbcdn.net/v/t1.0-9/15267755_252797638468603_6919513512972390199_n.jpg?oh=ef2dcd446f84f89033d0b083da1c32e6&oe=5911E065",
                  "buttons": 
                  [{
                      "type":"postback",
							        "title":"Eventos",
							        "payload": "Helo"
                  }],
              }, {
                  "title": "Saiba mais sobre a Plugue",
                  "image_url": "https://scontent.fgig4-1.fna.fbcdn.net/v/t1.0-9/15380535_258892964525737_3738853218412445528_n.jpg?oh=9cb7b99616bfbb3ef5c68fc75d950be9&oe=5917AA6C",
                  "buttons": [{
                      "type": "web_url",
        							"title":"Sobre",
							        "url": "https://plugue.github.io"
                  }],
              }]
          }
      }
  }

  request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
          recipient: {id:sender},
          message: messageData,
      }
  }, function(error, response, body) {
      if (error) {
          console.log('Error sending messages: ', error)
      } else if (response.body.error) {
          console.log('Error: ', response.body.error)
      }
  })
}

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
//github <!--!>
