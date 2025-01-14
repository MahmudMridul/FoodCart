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