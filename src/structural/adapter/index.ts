import { Target } from './Target';
import { Adaptee } from './Adaptee';
import { Adapter } from './Adapter';

function clientCode(target: Target) {
  console.log(target.request());
}

console.log('Client: I can work with the Target interface.');
const normalTarget: Target = { request: () => 'Client: default target response.' };
clientCode(normalTarget);

console.log('\nClient: The Adaptee has a weird interface:');
const adaptee = new Adaptee();
console.log(adaptee.specificRequest());

console.log('\nClient: But I can use the Adapter to work with it:');
const adapter = new Adapter(adaptee);
clientCode(adapter);
