import { GUIFactory } from './GUIFactory';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { MacButton } from './MacButton';
import { MacCheckbox } from './MacCheckbox';

export class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }
  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}
