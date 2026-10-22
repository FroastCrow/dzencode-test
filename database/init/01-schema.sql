-- Схема бази: три таблиці.
-- orders   1 ──< products   (у приходу багато продуктів)
-- products 1 ──< prices     (у продукту кілька цін, по одній на валюту)
-- Структура повторює файл app.js із завдання: у продукту поле order (тут order_id)
-- і масив price (тут окрема таблиця prices).

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  serial_number INT NOT NULL,
  is_new TINYINT(1) NOT NULL DEFAULT 1, -- 1 новий, 0 б/у (як isNew в app.js)
  status ENUM('free', 'repair') NOT NULL DEFAULT 'free',
  photo VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  specification TEXT,
  guarantee_start DATETIME NOT NULL,
  guarantee_end DATETIME NOT NULL,
  order_id INT NOT NULL,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- Зовнішній ключ: order_id має посилатися на існуючий прихід.
  -- ON DELETE CASCADE: видаляємо прихід, і база сама видаляє його продукти.
  CONSTRAINT fk_products_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
);

CREATE TABLE prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  value DECIMAL(12, 2) NOT NULL, -- гроші зберігаємо в DECIMAL, а не FLOAT: без похибок округлення
  symbol ENUM('USD', 'UAH') NOT NULL,
  is_default TINYINT(1) NOT NULL DEFAULT 0,
  CONSTRAINT fk_prices_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
  -- Одна ціна на кожну валюту в продукту.
  CONSTRAINT uq_prices_product_symbol UNIQUE (product_id, symbol)
);
