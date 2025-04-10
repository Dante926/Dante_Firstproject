const { sendToQueue } = require('./rabbitmq')

const RabbitMQQueue = {
  sendUserQueue: async function (userData) {
    try {
      await sendToQueue('user.created', userData);
    } catch (err) {
      console.error('[RabbitMQQueue Error]', err);
    }
  },
};

module.exports = RabbitMQQueue;
