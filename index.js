'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const VERIFY_TOKEN = process.env.SLACK_VERIFY_TOKEN;
if (!VERIFY_TOKEN) {
  console.error('SLACK_VERIFY_TOKEN is required');
}

const server = app.listen(3000, (err) => {
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
          'image_url': 'http://08242dbf.ngrok.io/images/frosh.JPEG',
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
