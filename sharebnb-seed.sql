INSERT INTO users (username, password, first_name, last_name, email, phone, is_admin)
VALUES
    ('testUser1', 'password1', 'first1', 'last1', 'e@e.com', '8187172020', FALSE),
    ('testUser2', 'password2', 'first2', 'last2', 'e@e.com', '8187172020', FALSE),
    ('adminUser', 'password3', 'first3', 'last3', 'e@e.com', '8187172020', TRUE);


INSERT INTO properties (title, address, description, price, owner)
VALUES
    ('awesome oasis', '123 awesome street, indio', 'awesome1', 250, 'testUser1'),
    ('bad oasis', '123 bad street, indio', 'bad1', 300, 'testUser2'),
    ('worse oasis', '123 worse street, indio', 'worse1', 350, 'adminUser');

INSERT INTO images (key, property_id)
VALUES
    ('horse.jpg', 1),
    ('horseRider.jpg', 2),
    ('testKey5', 3),
    ('testKey70', 3)