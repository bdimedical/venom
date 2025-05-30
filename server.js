const { create } = require('venom-bot');
const axios = require('axios');

const N8N_WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://adminmedical.app.n8n.cloud/webhook-test/lab'; // Reemplázalo por tu URL real

create({
  session: 'session-exams',
  multidevice: true,
})
  .then((client) => start(client))
  .catch((err) => console.error(err));

function start(client) {
  client.onMessage(async (message) => {
    // Solo respondemos mensajes de texto normales
    if (message.body && message.isGroupMsg === false) {
      console.log('Mensaje recibido:', message.body);

      // Enviar el mensaje a n8n vía Webhook
      try {
        await axios.post(N8N_WEBHOOK_URL, {
          from: message.from,
          text: message.body,
        });
        console.log('Mensaje enviado a n8n');
      } catch (error) {
        console.error('Error enviando a n8n:', error.message);
      }
    }
  });
}
