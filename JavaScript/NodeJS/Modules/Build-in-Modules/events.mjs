import EventEmitter from 'events';

const customemitter =new EventEmitter

customemitter.on('response', (name,age) => {//addeventlistener on respone
    console.log(`data received with ${name} & ${age}`);
});

customemitter.emit('response','sid',24); //function calling so that addeventlistener is emitted

//usually we dont make our own events as many are built in