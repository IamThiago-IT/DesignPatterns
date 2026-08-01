import { Target } from './Target';
import { Adaptee } from './Adaptee';

export class Adapter implements Target {
  constructor(private adaptee: Adaptee) {}

  public request(): string {
    const result = this.adaptee.specificRequest();
    // 'Traduz' a resposta do Adaptee para o formato esperado pelo Target
    return `Adapter: (translated) ${result.split('').reverse().join('')}`;
  }
}
