INSERT INTO service_categories (name, description)
SELECT 'ТО и диагностика', 'Плановое обслуживание, диагностика, замена расходников и жидкостей'
WHERE NOT EXISTS (SELECT 1 FROM service_categories WHERE name = 'ТО и диагностика');

INSERT INTO service_categories (name, description)
SELECT 'Тормозная система', 'Тормозные механизмы, колодки, диски, замена и обслуживание'
WHERE NOT EXISTS (SELECT 1 FROM service_categories WHERE name = 'Тормозная система');

INSERT INTO service_categories (name, description)
SELECT 'Подвеска и рулевое', 'Амортизаторы, сайлентблоки, рычаги, геометрия'
WHERE NOT EXISTS (SELECT 1 FROM service_categories WHERE name = 'Подвеска и рулевое');

INSERT INTO service_categories (name, description)
SELECT 'Кузовные работы', 'Покраска, рихтовка, антикор, полировка'
WHERE NOT EXISTS (SELECT 1 FROM service_categories WHERE name = 'Кузовные работы');

-- Марки и модели
INSERT INTO car_brand_model (brand, model)
SELECT 'Volkswagen', 'Passat'
WHERE NOT EXISTS (SELECT 1 FROM car_brand_model WHERE brand = 'Volkswagen' AND model = 'Passat');

INSERT INTO car_brand_model (brand, model)
SELECT 'Renault', 'Logan'
WHERE NOT EXISTS (SELECT 1 FROM car_brand_model WHERE brand = 'Renault' AND model = 'Logan');

INSERT INTO car_brand_model (brand, model)
SELECT 'Audi', 'Q5'
WHERE NOT EXISTS (SELECT 1 FROM car_brand_model WHERE brand = 'Audi' AND model = 'Q5');

INSERT INTO car_brand_model (brand, model)
SELECT 'Skoda', 'Octavia'
WHERE NOT EXISTS (SELECT 1 FROM car_brand_model WHERE brand = 'Skoda' AND model = 'Octavia');

INSERT INTO car_brand_model (brand, model)
SELECT 'Nissan', 'Qashqai'
WHERE NOT EXISTS (SELECT 1 FROM car_brand_model WHERE brand = 'Nissan' AND model = 'Qashqai');

-- Клиенты (включая address — в коде инициализатора не было)
INSERT INTO clients (first_name, last_name, phone, email, address, registration_date)
SELECT 'Иван', 'Петров', '+37500001001', 'client.demo1@example.com', 'г. Минск, ул. Примерная, д. 1, кв. 10', CURRENT_DATE - INTERVAL '2 months'
WHERE NOT EXISTS (SELECT 1 FROM clients WHERE phone = '+37500001001');

INSERT INTO clients (first_name, last_name, phone, email, address, registration_date)
SELECT 'Мария', 'Сидорова', '+37500001002', 'client.demo2@example.com', 'г. Минск, пр. Независимости, д. 50', CURRENT_DATE - INTERVAL '1 month'
WHERE NOT EXISTS (SELECT 1 FROM clients WHERE phone = '+37500001002');

INSERT INTO clients (first_name, last_name, phone, email, address, registration_date)
SELECT 'Алексей', 'Ковалёв', '+37500001003', 'client.demo3@example.com', 'г. Минск, ул. Техническая, д. 7', CURRENT_DATE - INTERVAL '5 days'
WHERE NOT EXISTS (SELECT 1 FROM clients WHERE phone = '+37500001003');

INSERT INTO clients (first_name, last_name, phone, email, address, registration_date)
SELECT 'Елена', 'Новикова', '+37500001004', 'client.demo4@example.com', 'г. Минск, ул. Логистическая, д. 3, оф. 12', CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM clients WHERE phone = '+37500001004');

-- Услуги (category_id, master_name, note заполнены)
INSERT INTO services (name, description, price, duration_minutes, category_id, available, master_name, note)
SELECT 'Замена масла', 'Замена моторного масла и масляного фильтра', 120.0, 60,
       (SELECT id FROM service_categories WHERE name = 'ТО и диагностика' LIMIT 1), true,
       'Сергей В.', 'Стандартное ТО по регламенту производителя'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Замена масла');

INSERT INTO services (name, description, price, duration_minutes, category_id, available, master_name, note)
SELECT 'Диагностика двигателя', 'Компьютерная диагностика двигателя и электроники', 80.0, 30,
       (SELECT id FROM service_categories WHERE name = 'ТО и диагностика' LIMIT 1), true,
       'Дмитрий Н.', 'Считывание кодов ошибок, проверка параметров в реальном времени'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Диагностика двигателя');

