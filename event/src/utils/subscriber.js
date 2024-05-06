const { connectToRabbitMQ } = require("../config/rabbitmqService");

const subscribers = async (event, queue, routesName, callback) => {
  try {
    const { channel } = await connectToRabbitMQ();
    await channel.assertExchange(exchange, "topic", { durable: true });
    const assertQueue = await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, event, routesName);

    channel.consume(assertQueue.queue, (message) => {
      const data = JSON.parse(message.content.toString());
      callback(data);
      channel.ack(message);
    });
  } catch (error) {
    console.log("Error subscribing to event: " + error.message);
    throw error;
  }
};

module.exports = { subscribers };
