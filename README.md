# bem-express

Almost the same as [project-stub](https://github.com/bem/project-stub/) but with [BEMTREE](https://en.bem.info/technology/bemtree/) and [Express](http://expressjs.com/).

## Installation

```sh
npm i
enb make
```

## Development

```sh
npm run watch
nodemon
```

## Production

```sh
YENV=production enb make
node server
```

## Templating

Templating starts in `root` block which replaces itself with `page` or any other context (if specified as argument to `render` function).

## Pro tips

Run server in dev mode with `NODE_ENV=development` environment variable (`nodemon` will set it for you).

In dev mode

* Add `?json=1` to URL to see raw data
* Add `?bemjson=1` to URL to see BEMJSON generated with BEMTREE templates.


# SERVER

## Окружение:
Окружение задается переменной окружения `NODE_ENV` и его можно получить с помощью `app.get('env')`. Окружением по-умолчанию является `development`. Существует хелпер для проверки того что текущим окружением является `development`: `app.get('isDev')`

## Сервисы
Доступ к сервисам можно получить с помощью метода express-приложения: `.get()`
 
**Пример**:
```javascript
// Получаем сервис с именем "conf"
var conf = app.get('conf');
```


### Конфигурация
**Имя сервиса:** "conf"

Все конфигурационные файлы расположены в `server/configs`. По-умолчанию там лежит только `global.json`. Это основной файл конфигурации.

Также можно добавлять файлы конфигурации для различных окружений. 
Файлы должны иметь название вида: `${env.toLowerCase()}.json`. Конфигурационные файлы не заменяют содержимое `global.json`, они объединяются с ним. Т.е. не обязательно перечислять все свойства для окружения из `global.json`, достаточно перечислить только те, которые вы хотите изменить.

Существует также способ передачи параметров с помощью опций при запуске сервера, например: `node server --server.defaultPort=8080`. Данные свойста применяются в последнюю очередь и как можно заметить можно даже использовать вложенность с помощью точки.

**Возвращает:**
Построенный объект конфигурации.

**Пример**:
```javascript
// Получаем сервис с именем "conf"
var conf = app.get('conf');

conf.server.defaultPort // 3000
```


### Логгирование
**Имя сервиса:** "logger"

Существует 4 уровня логирования: `debug`, `info`, `log`, `error`, с такими же именами методов

**Возвращает:**
Объект с методами для логгирования.

**Пример**:
```javascript
// Первым параметром необходимо передавать контекст текущего модуля. Это необходимо для того чтобы в лог писался файл из которого прозошло логирование
app.get('logger').error(module, 'Что-то пошло не так!');

// вы можете передать инстанс Error вместо сообщения:
...
} catch (error) {
    app.get('logger').error(module, error);
}

// В качестве сообщения может выступать printf-like строка
logger.info(module, 'Hello %s, %d, %j', 'user', 2000, { userData: 'some'}, ['data', 'param']);

// Последним параметром есть возможность передать какие-либо данные, которые тоже попадут в лог, предварительно пройдя через JSON.stringify. Ошибка тоже может быть передана в качестве данных, она будет правильно обработана.
app.get('logger').info(module, 'Пользователь вошел', { user: 'Petya' });

...
} catch (err) {
    logger.error(module, 'BEMTREE error', err);
}
```


### Рендеринг bem
**Имя сервиса:** "bem"

Сервис для рендеринга bem-tree

**Возвращает:**
Объект с двумя методами: `render(req, res, data, context)` и `clearCache()`


### База данных
**Имя сервиса:** "db"


**Возвращает:**