INSERT INTO services (name, description, price, duration_minutes, category_id, available, master_name, note)
SELECT 'Замена тормозных колодок', 'Замена передних/задних тормозных колодок', 150.0, 90,
       (SELECT id FROM service_categories WHERE name = 'Тормозная система' LIMIT 1), true,
       'Дмитрий Н.', 'Работы на подъёмнике, прокачка при необходимости'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Замена тормозных колодок');

INSERT INTO services (name, description, price, duration_minutes, category_id, available, master_name, note)
SELECT 'Ремонт подвески', 'Замена амортизаторов и сайлентблоков', 250.0, 180,
       (SELECT id FROM service_categories WHERE name = 'Подвеска и рулевое' LIMIT 1), true,
       'Андрей К.', 'Комплексная проверка узлов подвески'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Ремонт подвески');

INSERT INTO services (name, description, price, duration_minutes, category_id, available, master_name, note)
SELECT 'Покраска элемента', 'Покраска одной детали кузова', 300.0, 240,
       (SELECT id FROM service_categories WHERE name = 'Кузовные работы' LIMIT 1), true,
       'Павел С.', 'Подбор цвета по коду, локальная покраска'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Покраска элемента');

-- Механики
INSERT INTO mechanics (first_name, last_name, hire_date, phone)
SELECT 'Сергей', 'Васильев', CURRENT_DATE - INTERVAL '5 years', '+37500002001'
WHERE NOT EXISTS (SELECT 1 FROM mechanics WHERE phone = '+37500002001');

INSERT INTO mechanics (first_name, last_name, hire_date, phone)
SELECT 'Дмитрий', 'Николаев', CURRENT_DATE - INTERVAL '2 years', '+37500002002'
WHERE NOT EXISTS (SELECT 1 FROM mechanics WHERE phone = '+37500002002');

INSERT INTO mechanics (first_name, last_name, hire_date, phone)
SELECT 'Андрей', 'Козлов', CURRENT_DATE - INTERVAL '3 years', '+37500002003'
WHERE NOT EXISTS (SELECT 1 FROM mechanics WHERE phone = '+37500002003');

INSERT INTO mechanics (first_name, last_name, hire_date, phone)
SELECT 'Павел', 'Соколов', CURRENT_DATE - INTERVAL '1 year', '+37500002004'
WHERE NOT EXISTS (SELECT 1 FROM mechanics WHERE phone = '+37500002004');

-- Связь механик ↔ услуги
INSERT INTO mechanic_services (mechanic_id, service_id)
SELECT m.id, s.id FROM mechanics m CROSS JOIN services s
WHERE m.phone = '+37500002001' AND s.name IN ('Замена масла', 'Диагностика двигателя')
  AND NOT EXISTS (SELECT 1 FROM mechanic_services ms WHERE ms.mechanic_id = m.id AND ms.service_id = s.id);

INSERT INTO mechanic_services (mechanic_id, service_id)
SELECT m.id, s.id FROM mechanics m CROSS JOIN services s
WHERE m.phone = '+37500002002' AND s.name IN ('Замена масла', 'Замена тормозных колодок')
  AND NOT EXISTS (SELECT 1 FROM mechanic_services ms WHERE ms.mechanic_id = m.id AND ms.service_id = s.id);

INSERT INTO mechanic_services (mechanic_id, service_id)
SELECT m.id, s.id FROM mechanics m CROSS JOIN services s
WHERE m.phone = '+37500002003' AND s.name IN ('Диагностика двигателя', 'Ремонт подвески')
  AND NOT EXISTS (SELECT 1 FROM mechanic_services ms WHERE ms.mechanic_id = m.id AND ms.service_id = s.id);

INSERT INTO mechanic_services (mechanic_id, service_id)
SELECT m.id, s.id FROM mechanics m CROSS JOIN services s
WHERE m.phone = '+37500002004' AND s.name = 'Покраска элемента'
  AND NOT EXISTS (SELECT 1 FROM mechanic_services ms WHERE ms.mechanic_id = m.id AND ms.service_id = s.id);

-- Автомобили
INSERT INTO cars (brand_model_id, client_id, license_plate, vin, year)
SELECT (SELECT id FROM car_brand_model WHERE brand = 'Volkswagen' AND model = 'Passat' LIMIT 1),
       (SELECT id FROM clients WHERE phone = '+37500001001' LIMIT 1),
       '1234AB-5', 'WVWZZZ3CZJE123456', 2019
