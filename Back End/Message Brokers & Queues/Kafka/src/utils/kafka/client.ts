import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['192.168.29.234:9092'],
})

