// util/rabbitmq/rabbitmq.js
require('dotenv').config();
const amqp = require('amqplib');

let channel = null;
let connection = null;

async function connectRabbitMQ() {
  if (channel) return channel;

  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('user.created', { durable: true });

    // console.log('[RabbitMQ] Connected and Queue asserted');

    connection.on('error', (err) => {
      console.error('[RabbitMQ] Connection error', err);
      channel = null;
    });

    connection.on('close', () => {
      console.warn('[RabbitMQ] Connection closed, retrying in 5s...');
      channel = null;
      setTimeout(connectRabbitMQ, 5000); // 自动重连
    });

    return channel;
  } catch (err) {
    console.error('[RabbitMQ] Initial connect failed:', err);
    setTimeout(connectRabbitMQ, 5000); // 延迟重试
  }
}

async function sendToQueue(queue, message) {
  if (!channel) {
    await connectRabbitMQ(); // 连接不存在就重连
  }
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
  console.log(`[RabbitMQ] Message sent to ${queue}:`, message);
}

module.exports = {
  connectRabbitMQ,
  sendToQueue,
};