WHERE NOT EXISTS (SELECT 1 FROM cars WHERE license_plate = '1234AB-5');

INSERT INTO cars (brand_model_id, client_id, license_plate, vin, year)
SELECT (SELECT id FROM car_brand_model WHERE brand = 'Renault' AND model = 'Logan' LIMIT 1),
       (SELECT id FROM clients WHERE phone = '+37500001001' LIMIT 1),
       '5678CD-6', 'VF1LMJ76543123456', 2020
WHERE NOT EXISTS (SELECT 1 FROM cars WHERE license_plate = '5678CD-6');

INSERT INTO cars (brand_model_id, client_id, license_plate, vin, year)
SELECT (SELECT id FROM car_brand_model WHERE brand = 'Audi' AND model = 'Q5' LIMIT 1),
       (SELECT id FROM clients WHERE phone = '+37500001002' LIMIT 1),
       '9012EF-7', 'WAUZZZ8R6DA123456', 2022
WHERE NOT EXISTS (SELECT 1 FROM cars WHERE license_plate = '9012EF-7');

INSERT INTO cars (brand_model_id, client_id, license_plate, vin, year)
SELECT (SELECT id FROM car_brand_model WHERE brand = 'Skoda' AND model = 'Octavia' LIMIT 1),
       (SELECT id FROM clients WHERE phone = '+37500001003' LIMIT 1),
       '3456GH-8', 'TMBJM21Z3K1234567', 2021
WHERE NOT EXISTS (SELECT 1 FROM cars WHERE license_plate = '3456GH-8');

INSERT INTO cars (brand_model_id, client_id, license_plate, vin, year)
SELECT (SELECT id FROM car_brand_model WHERE brand = 'Nissan' AND model = 'Qashqai' LIMIT 1),
       (SELECT id FROM clients WHERE phone = '+37500001004' LIMIT 1),
       '7890IJ-9', 'SJNFDAJ11U1234567', 2023
WHERE NOT EXISTS (SELECT 1 FROM cars WHERE license_plate = '7890IJ-9');

-- Запчасти
INSERT INTO spares (name, part_number, price, quantity_in_stock, manufacturer)
SELECT 'Масляный фильтр', 'OF-12345', 15.0, 50, 'MANN-FILTER'
WHERE NOT EXISTS (SELECT 1 FROM spares WHERE part_number = 'OF-12345');

INSERT INTO spares (name, part_number, price, quantity_in_stock, manufacturer)
SELECT 'Тормозные колодки передние', 'BP-67890', 85.0, 20, 'Brembo'
WHERE NOT EXISTS (SELECT 1 FROM spares WHERE part_number = 'BP-67890');

INSERT INTO spares (name, part_number, price, quantity_in_stock, manufacturer)
SELECT 'Амортизатор передний', 'SH-54321', 180.0, 8, 'KYB'
WHERE NOT EXISTS (SELECT 1 FROM spares WHERE part_number = 'SH-54321');

INSERT INTO spares (name, part_number, price, quantity_in_stock, manufacturer)
SELECT 'Свеча зажигания', 'SP-98765', 12.0, 100, 'NGK'
WHERE NOT EXISTS (SELECT 1 FROM spares WHERE part_number = 'SP-98765');

INSERT INTO spares (name, part_number, price, quantity_in_stock, manufacturer)
SELECT 'Ремень ГРМ', 'BL-24680', 65.0, 15, 'Bosch'
WHERE NOT EXISTS (SELECT 1 FROM spares WHERE part_number = 'BL-24680');

-- Заказы (описание и суммы как в демо)
INSERT INTO orders (order_date, status, total_price, description, completion_date, car_id)
SELECT CURRENT_TIMESTAMP - INTERVAL '5 days', 'COMPLETED', 135.0, 'Плановое ТО', CURRENT_TIMESTAMP - INTERVAL '4 days',
       (SELECT id FROM cars WHERE license_plate = '1234AB-5' LIMIT 1)
WHERE NOT EXISTS (
  SELECT 1 FROM orders o JOIN cars c ON o.car_id = c.id
  WHERE c.license_plate = '1234AB-5' AND o.description = 'Плановое ТО' AND o.status = 'COMPLETED'
);

