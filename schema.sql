DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;
USE bamazon;

CREATE TABLE products (
  position INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT,
  UNIQUE (item_id),
  PRIMARY KEY (position)
);

SELECT * FROM products;

INSERT INTO products;
VALUES
  (1000, "MacBook", "Technology", 2000.00, 15),
  (2345, "iPhone", "Technology", 300.00, 12),
  (5234, "Hololens", "Technology", 500.00 21),
  (8769, "Basketball", "Sports", 28.79, 54),
  (1230, "Toothpaste", "Health", 11.99, 42),
  (7937, "Hoodie", "Clothing", 18.99, 3),
  (2409, "Tennis Ball", "Sports", 16.89, 15),
  (5824, "Tooth Brush", "Health", 2.99, 134),
  (4994, "24-pack Water", "Food", 1.99, 84),
  (4708, "Ground Beef", "Food", 3.79, 16);