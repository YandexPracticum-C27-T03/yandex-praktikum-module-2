## Инструкция по оформлению кода для участников проекта

### Именование

При именовании файлов мы используем `kebab-case`

### Структура файлов для компонентов

В каждой папке с компонентом должен быть файл `index.ts` содержащий **только** экспорты, при этом код компонента должен
лежать в файле называющимся по имени папки.
Файл со стилями называется `styles`.

Пример: Структура компонента `SimpleButton`:

```
src/
└── components/
    └── simple-button/
        ├── simple-button.tsx
        ├── styles.css
        └── index.ts

```

#### Дочерний компонент не может быть родителем других компонентов

Неправильно:

```
src/
└── list/
    ├── list-item/
        ├── list-item-button/
            ├── list-item-button.tsx
            └── styles.css
        ├── list-item.tsx
        └── styles.css
    ├── list.tsx
    └── styles.css
```

Правильно:

```
src/
└── list/
    ├── list-item/
        ├── list-item.tsx
        └── styles.css
    ├── list-item-button/
        ├── list-item-button.tsx
        └── styles.css
    ├── list.tsx
    └── styles.css
```

### Уточки

Уточки "обитают" в корне папки ducks. Каждая отвечает за свою часть логики приложения, например user, settings,...
Уточки - срезы стейта

```
src/
└── ducks/
    └── duck-name/
        ├── actions.ts
        ├── reducers.ts
        ├── selectors.ts
        └── types.ts

```

## Кодстиль

## Именование
При именовании переменных мы используем `camelCase`, а при именовании
React-компонентов `PascalCase`.

Для констант простых типов(string, number...) можно использовать `UPPER_CASE_SNAKE_CASE`, а для констант-объектов и
Enum - `PascalCase`

### Линтеры и претиер
Для работы с кодовой базой необходимо установить плагин **Prettier** для IDE.

Плагин для **VS Code** - **[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**.
Для **WebStorm** и **PhpStorm** - **[Prettier](https://plugins.jetbrains.com/plugin/10456)**.

В настройках IDE:

- Prettier: Config Path: `<PATH TO PROJECT>\smb-2.0-witsml-web-admin\src\.prettierrc`
- Editor: Default Formatter: Prettier - Code formatter
- Editor: Format On Save: true

`eslint`, `stylelint` и `prettier` проверяют соблюдение вами правил написания кода и запускаются в pre-commit хуке.


### Сборка проекта
1. Зайти в packages/client
2. Выполнить команды `yarn build`  и `yarn build:ssr` - запуститься дев сервер
3. Выполнить команду `yarn link`;
4. Перейти в packages/server
5. Выполнить команду `yarn link client` 
6. Выполнить команду `yarn dev` - для разработки с hrm
--
так же можно собрать проект для продакш сборки в директории с сервером выполнить команду `yarn build` и `yarn preview`
возможно потребуюется пересобрать клиент.