INSERT INTO orders (order_date, status, total_price, description, completion_date, car_id)
SELECT CURRENT_TIMESTAMP - INTERVAL '3 days', 'IN_PROGRESS', 235.0, 'Замена тормозных колодок', NULL,
       (SELECT id FROM cars WHERE license_plate = '9012EF-7' LIMIT 1)
WHERE NOT EXISTS (
  SELECT 1 FROM orders o JOIN cars c ON o.car_id = c.id
  WHERE c.license_plate = '9012EF-7' AND o.description = 'Замена тормозных колодок'
);

INSERT INTO orders (order_date, status, total_price, description, completion_date, car_id)
SELECT CURRENT_TIMESTAMP - INTERVAL '1 day', 'NEW', 510.0, 'Диагностика и ремонт подвески', NULL,
       (SELECT id FROM cars WHERE license_plate = '7890IJ-9' LIMIT 1)
WHERE NOT EXISTS (
  SELECT 1 FROM orders o JOIN cars c ON o.car_id = c.id
  WHERE c.license_plate = '7890IJ-9' AND o.description = 'Диагностика и ремонт подвески'
);

INSERT INTO orders (order_date, status, total_price, description, completion_date, car_id)
SELECT CURRENT_TIMESTAMP - INTERVAL '10 days', 'CANCELLED', 0.0, 'Клиент отменил запись', NULL,
       (SELECT id FROM cars WHERE license_plate = '5678CD-6' LIMIT 1)
WHERE NOT EXISTS (
  SELECT 1 FROM orders o JOIN cars c ON o.car_id = c.id
  WHERE c.license_plate = '5678CD-6' AND o.description = 'Клиент отменил запись'
);

-- Связи заказ ↔ услуги и запчасти
INSERT INTO order_services (order_id, service_id)
SELECT o.id, s.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN services s ON s.name = 'Замена масла'
WHERE c.license_plate = '1234AB-5' AND o.description = 'Плановое ТО'
  AND NOT EXISTS (SELECT 1 FROM order_services os WHERE os.order_id = o.id AND os.service_id = s.id);

INSERT INTO order_spares (order_id, spare_id)
SELECT o.id, sp.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN spares sp ON sp.part_number = 'OF-12345'
WHERE c.license_plate = '1234AB-5' AND o.description = 'Плановое ТО'
  AND NOT EXISTS (SELECT 1 FROM order_spares osp WHERE osp.order_id = o.id AND osp.spare_id = sp.id);

INSERT INTO order_services (order_id, service_id)
SELECT o.id, s.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN services s ON s.name = 'Замена тормозных колодок'
WHERE c.license_plate = '9012EF-7' AND o.description = 'Замена тормозных колодок'
  AND NOT EXISTS (SELECT 1 FROM order_services os WHERE os.order_id = o.id AND os.service_id = s.id);

INSERT INTO order_spares (order_id, spare_id)
SELECT o.id, sp.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN spares sp ON sp.part_number = 'BP-67890'
WHERE c.license_plate = '9012EF-7' AND o.description = 'Замена тормозных колодок'
  AND NOT EXISTS (SELECT 1 FROM order_spares osp WHERE osp.order_id = o.id AND osp.spare_id = sp.id);

INSERT INTO order_services (order_id, service_id)
SELECT o.id, s.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN services s ON s.name = 'Диагностика двигателя'
WHERE c.license_plate = '7890IJ-9' AND o.description = 'Диагностика и ремонт подвески'
  AND NOT EXISTS (SELECT 1 FROM order_services os WHERE os.order_id = o.id AND os.service_id = s.id);

INSERT INTO order_services (order_id, service_id)
SELECT o.id, s.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN services s ON s.name = 'Ремонт подвески'
WHERE c.license_plate = '7890IJ-9' AND o.description = 'Диагностика и ремонт подвески'
  AND NOT EXISTS (SELECT 1 FROM order_services os WHERE os.order_id = o.id AND os.service_id = s.id);

INSERT INTO order_spares (order_id, spare_id)
SELECT o.id, sp.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN spares sp ON sp.part_number = 'SH-54321'
WHERE c.license_plate = '7890IJ-9' AND o.description = 'Диагностика и ремонт подвески'
  AND NOT EXISTS (SELECT 1 FROM order_spares osp WHERE osp.order_id = o.id AND osp.spare_id = sp.id);
-- Демо-данные для PostgreSQL (без личных контактов). Выполняется после создания схемы Hibernate.
-- Идемпотентно: повторный запуск не дублирует строки по уникальным ключам.

