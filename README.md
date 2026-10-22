# Inventory — Orders & Products

SPA-приложение для учёта приходов (Orders) и продуктов (Products). Тестовое задание.

> Статус: в разработке. Список реализованных функций ниже обновляется по мере работы.

## Стек

- React 19 + TypeScript + Vite
- Redux Toolkit (глобальное состояние)
- React Router (навигация между страницами)
- react-transition-group (анимации при переходах)
- Bootstrap 5 + Bootstrap Icons, CSS по методологии БЭМ, CSS-переменные
- Шрифт Montserrat (@fontsource, без внешних запросов)
- Axios (REST), Socket.io (счётчик активных вкладок)

## Установка и запуск

Требуется Node.js 20+ и npm.

```bash
git clone https://github.com/FroastCrow/dzencode-test.git
cd dzencode-test
npm install
npm run dev
```

Приложение откроется на http://localhost:5173

Другие команды:

```bash
npm run build     # production-сборка в папку dist
npm run preview   # локальный просмотр production-сборки
npm run lint      # проверка кода
```

## Что реализовано

- [x] Каркас проекта, роутинг `/orders` и `/products`, анимация перехода между страницами
- [x] Navigation Menu с ссылками на Orders и Products
- [x] TopMenu с датой и временем в реальном времени
- [x] Вёрстка Orders, TopMenu и Navigation по макету
- [x] Страница Orders: список приходов (название, количество продуктов с правильным склонением, дата в двух форматах, сумма в USD и UAH)
- [x] Страница Products: список продуктов (базовый вариант)
- [x] Orders: открытие прихода рядом со списком (клик или клавиатура), закрытие, анимация появления
- [x] Статус продукта (Свободен / В ремонте) и иконка по типу
- [ ] Добавление продукта в приход
- [x] Удаление прихода (вместе с его продуктами) и продукта через попап подтверждения (закрытие по Escape и клику по фону)
- [x] Products: полный список полей (статус, гарантия, состояние, цена в USD и UAH, тип, приход, дата), фильтр по типу, удаление продукта, горизонтальная прокрутка на узких экранах
- [x] Поиск в TopMenu: фильтр приходов и продуктов по названию (без учёта регистра)
- [ ] Счётчик активных вкладок (Socket.io)
- [ ] Бэкенд + база данных MySQL, схема БД для MySQL Workbench
- [ ] Docker
- [ ] Деплой

## Структура проекта

```
src/
  components/   переиспользуемые компоненты (Navigation, TopMenu, PageTransition, OrderItem, OrderDetails, ProductItem, ProductRow, ConfirmDialog)
  pages/        страницы (OrdersPage, ProductsPage)
  store/        Redux: store и slices (orders, products, search)
  data/         тестовые данные
  utils/        вспомогательные функции (форматирование дат и сумм, поиск)
  constants.ts  подписи статусов и типов, иконки типов продуктов
  styles/       глобальные стили и CSS-переменные
  assets/       изображения (логотип)
```

CSS каждого компонента лежит рядом с ним и написан по БЭМ (`block__element--modifier`).
