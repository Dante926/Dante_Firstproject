// util/rabbitmq/consumer.js
require('dotenv').config();
const amqp = require('amqplib');

async function startConsumer() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    const queue = 'user.created';
    await channel.assertQueue(queue, { durable: true });

    console.log(`[RabbitMQ] Listening to queue: ${queue}`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        console.log('[RabbitMQ] Received message:', content);

        // 可以在这里做数据库写入、日志、邮件等

        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error('[RabbitMQ Consumer Error]', err);
    setTimeout(startConsumer, 5000); // 自动重连
  }
}

module.exports = { startConsumer };
