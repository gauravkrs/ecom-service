const { connectToRabbitMQ } = require("../config/rabbitmqService");

const publishEvents = async (event, routesName, message) => {
  try {
    const { channel } = await connectToRabbitMQ();
    await channel.publish(event, routesName, Buffer.from(message));
    await channel.close();
  } catch (error) {
    console.log("Error while publishing event", error);
    throw error;
  }
};

module.exports = {publishEvents};
