// Тестові дані за зразком із файлу app.js із завдання.
// Пізніше замінимо на запити до бекенду (Axios).

import type { Order, Product } from '../types'

export const orders: Order[] = [
  { id: 1, title: 'Длинное предлинное длиннючее название прихода', date: '2017-04-06 12:09:33', description: 'desc' },
  { id: 2, title: 'Длинное название прихода', date: '2017-09-06 12:09:33', description: 'desc' },
  { id: 3, title: 'Длинное предлинное название прихода', date: '2017-06-06 12:09:33', description: 'desc' },
]

export const products: Product[] = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: { start: '2017-06-29 12:09:33', end: '2018-06-29 12:09:33' },
    price: [
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2600, symbol: 'UAH', isDefault: 1 },
    ],
    order: 1,
    date: '2017-06-29 12:09:33',
  },
  {
    id: 2,
    serialNumber: 5678,
    isNew: 0,
    photo: 'pathToFile.jpg',
    title: 'Dell UltraSharp U2415',
    type: 'Monitors',
    specification: 'Specification 2',
    guarantee: { start: '2017-06-29 12:09:33', end: '2019-06-29 12:09:33' },
    price: [
      { value: 250, symbol: 'USD', isDefault: 0 },
      { value: 6500, symbol: 'UAH', isDefault: 1 },
    ],
    order: 1,
    date: '2017-06-29 12:09:33',
  },
  {
    id: 3,
    serialNumber: 9012,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Logitech MX Keys',
    type: 'Keyboards',
    specification: 'Specification 3',
    guarantee: { start: '2017-06-29 12:09:33', end: '2018-12-29 12:09:33' },
    price: [
      { value: 120, symbol: 'USD', isDefault: 0 },
      { value: 3100, symbol: 'UAH', isDefault: 1 },
    ],
    order: 2,
    date: '2017-06-29 12:09:33',
  },
]
