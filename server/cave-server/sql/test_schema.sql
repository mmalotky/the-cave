DROP database if exists the_cave_test;
CREATE database the_cave_test;
USE the_cave_test;

CREATE table `role` (
	role_id int primary key auto_increment,
    `name` varchar(50) unique not null
);

CREATE table app_user (
	user_id int primary key auto_increment,
    username varchar(100) unique not null,
    password_hash varchar(2048) not null,
    role_id int not null,
    constraint fk_app_user_role
		foreign key (role_id)
        references `role`(role_id)
);

INSERT into `role` (`name`) values
	('USER'),
    ('ADMIN');

delimiter //
CREATE procedure set_known_good_state()
BEGIN

    DELETE from app_user;
    ALTER table app_user auto_increment = 1;


    INSERT into app_user(username,password_hash, role_id) values
		("admin", "$2a$12$M97L0g/BETfVkdrWu98lWu29w1T232KW8CtJ8Q4XfP/NISiEy71xq", 2),
        ('test', "$2a$10$7JquBL6mi2OO85djCq4jUecR/aKurpmW8Niv1ohxNtoJdoNZPrcKK", 1);

end //
delimiter ;
