const amqp = require('amqplib');

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel();
        return {connection, channel};
    } catch (error) {
        console.log('Error connecting to RabbitMQ', error);
        throw error;
    }
}

module.exports= connectToRabbitMQ
