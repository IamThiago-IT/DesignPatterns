import { GUIFactory } from './GUIFactory';

export function clientCode(factory: GUIFactory): string[] {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  return [button.render(), checkbox.paint()];
}
