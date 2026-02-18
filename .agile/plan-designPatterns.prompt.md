# Plano Completo: 22 Padrões de Design

---

## CRIACIONAIS (4 restantes)

---

### 1. Abstract Factory — Fábrica de Móveis

**Tema:** Famílias de móveis em estilos diferentes (Moderno / Vintage)

**Arquivos:**
```
src/creational/abstract-factory/
├── index.ts
├── README.md
├── FurnitureFactory.ts      ← interface FurnitureFactory { createChair(), createTable() }
├── Chair.ts                 ← interface Chair { sitOn(): string }
├── Table.ts                 ← interface Table { putOn(): string }
├── ModernChair.ts           ← implements Chair
├── ModernTable.ts           ← implements Table
├── ModernFurnitureFactory.ts ← implements FurnitureFactory
├── VintageChair.ts          ← implements Chair
├── VintageTable.ts          ← implements Table
└── VintageFurnitureFactory.ts ← implements FurnitureFactory
```

**Conceito-chave:** O cliente (`furnishRoom(factory)`) recebe uma factory injetada e nunca sabe qual família concreta está usando. Diferente do Factory Method que cria **um** produto, aqui criamos **famílias** de produtos relacionados.

---

### 2. Singleton — Gerenciador de Configurações

**Tema:** Uma classe `AppConfig` que garante uma única instância global de configuração da aplicação.

**Arquivos:**
```
src/creational/singleton/
├── index.ts
├── README.md
└── AppConfig.ts
```

**Estrutura de `AppConfig.ts`:**
- Propriedade `private static instance: AppConfig`
- Construtor `private` (impede `new AppConfig()`)
- Método `static getInstance(): AppConfig`
- Propriedades: `appName`, `version`, `debug`
- Métodos: `get(key)`, `set(key, value)`, `showConfig()`

**`index.ts`:** Demonstra que `getInstance()` sempre retorna a mesma referência, mesmo chamado de lugares diferentes.

---

### 3. Builder — Construtor de Pizzas

**Tema:** Montagem passo-a-passo de uma `Pizza` com diferentes ingredientes.

**Arquivos:**
```
src/creational/builder/
├── index.ts
├── README.md
├── Pizza.ts                 ← classe Pizza (produto final)
├── PizzaBuilder.ts          ← interface PizzaBuilder { setMassa(), setMolho(), setCobertura(), build() }
├── MargheritaBuilder.ts     ← implements PizzaBuilder (receita de Margherita)
├── CalabreasaBuilder.ts     ← implements PizzaBuilder (receita de Calabresa)
└── Pizzaiolo.ts             ← Director: executa os steps na ordem certa
```

**Conceito-chave:** O `Pizzaiolo` (Director) chama os métodos do builder numa sequência definida. O builder encapsula a lógica de construção. O cliente pode usar o Director ou chamar o builder diretamente.

---

### 4. Prototype — Clonagem de Documentos

**Tema:** Clonar documentos (`Report`, `Spreadsheet`) sem depender de suas classes concretas.

**Arquivos:**
```
src/creational/prototype/
├── index.ts
├── README.md
├── Document.ts              ← interface Document { clone(): Document; print(): void }
├── Report.ts                ← implements Document (com título, conteúdo, autor)
└── Spreadsheet.ts           ← implements Document (com título, linhas, colunas)
```

**Conceito-chave:** Cada classe implementa `clone()` que retorna uma cópia profunda de si mesma. O `index.ts` clona um relatório, modifica a cópia e mostra que o original permanece intacto.

---

## ESTRUTURAIS (7)

---

### 5. Adapter — Adaptador de Tomadas

**Tema:** Um sistema que usa `TomadaBrasileira` (3 pinos) precisa se conectar a uma `TomadaAmericana` (2 pinos).

**Arquivos:**
```
src/structural/adapter/
├── index.ts
├── README.md
├── TomadaBrasileira.ts      ← interface { conectar(): string } — target
├── TomadaAmericana.ts       ← classe com plugIn(): string — adaptee (incompatível)
└── AdaptadorTomada.ts       ← implements TomadaBrasileira, encapsula TomadaAmericana
```

**Conceito-chave:** O `AdaptadorTomada` traduz a interface `plugIn()` para `conectar()`, permitindo que código que espera `TomadaBrasileira` use uma `TomadaAmericana`.

---

### 6. Bridge — Sistema de Notificações

**Tema:** Separar a **abstração** (tipo de notificação: Alerta, Lembrete) da **implementação** (canal: Email, SMS).

