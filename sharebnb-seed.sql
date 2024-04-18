INSERT INTO users (username, password, first_name, last_name, email, phone, is_admin)
VALUES
    ('testUser1', '$2b$12$ZrgLN.tR45zznBNxED1/BeWUc0KXe7TP1xfc5dPbIoH0hKdYfcDJy', 'first1', 'last1', 'e@e.com', '8187172020', FALSE),
    ('testUser2', '$2b$12$ZrgLN.tR45zznBNxED1/BeWUc0KXe7TP1xfc5dPbIoH0hKdYfcDJy', 'first2', 'last2', 'e@e.com', '8187172020', FALSE),
    ('adminUser', '$2b$12$ZrgLN.tR45zznBNxED1/BeWUc0KXe7TP1xfc5dPbIoH0hKdYfcDJy', 'first3', 'last3', 'e@e.com', '8187172020', TRUE);

INSERT INTO properties (title, address, description, price, owner)
VALUES
    ('awesome oasis', '123 awesome street, indio', 'awesome1', 250, 'testUser1'),
    ('bad oasis', '123 bad street, indio', 'bad1', 300, 'testUser2'),
    ('tranquil retreat', '456 tranquil avenue, indio', 'A serene and quiet getaway perfect for relaxation', 275, 'testUser1'),
    ('urban loft', '789 urban road, indio', 'Stylish urban loft with modern amenities and close to city life', 320, 'testUser2'),
    ('country home', '321 country lane, indio', 'Spacious country home with beautiful natural surroundings', 375, 'adminUser'),
    ('worse oasis', '123 worse street, indio', 'worse1', 350, 'adminUser'),
    ('lake view condo', '101 lakeview circle, indio', 'Condo with a beautiful view of the lake and modern amenities', 295, 'testUser1'),
    ('mountain cabin', '202 mountain pass, indio', 'Cozy cabin located in the mountains, perfect for a peaceful retreat', 360, 'testUser2'),
    ('suburban bungalow', '303 suburban street, indio', 'Charming bungalow in a quiet suburban neighborhood', 330, 'adminUser'),
    ('downtown flat', '404 downtown plaza, indio', 'Modern flat in the heart of downtown, close to shopping and nightlife', 350, 'testUser1'),
    ('beachfront villa', '505 beachside boulevard, indio', 'Luxurious villa right on the beach, ideal for summer getaways', 400, 'testUser2'),
    ('rustic farmhouse', '606 farm road, indio', 'Spacious farmhouse with rustic charm and expansive fields', 380, 'adminUser');

INSERT INTO images (key, property_id)
VALUES
    ('barbie.jpg', 1),
    ('getaway.jpg', 2),
    ('tin.jpg', 3),
    ('desert.jpg', 4),
    ('haunted.jpg', 5),
    ('tiny.jpg', 6),
    ('forrest.jpg', 7),
    ('eames.jpg', 8),
    ('water.jpg', 9),
    ('uc.jpg', 10),
    ('yard.jpg', 11),
    ('nice.jpg', 12)