# Inventory — Orders & Products

SPA-приложение для учёта приходов (Orders) и продуктов (Products). Тестовое задание.

> Статус: в разработке. Список реализованных функций ниже обновляется по мере работы.

## Стек

**Фронтенд**

- React 19 + TypeScript + Vite
- Redux Toolkit (глобальное состояние, асинхронные запросы через `createAsyncThunk`)
- React Router (навигация между страницами)
- react-transition-group (анимации при переходах)
- Bootstrap 5 + Bootstrap Icons, CSS по методологии БЭМ, CSS-переменные
- Шрифт Montserrat (@fontsource, без внешних запросов)
- Axios (REST), Socket.io (счётчик активных вкладок)

**Бэкенд**

- Node.js + Express 5 (REST API, JavaScript)
- MySQL 8.4 в Docker, драйвер mysql2

## Установка и запуск

Требуется:

- Node.js 20.19+ (или 22.12+) и npm
- Docker Desktop (для базы данных MySQL)

```bash
git clone https://github.com/FroastCrow/dzencode-test.git
cd dzencode-test
```

**1. База данных** (MySQL в Docker). При первом запуске автоматически создаются таблицы и тестовые данные:

```bash
docker compose up -d
```

**2. Сервер API** (в отдельном окне терминала):

```bash
cd server
npm install
npm run dev
```

API будет доступно на http://localhost:3000/api/orders

**3. Фронтенд** (в ещё одном окне терминала, из корня проекта):

```bash
npm install
npm run dev
```

Приложение откроется на http://localhost:5173 (запросы `/api` Vite перенаправляет на сервер).

Другие команды (из корня проекта):

```bash
npm run build                 # production-сборка фронтенда в папку dist
npm run preview               # локальный просмотр production-сборки
npm run lint                  # проверка кода
docker compose down           # остановить базу (данные сохраняются)
docker compose down -v        # остановить базу и удалить данные
docker compose up -d          # (после down -v) создать базу заново с тестовыми данными
```

## API

| Метод | Адрес | Что делает |
|---|---|---|
| GET | `/api/orders` | список приходов |
| GET | `/api/products` | список продуктов с ценами (формат как в `app.js` из задания) |
| DELETE | `/api/orders/:id` | удалить приход (его продукты и цены удаляются каскадно) |
| DELETE | `/api/products/:id` | удалить продукт |

## База данных

- Схема: `database/init/01-schema.sql` (таблицы `orders`, `products`, `prices`, внешние ключи с каскадным удалением)
- Тестовые данные: `database/init/02-seed.sql`
- Модель для MySQL Workbench: `database/inventory.mwb`
- Подключение: `127.0.0.1:3306`, база, пользователь и пароль: `inventory`

## Что реализовано

- [x] Каркас проекта, роутинг `/orders` и `/products`, анимация перехода между страницами
- [x] Navigation Menu с ссылками на Orders и Products
- [x] TopMenu с датой и временем в реальном времени
- [x] Вёрстка Orders, TopMenu и Navigation по макету
- [x] Страница Orders: список приходов (название, количество продуктов с правильным склонением, дата в двух форматах, сумма в USD и UAH)
- [x] Orders: открытие прихода рядом со списком (клик или клавиатура), закрытие, анимация появления
- [x] Статус продукта (Свободен / В ремонте) и иконка по типу
- [ ] Добавление продукта в приход
- [x] Удаление прихода (вместе с его продуктами) и продукта через попап подтверждения (закрытие по Escape и клику по фону)
- [x] Products: полный список полей (статус, гарантия, состояние, цена в USD и UAH, тип, приход, дата), фильтр по типу, удаление продукта, горизонтальная прокрутка на узких экранах
- [x] Поиск в TopMenu: фильтр приходов и продуктов по названию (без учёта регистра)
- [x] Бэкенд: Express + MySQL, REST API (загрузка и удаление), схема БД для MySQL Workbench
- [x] Загрузка данных через Axios, индикатор загрузки и сообщение об ошибке
- [ ] Счётчик активных вкладок (Socket.io)
- [ ] Docker для всего приложения
- [ ] Деплой

## Структура проекта

```
docker-compose.yml   база данных MySQL в Docker
database/            схема БД, тестовые данные, модель MySQL Workbench
server/              бэкенд: Express + mysql2
  src/index.js       запуск сервера, подключение маршрутов
  src/db.js          подключение к MySQL (пул соединений)
  src/routes/        маршруты API (orders, products)
src/                 фронтенд
  api.ts             экземпляр Axios для запросов к API
  components/        компоненты (Navigation, TopMenu, PageTransition, DataLoader, OrderItem, OrderDetails, ProductItem, ProductRow, ConfirmDialog)
  pages/             страницы (OrdersPage, ProductsPage)
  store/             Redux: store и slices (orders, products, search)
  utils/             вспомогательные функции (форматирование дат и сумм, поиск)
  constants.ts       подписи статусов и типов, иконки типов продуктов
  styles/            глобальные стили и CSS-переменные
  assets/            изображения (логотип)
```

CSS каждого компонента лежит рядом с ним и написан по БЭМ (`block__element--modifier`).
