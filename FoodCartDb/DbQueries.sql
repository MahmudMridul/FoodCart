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
('Biriyani', 'Chicken biriyani', 200, 'biriyani.jpg'),
('Burger', 'Chicken burger', 200, 'burger.jpg');

update FoodItems
set Description = 'Juicy grilled chicken patty, fresh lettuce, tomato, and creamy mayo, all tucked in a soft sesame bun.' 
where Id = 2;