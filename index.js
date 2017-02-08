'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.load();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const VERIFY_TOKEN = process.env.SLACK_VERIFY_TOKEN;
const PORT = process.env.PORT;

if (!VERIFY_TOKEN) {
  console.error('SLACK_VERIFY_TOKEN is required');
}

if (!PORT) {
  console.error('PORT is required');
  process.exit(1);
}

const server = app.listen(PORT, (err) => {
  if (err) {
    return console.error('Error starting server: ', err);
  }

  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Embarrassing Slack Bot');
});

app.post('/', (req, res) => {
  let text = req.body.text;
  let data;

  if (req.body.token !== VERIFY_TOKEN) {
    return res.sendStatus(401);
  }
  
  if (text == 'frosh') {
    data = {
      response_type: 'in_channel', // public to channel
      text: 'look at ' + text,
      attachments: [
        {
          'image_url': 'https://embarrassing-bot.herokuapp.com/images/frosh.JPEG',
        }
      ]
    };
  } else {
    data = {
      response_type: 'in_channel',
      text: 'sorry bromigo, no pics yet',
    };
  }

  res.json(data);
});