**Arquivos:**
```
src/structural/bridge/
├── index.ts
├── README.md
├── MessageSender.ts         ← interface { send(title, body): void } — implementação
├── EmailSender.ts           ← implements MessageSender
├── SmsSender.ts             ← implements MessageSender
├── Notification.ts          ← abstract class com MessageSender injetado — abstração
├── AlertNotification.ts     ← extends Notification
└── ReminderNotification.ts  ← extends Notification
```

**Conceito-chave:** `AlertNotification` pode usar `EmailSender` OU `SmsSender` sem mudar seu código. As duas hierarquias evoluem independentemente.

---

### 7. Composite — Sistema de Arquivos

**Tema:** Árvore de diretórios com `Arquivo` (folha) e `Pasta` (composição) que compartilham a mesma interface.

**Arquivos:**
```
src/structural/composite/
├── index.ts
├── README.md
├── FileSystemComponent.ts   ← interface { getName(), getSize(), print(indent) }
├── Arquivo.ts               ← implements FileSystemComponent (folha)
└── Pasta.ts                 ← implements FileSystemComponent (contém filhos)
```

**Conceito-chave:** `Pasta` contém uma lista de `FileSystemComponent` (pode ser `Arquivo` ou outra `Pasta`). O método `getSize()` soma recursivamente. `print()` exibe a árvore indentada.

---

### 8. Decorator — Cafeteria

**Tema:** Bebida base (`CafeSimples`) que pode ser decorada com extras (Leite, Chocolate, Chantilly).

**Arquivos:**
```
src/structural/decorator/
├── index.ts
├── README.md
├── Beverage.ts              ← interface { getDescription(): string, cost(): number }
├── CafeSimples.ts           ← implements Beverage (base)
├── BeverageDecorator.ts     ← abstract class implements Beverage, recebe Beverage no construtor
├── LeiteDecorator.ts        ← extends BeverageDecorator
├── ChocolateDecorator.ts    ← extends BeverageDecorator
└── ChantillyDecorator.ts    ← extends BeverageDecorator
```

**Conceito-chave:** Decoradores empilham: `new ChantillyDecorator(new LeiteDecorator(new CafeSimples()))`. Cada um adiciona descrição e custo sem alterar a classe original.

---

### 9. Facade — Sistema de Home Theater

**Tema:** Uma fachada `HomeTheater` que simplifica a interação com subsistemas complexos (TV, SoundBar, StreamingPlayer, Luzes).

**Arquivos:**
```
src/structural/facade/
├── index.ts
├── README.md
├── Tv.ts                    ← classe com ligar(), desligar(), setInput()
├── SoundBar.ts              ← classe com ligar(), desligar(), setVolume()
├── StreamingPlayer.ts       ← classe com ligar(), play(filme), parar()
├── Luzes.ts                 ← classe com diminuir(), aumentar()
└── HomeTheater.ts           ← Facade: assistirFilme(nome), desligarTudo()
```

**Conceito-chave:** O cliente chama apenas `homeTheater.assistirFilme("Matrix")` e a fachada orquestra todos os subsistemas na ordem correta.

---

### 10. Flyweight — Editor de Texto com Caracteres

**Tema:** Compartilhar objetos `CharacterStyle` (fonte, tamanho, cor) entre milhares de caracteres num editor de texto.

**Arquivos:**
```
src/structural/flyweight/
├── index.ts
├── README.md
├── CharacterStyle.ts        ← Flyweight: { font, size, color, render(char, position) }
├── CharacterStyleFactory.ts ← Flyweight Factory: cache de estilos compartilhados
└── Character.ts             ← Context: { value, row, col, style (ref compartilhada) }
```

**Conceito-chave:** A factory mantém um Map de estilos já criados. Ao pedir um estilo que já existe, retorna a referência compartilhada em vez de criar um novo objeto. O `index.ts` cria 1000 caracteres e mostra que apenas ~3 objetos de estilo são criados.

---

### 11. Proxy — Cache de API

**Tema:** Um proxy que adiciona cache a um serviço de consulta de CEP (`ViaCep`).

**Arquivos:**
```
src/structural/proxy/
├── index.ts
├── README.md
├── CepService.ts            ← interface { buscar(cep): Promise<Endereco> }
├── ViaCepService.ts         ← implements CepService (serviço real, simula latência)
├── CepServiceProxy.ts       ← implements CepService (proxy com cache Map)
└── Endereco.ts              ← type { cep, rua, bairro, cidade }
```

**Conceito-chave:** O proxy intercepta chamadas a `buscar()`. Se o CEP já foi consultado, retorna do cache. Senão, delega ao serviço real. O `index.ts` mostra a segunda consulta sendo instantânea.