-- Категории услуг (все поля сущности)
INSERT INTO service_categories (name, description)
SELECT 'ТО и диагностика', 'Плановое обслуживание, диагностика, замена расходников и жидкостей'
WHERE NOT EXISTS (SELECT 1 FROM service_categories WHERE name = 'ТО и диагностика');

INSERT INTO service_categories (name, description)
SELECT 'Тормозная система', 'Тормозные механизмы, колодки, диски, замена и обслуживание'
WHERE NOT EXISTS (SELECT 1 FROM service_categories WHERE name = 'Тормозная система');

INSERT INTO service_categories (name, description)
SELECT 'Подвеска и рулевое', 'Амортизаторы, сайлентблоки, рычаги, геометрия'
WHERE NOT EXISTS (SELECT 1 FROM service_categories WHERE name = 'Подвеска и рулевое');

INSERT INTO service_categories (name, description)
SELECT 'Кузовные работы', 'Покраска, рихтовка, антикор, полировка'
WHERE NOT EXISTS (SELECT 1 FROM service_categories WHERE name = 'Кузовные работы');

-- Марки и модели
INSERT INTO car_brand_model (brand, model)
SELECT 'Volkswagen', 'Passat'
WHERE NOT EXISTS (SELECT 1 FROM car_brand_model WHERE brand = 'Volkswagen' AND model = 'Passat');

INSERT INTO car_brand_model (brand, model)
SELECT 'Renault', 'Logan'
WHERE NOT EXISTS (SELECT 1 FROM car_brand_model WHERE brand = 'Renault' AND model = 'Logan');

INSERT INTO car_brand_model (brand, model)
SELECT 'Audi', 'Q5'
WHERE NOT EXISTS (SELECT 1 FROM car_brand_model WHERE brand = 'Audi' AND model = 'Q5');

INSERT INTO car_brand_model (brand, model)
SELECT 'Skoda', 'Octavia'
WHERE NOT EXISTS (SELECT 1 FROM car_brand_model WHERE brand = 'Skoda' AND model = 'Octavia');

INSERT INTO car_brand_model (brand, model)
SELECT 'Nissan', 'Qashqai'
WHERE NOT EXISTS (SELECT 1 FROM car_brand_model WHERE brand = 'Nissan' AND model = 'Qashqai');

-- Клиенты (включая address — в коде инициализатора не было)
INSERT INTO clients (first_name, last_name, phone, email, address, registration_date)
SELECT 'Иван', 'Петров', '+37500001001', 'client.demo1@example.com', 'г. Минск, ул. Примерная, д. 1, кв. 10', CURRENT_DATE - INTERVAL '2 months'
WHERE NOT EXISTS (SELECT 1 FROM clients WHERE phone = '+37500001001');

INSERT INTO clients (first_name, last_name, phone, email, address, registration_date)
SELECT 'Мария', 'Сидорова', '+37500001002', 'client.demo2@example.com', 'г. Минск, пр. Независимости, д. 50', CURRENT_DATE - INTERVAL '1 month'
WHERE NOT EXISTS (SELECT 1 FROM clients WHERE phone = '+37500001002');

INSERT INTO clients (first_name, last_name, phone, email, address, registration_date)
SELECT 'Алексей', 'Ковалёв', '+37500001003', 'client.demo3@example.com', 'г. Минск, ул. Техническая, д. 7', CURRENT_DATE - INTERVAL '5 days'
WHERE NOT EXISTS (SELECT 1 FROM clients WHERE phone = '+37500001003');

INSERT INTO clients (first_name, last_name, phone, email, address, registration_date)
SELECT 'Елена', 'Новикова', '+37500001004', 'client.demo4@example.com', 'г. Минск, ул. Логистическая, д. 3, оф. 12', CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM clients WHERE phone = '+37500001004');

-- Услуги (category_id, master_name, note заполнены)
INSERT INTO services (name, description, price, duration_minutes, category_id, available, master_name, note)
SELECT 'Замена масла', 'Замена моторного масла и масляного фильтра', 120.0, 60,
       (SELECT id FROM service_categories WHERE name = 'ТО и диагностика' LIMIT 1), true,
       'Сергей В.', 'Стандартное ТО по регламенту производителя'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Замена масла');

