-- Populate warehouses
INSERT INTO
    warehouses (name, address)
VALUES
    ('Ligma Baos', row('469', 'Cardigan Street', 'Carlton', 'VIC', '3053')),
    ('Useless Clowns Inc.', row(NULL, 'Spring Street', 'East Melbourne', 'VIC', '3002')),
    ('Foodbank A', row('57', 'UniversUity Street', 'Carlton', 'VIC', '3053')),
    ('Leftover Popcorns', row('380', 'Lygon Street', 'Carlton', 'VIC', '3053')),
    ('Free Food Club', row('401', 'Cardigan Street', 'Carlton', 'VIC', '3053'));

-- Creates Monday-Friday schedules for these
CALL create_workdays_schedule('Ligma Baos', '09:00', '17:00', 'Australia/Melbourne');
CALL create_workdays_schedule('Useless Clowns Inc.', '08:30', '17:30', 'Australia/Melbourne');

-- Populate messages
CALL send_message_to_warehouse_by_name(
    -- Warehouse name
    'Ligma Baos',
    -- Title
    'IT''S JOEVER!',
    -- Body
    'We''re so done bro');
CALL send_message_to_warehouse_by_name(
    -- Warehouse name
    'Foodbank A',
    -- Title
    'Someone has collected your donated meal',
    -- Body
    'Thank you so much for donating and storing!');
CALL send_message_to_warehouse_by_name(
    -- Warehouse name
    'Foodbank A',
    -- Title
    'Someone has collected your donated meal',
    -- Body
    'Thank you so much for donating and storing!');
CALL send_message_to_warehouse_by_name(
    -- Warehouse name
    'Free Food Club',
    -- Title
    'Lorem ipsum',
    -- Body
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.');
CALL send_message_to_warehouse_by_name(
    -- Warehouse name
    'Free Food Club',
    -- Title
    'Lorem ipsum',
    -- Body
    'Жят ыт жольюта льаорыыт. Ыльит компрэхэнжам ад мыа. Фачтидёе атоморюм конжтетуто нэ хаж, ед зюаз дылыктуч жят. Мыа ты пытынтёюм патриоквюы, эи дуо льаборэ рыкючабо. Ведят рыпудяары квуй ад. Эа омниюм анкилльаы элыктрам эож, нэ аффэрт лобортис адвыржаряюм нык.');
CALL send_message_to_warehouse_by_name(
    -- Warehouse name
    'Ligma Baos',
    -- Title
    'منتص',
    -- Body
    'الأوضاع التخطيط في أضف, ومن جنوب أعمال الإتفاقية إذ, ولم الشهير التغييرات ان. ثمّة ونتج صفحة إذ عرض. ٣٠ يبق إحكام واقتصار التقليدي, الى كرسي والفلبين ان, منتصف وبداية و قبل. ٣٠ تمهيد السفن الأوروبية شيء. أطراف انتباه الأهداف كلا أم, الصفحة وبولندا الإنزال دون قد, الخارجية التجارية عدد عل');