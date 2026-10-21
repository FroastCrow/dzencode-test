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
- [ ] Orders: открытие прихода рядом со списком, закрытие, добавление продукта
- [ ] Orders: удаление прихода с попапом подтверждения
- [ ] Products: полный список полей и фильтр по типу
- [ ] Поиск в TopMenu
- [ ] Счётчик активных вкладок (Socket.io)
- [ ] Бэкенд + база данных MySQL, схема БД для MySQL Workbench
- [ ] Docker
- [ ] Деплой

## Структура проекта

```
src/
  components/   переиспользуемые компоненты (Navigation, TopMenu, PageTransition, OrderItem)
  pages/        страницы (OrdersPage, ProductsPage)
  store/        Redux: store и slices
  data/         тестовые данные
  utils/        вспомогательные функции (форматирование дат и сумм)
  styles/       глобальные стили и CSS-переменные
  assets/       изображения (логотип)
```

CSS каждого компонента лежит рядом с ним и написан по БЭМ (`block__element--modifier`).