INSERT INTO services (name, description, price, duration_minutes, category_id, available, master_name, note)
SELECT 'Диагностика двигателя', 'Компьютерная диагностика двигателя и электроники', 80.0, 30,
       (SELECT id FROM service_categories WHERE name = 'ТО и диагностика' LIMIT 1), true,
       'Дмитрий Н.', 'Считывание кодов ошибок, проверка параметров в реальном времени'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Диагностика двигателя');

INSERT INTO services (name, description, price, duration_minutes, category_id, available, master_name, note)
SELECT 'Замена тормозных колодок', 'Замена передних/задних тормозных колодок', 150.0, 90,
       (SELECT id FROM service_categories WHERE name = 'Тормозная система' LIMIT 1), true,
       'Дмитрий Н.', 'Работы на подъёмнике, прокачка при необходимости'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Замена тормозных колодок');

INSERT INTO services (name, description, price, duration_minutes, category_id, available, master_name, note)
SELECT 'Ремонт подвески', 'Замена амортизаторов и сайлентблоков', 250.0, 180,
       (SELECT id FROM service_categories WHERE name = 'Подвеска и рулевое' LIMIT 1), true,
       'Андрей К.', 'Комплексная проверка узлов подвески'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Ремонт подвески');

INSERT INTO services (name, description, price, duration_minutes, category_id, available, master_name, note)
SELECT 'Покраска элемента', 'Покраска одной детали кузова', 300.0, 240,
       (SELECT id FROM service_categories WHERE name = 'Кузовные работы' LIMIT 1), true,
       'Павел С.', 'Подбор цвета по коду, локальная покраска'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Покраска элемента');

-- Механики
INSERT INTO mechanics (first_name, last_name, hire_date, phone)
SELECT 'Сергей', 'Васильев', CURRENT_DATE - INTERVAL '5 years', '+37500002001'
WHERE NOT EXISTS (SELECT 1 FROM mechanics WHERE phone = '+37500002001');

INSERT INTO mechanics (first_name, last_name, hire_date, phone)
SELECT 'Дмитрий', 'Николаев', CURRENT_DATE - INTERVAL '2 years', '+37500002002'
WHERE NOT EXISTS (SELECT 1 FROM mechanics WHERE phone = '+37500002002');

INSERT INTO mechanics (first_name, last_name, hire_date, phone)
SELECT 'Андрей', 'Козлов', CURRENT_DATE - INTERVAL '3 years', '+37500002003'
WHERE NOT EXISTS (SELECT 1 FROM mechanics WHERE phone = '+37500002003');

INSERT INTO mechanics (first_name, last_name, hire_date, phone)
SELECT 'Павел', 'Соколов', CURRENT_DATE - INTERVAL '1 year', '+37500002004'
WHERE NOT EXISTS (SELECT 1 FROM mechanics WHERE phone = '+37500002004');

-- Связь механик ↔ услуги
INSERT INTO mechanic_services (mechanic_id, service_id)
SELECT m.id, s.id FROM mechanics m CROSS JOIN services s
WHERE m.phone = '+37500002001' AND s.name IN ('Замена масла', 'Диагностика двигателя')
  AND NOT EXISTS (SELECT 1 FROM mechanic_services ms WHERE ms.mechanic_id = m.id AND ms.service_id = s.id);

INSERT INTO mechanic_services (mechanic_id, service_id)
SELECT m.id, s.id FROM mechanics m CROSS JOIN services s
WHERE m.phone = '+37500002002' AND s.name IN ('Замена масла', 'Замена тормозных колодок')
  AND NOT EXISTS (SELECT 1 FROM mechanic_services ms WHERE ms.mechanic_id = m.id AND ms.service_id = s.id);

INSERT INTO mechanic_services (mechanic_id, service_id)
SELECT m.id, s.id FROM mechanics m CROSS JOIN services s
WHERE m.phone = '+37500002003' AND s.name IN ('Диагностика двигателя', 'Ремонт подвески')
  AND NOT EXISTS (SELECT 1 FROM mechanic_services ms WHERE ms.mechanic_id = m.id AND ms.service_id = s.id);

INSERT INTO mechanic_services (mechanic_id, service_id)
SELECT m.id, s.id FROM mechanics m CROSS JOIN services s
WHERE m.phone = '+37500002004' AND s.name = 'Покраска элемента'
  AND NOT EXISTS (SELECT 1 FROM mechanic_services ms WHERE ms.mechanic_id = m.id AND ms.service_id = s.id);

