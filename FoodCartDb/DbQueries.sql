use FoodCart
go

select *
from Users;

select * 
from Roles;

select u.FirstName, u.LastName, u.UserName, u.Email, r.Name as Role
from Users u 
inner join UserRoles ur on u.Id = ur.UserId
inner join Roles r on ur.RoleId = r.Id;

select * 
from FoodItems;

insert into FoodItems (Name, Description, Price, ImageUrl) values 
('Bread & Egg', 'Soft bread slices toasted with fluffy scrambled eggs, lightly seasoned for a simple, hearty breakfast.', 150, 'bread-egg.jpg'),
('Chicken Steak', 'Tender chicken fillet grilled to perfection, served with savory sauce and a side of fresh vegetables.', 500, 'chicken-steak.jpg'),
('Fried Rice', 'Fluffy rice stir-fried with veggies, eggs, and choice of protein, seasoned with soy sauce and spices.', 300, 'fried-rice.jpg'),
('Fries', 'Crispy golden fries, perfectly salted and served hot, ideal for snacking or as a side.', 100, 'fries.jpg'),
('Lobster', 'Succulent lobster cooked to perfection, served with melted butter and fresh lemon wedges.', 500, 'lobster.jpg'),
('Pancake', 'Fluffy pancakes stacked high, drizzled with syrup and topped with butter for a sweet breakfast treat.', 150, 'pancake.jpg'),
('Pizza', 'Cheesy, hot pizza topped with your favorite ingredients on a perfectly baked crust.', 600, 'pizza.jpg');

update FoodItems
set Description = 'Juicy grilled chicken patty, fresh lettuce, tomato, and creamy mayo, all tucked in a soft sesame bun.' 
where Id = 2;