---

## COMPORTAMENTAIS (11)

---

### 12. Chain of Responsibility — Suporte Técnico

**Tema:** Escalonamento de tickets de suporte (Nível 1 → Nível 2 → Gerente).

**Arquivos:**
```
src/behavioral/chain-of-responsibility/
├── index.ts
├── README.md
├── Ticket.ts                ← { description, severity: 'baixa' | 'media' | 'alta' | 'critica' }
├── SupportHandler.ts        ← abstract class { next?: SupportHandler, setNext(), handle(ticket) }
├── Level1Support.ts         ← extends SupportHandler (resolve 'baixa')
├── Level2Support.ts         ← extends SupportHandler (resolve 'media')
└── ManagerSupport.ts        ← extends SupportHandler (resolve 'alta' e 'critica')
```

**Conceito-chave:** Cada handler decide se processa ou passa adiante. O `index.ts` monta a cadeia e envia tickets com severidades diferentes.

---

### 13. Command — Controle Remoto

**Tema:** Um controle remoto universal que executa e desfaz comandos (ligar/desligar luz, ventilador).

**Arquivos:**
```
src/behavioral/command/
├── index.ts
├── README.md
├── Command.ts               ← interface { execute(): void, undo(): void }
├── Luz.ts                   ← receiver
├── Ventilador.ts            ← receiver
├── LigarLuzCommand.ts       ← implements Command
├── LigarVentiladorCommand.ts ← implements Command
└── ControleRemoto.ts        ← invoker: pressButton(), pressUndo()
```

**Conceito-chave:** O invocador (`ControleRemoto`) não conhece os receivers. Armazena histórico para `undo()`.

---

### 14. Interpreter — Calculadora de Expressões

**Tema:** Interpretar expressões matemáticas simples ("3 + 5 - 2").

**Arquivos:**
```
src/behavioral/interpreter/
├── index.ts
├── README.md
├── Expression.ts            ← interface { interpret(): number }
├── NumberExpression.ts       ← terminal: retorna o valor numérico
├── AddExpression.ts          ← non-terminal: left + right
├── SubtractExpression.ts     ← non-terminal: left - right
└── Parser.ts                ← converte string em árvore de Expression
```

---

### 15. Iterator — Playlist de Músicas

**Tema:** Iterar sobre uma coleção de `Musica` de forma sequencial e aleatória (shuffle).

**Arquivos:**
```
src/behavioral/iterator/
├── index.ts
├── README.md
├── Musica.ts                ← { titulo, artista, duracaoSegundos }
├── MusicIterator.ts         ← interface { hasNext(): boolean, next(): Musica, reset(): void }
├── SequentialIterator.ts    ← implements MusicIterator (ordem normal)
├── ShuffleIterator.ts       ← implements MusicIterator (ordem aleatória)
└── Playlist.ts              ← coleção com createSequentialIterator() e createShuffleIterator()
```

---

### 16. Mediator — Chat Room

**Tema:** Usuários se comunicam através de um `ChatRoom` (mediator) sem referências diretas entre si.

**Arquivos:**
```
src/behavioral/mediator/
├── index.ts
├── README.md
├── ChatMediator.ts          ← interface { sendMessage(msg, sender), addUser(user) }
├── ChatRoom.ts              ← implements ChatMediator
└── User.ts                  ← { name, mediator, send(msg), receive(msg, from) }
```

---

### 17. Memento — Editor de Texto com Undo

**Tema:** Salvar e restaurar estados de um editor de texto.

**Arquivos:**
```
src/behavioral/memento/
├── index.ts
├── README.md
├── EditorMemento.ts         ← classe imutável { content, timestamp }
├── TextEditor.ts            ← originator: write(), save(): Memento, restore(memento)
└── History.ts               ← caretaker: push(memento), undo(): Memento
```

---

### 18. Observer — Sistema de Newsletter

**Tema:** Assinantes recebem notificação quando um novo artigo é publicado no blog.

**Arquivos:**
```
src/behavioral/observer/
├── index.ts
├── README.md
├── EventManager.ts          ← subject: subscribe(), unsubscribe(), notify()
├── Subscriber.ts            ← interface { update(article): void }
├── EmailSubscriber.ts       ← implements Subscriber
├── SmsSubscriber.ts         ← implements Subscriber
└── Blog.ts                  ← usa EventManager, método publishArticle(title, content)
```

---

### 19. State — Máquina de Vendas (Vending Machine)

**Tema:** Uma máquina de vendas com estados: Aguardando Moeda → Moeda Inserida → Produto Dispensado.