-- Автомобили
INSERT INTO cars (brand_model_id, client_id, license_plate, vin, year)
SELECT (SELECT id FROM car_brand_model WHERE brand = 'Volkswagen' AND model = 'Passat' LIMIT 1),
       (SELECT id FROM clients WHERE phone = '+37500001001' LIMIT 1),
       '1234AB-5', 'WVWZZZ3CZJE123456', 2019
WHERE NOT EXISTS (SELECT 1 FROM cars WHERE license_plate = '1234AB-5');

INSERT INTO cars (brand_model_id, client_id, license_plate, vin, year)
SELECT (SELECT id FROM car_brand_model WHERE brand = 'Renault' AND model = 'Logan' LIMIT 1),
       (SELECT id FROM clients WHERE phone = '+37500001001' LIMIT 1),
       '5678CD-6', 'VF1LMJ76543123456', 2020
WHERE NOT EXISTS (SELECT 1 FROM cars WHERE license_plate = '5678CD-6');

INSERT INTO cars (brand_model_id, client_id, license_plate, vin, year)
SELECT (SELECT id FROM car_brand_model WHERE brand = 'Audi' AND model = 'Q5' LIMIT 1),
       (SELECT id FROM clients WHERE phone = '+37500001002' LIMIT 1),
       '9012EF-7', 'WAUZZZ8R6DA123456', 2022
WHERE NOT EXISTS (SELECT 1 FROM cars WHERE license_plate = '9012EF-7');

INSERT INTO cars (brand_model_id, client_id, license_plate, vin, year)
SELECT (SELECT id FROM car_brand_model WHERE brand = 'Skoda' AND model = 'Octavia' LIMIT 1),
       (SELECT id FROM clients WHERE phone = '+37500001003' LIMIT 1),
       '3456GH-8', 'TMBJM21Z3K1234567', 2021
WHERE NOT EXISTS (SELECT 1 FROM cars WHERE license_plate = '3456GH-8');

INSERT INTO cars (brand_model_id, client_id, license_plate, vin, year)
SELECT (SELECT id FROM car_brand_model WHERE brand = 'Nissan' AND model = 'Qashqai' LIMIT 1),
       (SELECT id FROM clients WHERE phone = '+37500001004' LIMIT 1),
       '7890IJ-9', 'SJNFDAJ11U1234567', 2023
WHERE NOT EXISTS (SELECT 1 FROM cars WHERE license_plate = '7890IJ-9');

-- Запчасти
INSERT INTO spares (name, part_number, price, quantity_in_stock, manufacturer)
SELECT 'Масляный фильтр', 'OF-12345', 15.0, 50, 'MANN-FILTER'
WHERE NOT EXISTS (SELECT 1 FROM spares WHERE part_number = 'OF-12345');

INSERT INTO spares (name, part_number, price, quantity_in_stock, manufacturer)
SELECT 'Тормозные колодки передние', 'BP-67890', 85.0, 20, 'Brembo'
WHERE NOT EXISTS (SELECT 1 FROM spares WHERE part_number = 'BP-67890');

INSERT INTO spares (name, part_number, price, quantity_in_stock, manufacturer)
SELECT 'Амортизатор передний', 'SH-54321', 180.0, 8, 'KYB'
WHERE NOT EXISTS (SELECT 1 FROM spares WHERE part_number = 'SH-54321');

INSERT INTO spares (name, part_number, price, quantity_in_stock, manufacturer)
SELECT 'Свеча зажигания', 'SP-98765', 12.0, 100, 'NGK'
WHERE NOT EXISTS (SELECT 1 FROM spares WHERE part_number = 'SP-98765');

INSERT INTO spares (name, part_number, price, quantity_in_stock, manufacturer)
SELECT 'Ремень ГРМ', 'BL-24680', 65.0, 15, 'Bosch'
WHERE NOT EXISTS (SELECT 1 FROM spares WHERE part_number = 'BL-24680');

-- Заказы (описание и суммы как в демо)
INSERT INTO orders (order_date, status, total_price, description, completion_date, car_id)
SELECT CURRENT_TIMESTAMP - INTERVAL '5 days', 'COMPLETED', 135.0, 'Плановое ТО', CURRENT_TIMESTAMP - INTERVAL '4 days',
       (SELECT id FROM cars WHERE license_plate = '1234AB-5' LIMIT 1)
WHERE NOT EXISTS (
  SELECT 1 FROM orders o JOIN cars c ON o.car_id = c.id
  WHERE c.license_plate = '1234AB-5' AND o.description = 'Плановое ТО' AND o.status = 'COMPLETED'
);

