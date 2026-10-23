-- Тестові дані (ті самі, що були в src/data/mockData.ts).
-- SET NAMES: текст у цьому файлі в кодуванні UTF-8 (кирилиця).
SET NAMES utf8mb4;

INSERT INTO orders (id, title, description, date) VALUES
  (1, 'Длинное предлинное длиннючее название прихода', 'desc', '2017-04-06 12:09:33'),
  (2, 'Длинное название прихода', 'desc', '2017-09-06 10:15:00'),
  (3, 'Поставка мониторов и клавиатур для офиса', 'desc', '2017-06-06 16:40:12'),
  (4, 'Длинное предлинное название прихода', 'desc', '2017-02-06 09:00:00');

INSERT INTO products
  (id, serial_number, is_new, status, photo, title, type, specification, guarantee_start, guarantee_end, order_id, date)
VALUES
  (1, 12345678, 1, 'free', 'pathToFile.jpg', 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3', 'Monitors', 'Specification 1', '2017-04-06 12:09:33', '2025-08-06 12:09:33', 1, '2017-04-06 12:09:33'),
  (2, 23456789, 0, 'repair', 'pathToFile.jpg', 'Dell UltraSharp U2415', 'Monitors', 'Specification 2', '2017-04-06 12:09:33', '2019-04-06 12:09:33', 1, '2017-04-06 12:09:33'),
  (3, 34567890, 1, 'free', 'pathToFile.jpg', 'Logitech K120', 'Keyboards', 'Specification 3', '2017-04-06 12:09:33', '2018-04-06 12:09:33', 1, '2017-04-06 12:09:33'),
  (4, 45678901, 1, 'free', 'pathToFile.jpg', 'Lenovo ThinkPad T470', 'Laptops', 'Specification 4', '2017-09-06 10:15:00', '2020-09-06 10:15:00', 2, '2017-09-06 10:15:00'),
  (5, 56789012, 1, 'free', 'pathToFile.jpg', 'Samsung S24F350', 'Monitors', 'Specification 5', '2017-06-06 16:40:12', '2019-06-06 16:40:12', 3, '2017-06-06 16:40:12'),
  (6, 67890123, 0, 'free', 'pathToFile.jpg', 'Logitech MX Keys', 'Keyboards', 'Specification 6', '2017-06-06 16:40:12', '2018-12-06 16:40:12', 3, '2017-06-06 16:40:12'),
  (7, 78901234, 1, 'free', 'pathToFile.jpg', 'HP ProBook 450 G4', 'Laptops', 'Specification 7', '2017-02-06 09:00:00', '2019-02-06 09:00:00', 4, '2017-02-06 09:00:00'),
  (8, 89012345, 0, 'repair', 'pathToFile.jpg', 'Dell KB216', 'Keyboards', 'Specification 8', '2017-02-06 09:00:00', '2018-02-06 09:00:00', 4, '2017-02-06 09:00:00');

-- Кожен продукт має дві ціни: у доларах і в гривнях (гривня за замовчуванням, як в app.js).
INSERT INTO prices (product_id, value, symbol, is_default) VALUES
  (1, 100.00, 'USD', 0), (1, 2600.00, 'UAH', 1),
  (2, 250.00, 'USD', 0), (2, 6500.00, 'UAH', 1),
  (3, 15.50, 'USD', 0), (3, 403.00, 'UAH', 1),
  (4, 1200.00, 'USD', 0), (4, 31200.00, 'UAH', 1),
  (5, 140.00, 'USD', 0), (5, 3640.00, 'UAH', 1),
  (6, 99.99, 'USD', 0), (6, 2599.74, 'UAH', 1),
  (7, 780.00, 'USD', 0), (7, 20280.00, 'UAH', 1),
  (8, 12.00, 'USD', 0), (8, 312.00, 'UAH', 1);
