import { Button } from './Button';
import { Checkbox } from './Checkbox';

export interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}