INSERT INTO orders (order_date, status, total_price, description, completion_date, car_id)
SELECT CURRENT_TIMESTAMP - INTERVAL '3 days', 'IN_PROGRESS', 235.0, 'Замена тормозных колодок', NULL,
       (SELECT id FROM cars WHERE license_plate = '9012EF-7' LIMIT 1)
WHERE NOT EXISTS (
  SELECT 1 FROM orders o JOIN cars c ON o.car_id = c.id
  WHERE c.license_plate = '9012EF-7' AND o.description = 'Замена тормозных колодок'
);

INSERT INTO orders (order_date, status, total_price, description, completion_date, car_id)
SELECT CURRENT_TIMESTAMP - INTERVAL '1 day', 'NEW', 510.0, 'Диагностика и ремонт подвески', NULL,
       (SELECT id FROM cars WHERE license_plate = '7890IJ-9' LIMIT 1)
WHERE NOT EXISTS (
  SELECT 1 FROM orders o JOIN cars c ON o.car_id = c.id
  WHERE c.license_plate = '7890IJ-9' AND o.description = 'Диагностика и ремонт подвески'
);

INSERT INTO orders (order_date, status, total_price, description, completion_date, car_id)
SELECT CURRENT_TIMESTAMP - INTERVAL '10 days', 'CANCELLED', 0.0, 'Клиент отменил запись', NULL,
       (SELECT id FROM cars WHERE license_plate = '5678CD-6' LIMIT 1)
WHERE NOT EXISTS (
  SELECT 1 FROM orders o JOIN cars c ON o.car_id = c.id
  WHERE c.license_plate = '5678CD-6' AND o.description = 'Клиент отменил запись'
);

-- Связи заказ ↔ услуги и запчасти
INSERT INTO order_services (order_id, service_id)
SELECT o.id, s.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN services s ON s.name = 'Замена масла'
WHERE c.license_plate = '1234AB-5' AND o.description = 'Плановое ТО'
  AND NOT EXISTS (SELECT 1 FROM order_services os WHERE os.order_id = o.id AND os.service_id = s.id);

INSERT INTO order_spares (order_id, spare_id)
SELECT o.id, sp.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN spares sp ON sp.part_number = 'OF-12345'
WHERE c.license_plate = '1234AB-5' AND o.description = 'Плановое ТО'
  AND NOT EXISTS (SELECT 1 FROM order_spares osp WHERE osp.order_id = o.id AND osp.spare_id = sp.id);

INSERT INTO order_services (order_id, service_id)
SELECT o.id, s.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN services s ON s.name = 'Замена тормозных колодок'
WHERE c.license_plate = '9012EF-7' AND o.description = 'Замена тормозных колодок'
  AND NOT EXISTS (SELECT 1 FROM order_services os WHERE os.order_id = o.id AND os.service_id = s.id);

INSERT INTO order_spares (order_id, spare_id)
SELECT o.id, sp.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN spares sp ON sp.part_number = 'BP-67890'
WHERE c.license_plate = '9012EF-7' AND o.description = 'Замена тормозных колодок'
  AND NOT EXISTS (SELECT 1 FROM order_spares osp WHERE osp.order_id = o.id AND osp.spare_id = sp.id);

INSERT INTO order_services (order_id, service_id)
SELECT o.id, s.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN services s ON s.name = 'Диагностика двигателя'
WHERE c.license_plate = '7890IJ-9' AND o.description = 'Диагностика и ремонт подвески'
  AND NOT EXISTS (SELECT 1 FROM order_services os WHERE os.order_id = o.id AND os.service_id = s.id);

INSERT INTO order_services (order_id, service_id)
SELECT o.id, s.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN services s ON s.name = 'Ремонт подвески'
WHERE c.license_plate = '7890IJ-9' AND o.description = 'Диагностика и ремонт подвески'
  AND NOT EXISTS (SELECT 1 FROM order_services os WHERE os.order_id = o.id AND os.service_id = s.id);

INSERT INTO order_spares (order_id, spare_id)
SELECT o.id, sp.id
FROM orders o
JOIN cars c ON o.car_id = c.id
JOIN spares sp ON sp.part_number = 'SH-54321'
WHERE c.license_plate = '7890IJ-9' AND o.description = 'Диагностика и ремонт подвески'
  AND NOT EXISTS (SELECT 1 FROM order_spares osp WHERE osp.order_id = o.id AND osp.spare_id = sp.id);