**Arquivos:**
```
src/behavioral/state/
├── index.ts
├── README.md
├── VendingMachineState.ts   ← interface { insertCoin(), selectProduct(), dispense() }
├── IdleState.ts             ← implements VendingMachineState
├── HasCoinState.ts          ← implements VendingMachineState
├── DispensingState.ts       ← implements VendingMachineState
└── VendingMachine.ts        ← context: mantém state atual, delega chamadas
```

---

### 20. Strategy — Cálculo de Frete

**Tema:** Diferentes estratégias de cálculo de frete (Correios, Transportadora, Retirada).

**Arquivos:**
```
src/behavioral/strategy/
├── index.ts
├── README.md
├── FreteStrategy.ts         ← interface { calcular(peso, distancia): number }
├── CorreiosStrategy.ts      ← implements FreteStrategy
├── TransportadoraStrategy.ts ← implements FreteStrategy
├── RetiradaStrategy.ts      ← implements FreteStrategy (custo zero)
└── Pedido.ts                ← context: recebe FreteStrategy, calcularFrete()
```

---

### 21. Template Method — Geração de Relatórios

**Tema:** Classe abstrata define o esqueleto de geração de relatório (coletarDados → processar → formatar → exportar). Subclasses customizam etapas.

**Arquivos:**
```
src/behavioral/template-method/
├── index.ts
├── README.md
├── ReportGenerator.ts       ← abstract class com generate() template + hooks abstratos
├── PdfReport.ts             ← extends ReportGenerator
└── CsvReport.ts             ← extends ReportGenerator
```

---

### 22. Visitor — Formas Geométricas

**Tema:** Visitor que calcula área e desenha formas (Círculo, Retângulo) sem modificar suas classes.

**Arquivos:**
```
src/behavioral/visitor/
├── index.ts
├── README.md
├── Shape.ts                 ← interface { accept(visitor: ShapeVisitor): void }
├── Circle.ts                ← implements Shape (raio)
├── Rectangle.ts             ← implements Shape (largura, altura)
├── ShapeVisitor.ts          ← interface { visitCircle(c), visitRectangle(r) }
├── AreaCalculator.ts        ← implements ShapeVisitor (calcula área)
└── ShapeRenderer.ts         ← implements ShapeVisitor (desenha em ASCII)
```

---

## Resumo de Execução

| # | Padrão | Pasta | Tema | Arquivos |
|---|--------|-------|------|----------|
| 1 | Abstract Factory | `creational/abstract-factory` | Fábrica de Móveis | 10 |
| 2 | Singleton | `creational/singleton` | Config da App | 3 |
| 3 | Builder | `creational/builder` | Construtor de Pizzas | 7 |
| 4 | Prototype | `creational/prototype` | Clonagem de Documentos | 5 |
| 5 | Adapter | `structural/adapter` | Tomadas BR/US | 5 |
| 6 | Bridge | `structural/bridge` | Notificações | 8 |
| 7 | Composite | `structural/composite` | Sistema de Arquivos | 5 |
| 8 | Decorator | `structural/decorator` | Cafeteria | 8 |
| 9 | Facade | `structural/facade` | Home Theater | 7 |
| 10 | Flyweight | `structural/flyweight` | Editor de Texto | 5 |
| 11 | Proxy | `structural/proxy` | Cache de CEP | 6 |
| 12 | Chain of Resp. | `behavioral/chain-of-responsibility` | Suporte Técnico | 7 |
| 13 | Command | `behavioral/command` | Controle Remoto | 8 |
| 14 | Interpreter | `behavioral/interpreter` | Calculadora | 7 |
| 15 | Iterator | `behavioral/iterator` | Playlist | 7 |
| 16 | Mediator | `behavioral/mediator` | Chat Room | 5 |
| 17 | Memento | `behavioral/memento` | Editor com Undo | 5 |
| 18 | Observer | `behavioral/observer` | Newsletter/Blog | 7 |
| 19 | State | `behavioral/state` | Vending Machine | 7 |
| 20 | Strategy | `behavioral/strategy` | Cálculo de Frete | 7 |
| 21 | Template Method | `behavioral/template-method` | Geração de Relatórios | 5 |
| 22 | Visitor | `behavioral/visitor` | Formas Geométricas | 8 |

**Total: ~141 arquivos** (incluindo READMEs e index.ts de cada padrão)

---

## Convenções

- Mensagens de console em **português brasileiro**
- Imports com `import type` para tipos
- Cada pasta com `index.ts` (demonstração executável) + `README.md`
- Executar com `bun run src/<categoria>/<padrao>/index.ts`
- Nomes de classe em **PascalCase**, pastas em **kebab-case**
