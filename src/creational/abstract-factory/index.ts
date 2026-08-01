import { WindowsFactory } from './WindowsFactory';
import { MacFactory } from './MacFactory';
import { clientCode } from './Client';

function runDemo() {
  console.log('Abstract Factory: Windows family');
  const windows = new WindowsFactory();
  clientCode(windows).forEach((line) => console.log(line));

  console.log('\nAbstract Factory: Mac family');
  const mac = new MacFactory();
  clientCode(mac).forEach((line) => console.log(line));
}

runDemo();
