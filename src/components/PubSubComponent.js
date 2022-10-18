import React from 'react'
import { Amplify, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import { Button } from '@aws-amplify/ui-react';

// Apply plugin with configuration
Amplify.addPluggable(new AWSIoTProvider({
    aws_pubsub_region: 'us-east-1',
    aws_pubsub_endpoint: 'wss://a2rp31ygijg2cs-ats.iot.us-east-1.amazonaws.com/mqtt'
}))

PubSub.subscribe('myTopic').subscribe({
    next: data => {
      console.log('Message received', data)
      alert(data.value.msg)
    },
    error: error => console.error(error),
    complete: () => console.log('Done'),
});

const pub = async (message) => {
  await PubSub.publish('myTopic', { msg: message })
}


const PubSubComponent = () => {
  return (
    <div>
    <Button
      isFullWidth={true}
      variation="primary"
      onClick={() => pub("Hola Mundo!")}
    >Greet</Button>
    </div>
  )
}

export default PubSubComponent