const { create } = require('venom');
const axios = require('axios');

create({
  session: 'exam-bot',
  multidevice: true
})
.then((client) => start(client))
.catch((err) => console.log(err));

function start(client) {
  client.onMessage(async (message) => {
    if (message.isGroupMsg === false && message.body) {
      const webhookURL = 'https://tuservidor.n8n.cloud/webhook/whatsapp-exam';
      await axios.post(webhookURL, {
        from: message.from,
        body: message.body
      });
    }
  });
}
