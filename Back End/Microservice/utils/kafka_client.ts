import { Kafka } from 'kafkajs'

export const kafka_client = new Kafka({
  clientId: 'devxp-kafka',
  brokers: ['192.168.1.40:9092'],
})

export const producer = kafka_client.producer();
// const consumer = kafka_client.consumer();

export async function initKafka() {
  await producer.connect();
  console.log("producer connected")
}