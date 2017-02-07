'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(3000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Embarrassing Slack Bot');
});

app.post('/', (req, res) => {
  let text = req.body.text;
  console.log(text);
  let data;
  
  if (text == 'frosh') {
    data = {
      response_type: 'in_channel', // public to channel
      text: 'look at ' + text,
      attachments: [
        {
          'image_url': 'http://9c0b4c7c.ngrok.io/images/frosh.JPEG',
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
