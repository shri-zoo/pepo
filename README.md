# PEPO

#### Установка
```sh
npm i
enb make
```

### Генерация тестовых данных
```
./server/generator/generator.js create -u 20 -m 10 - Создание 20 тестовых пользователей и по 10 сообщений для каждого
./server/generator/generator.js drop - Удаление коллекций users && messages
```

### Создание конфига для dev-окружения
Создайте файл `/server/configs/development.js` и внесите туда следующие данные, ввёв свои секретные ключи и другую приватную информацию:
```
module.exports = {
  db: {
    uri: "MONGO_DB_CONNECTION_URI"
  },
  auth: {
    providers: [
      {
        clientID: 'FACEBOOK_CLIENT_ID',
        clientSecret: 'FACEBOOK_CLIENT_SECRET',
        authURL: 'http://pepo.local:3000/api/auth/facebook',
        callbackURL: 'http://pepo.local:3000/api/auth/facebook/callback'
      },
      {
        clientID: 'VKONTAKTE_CLIENT_ID',
        clientSecret: 'VKONTAKTE_CLIENT_SECRET',
        authURL: 'http://127.0.0.1:3000/api/auth/vkontakte',
        callbackURL: 'http://127.0.0.1:3000/api/auth/vkontakte/callback'
      },
      {
        clientID: 'YANDEX_CLIENT_ID',
        clientSecret: 'YANDEX_CLIENT_SECRET',
        authURL: 'http://pepo.local:3000/api/auth/yandex',
        callbackURL: 'http://pepo.local:3000/api/auth/yandex/callback'
      },
      {
        clientID: 'GOOGLE_CLIENT_ID',
        clientSecret: 'GOOGLE_CLIENT_SECRET',
        authURL: 'http://127.0.0.1:3000/api/auth/google',
        callbackURL: 'http://127.0.0.1:3000/api/auth/google/callback'
      }
    ]
  }
};
```
Т.к. некоторые oauth-провайдеры не поддерживают установку callbackURL c IP, рекомендуется добавить в `hosts`:
```
127.0.0.1 pepo.local
```

#### Запуск с https
1. Создаем конфигурацию `/server/configs/development-ssl.js` для https версии
2. Запускаем `nodemon:ssl`. В первый раз он вам предложит добавить `127.0.0.0    pepo.local` в `/etc/hosts` и создаст ssl-сертификаты для сервера, вам остается лишь понажимать Enter когда команда будет делать запросы на ввод данных.

#### Сервер разработки
```sh
npm run watch
nodemon
```

#### Сборка production-версии
```sh
YENV=production enb make
node server
```

#### Ручной линтинг js и css
```sh
npm run lint
```

#### Разворачивание на удаленном сервере (у вас должен быть настроен ssh-ключ для пользователя указанного в ecosystem.js)
```sh
npm run deploy
```

#### Откатывание последнего деплоя (у вас должен быть настроен ssh-ключ для пользователя указанного в ecosystem.js)
```sh
npm run deploy:revert
```


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
Шаблонизация начинается в блоке `root`, который заменяет себя на `page` или любой другой переданный контекст (через аргемент функции `render`)

В дев-режиме мы можем:
* Добавив `?json=1` к URL посмотреть RAW данные
* Добавив `?bemjson=1` к URL посмотреть BEMJSON сгенерированный из BEMTREE шаблонов


**Возвращает:**
Объект с двумя методами: `render(req, res, data, context)` и `clearCache()`


### База данных
**Имя сервиса:** "db"

Пример получения модели:
```javascript
app.get('db').model('User')
```

**Возвращает:**
mongoose


### Middlewares
**Имя сервиса:** "middlewares"

**Пример**:
```javascript
// Получаем middleware проверяющий авторизованность пользователя
var isAuth = app.get('middlewares').isAuth;
// Получаем middleware проверяющий тип запроса: он разрешает только ajax
var onlyAjax = app.get('middlewares').onlyAjax;

// Используем их
.get('/some-private-endpoint', isAuth, onlyAjax, handler)

```

**Возвращает:**
Объект с middleware. Ключом выступает имя middleware.


### Helpers
**Имя сервиса:** "helpers"
Тут лежит всякий вспомогательный код, который подразумевает его частое исползование в обработчиках запросов

**Пример**:
```javascript
// Хэлпер правильно обрабатывающий ошибку в запросе
var handleError = app.get('helpers').handleError;

// например ошибку валидации
var user = new User({ username: 'r2d2' });

user
    .save()
    .then(...)
    .catch(function () {
        handleError(req, res, err);
    })
```


**Возвращает:**
Объект с хэлперами. Ключом выступает имя хэлпера.
