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
    enabled boolean not null default true,
    role_id int not null,
    constraint fk_app_user_role
		foreign key (role_id)
        references `role`(role_id)
);

CREATE table level_data (
	level_id int primary key auto_increment,
    level_name varchar(50) not null unique
);

CREATE table save_data (
	save_id int primary key auto_increment,
    user_id int not null,
    save_date datetime not null,
    save_name varchar(100) not null,
    level_id int not null,
    constraint fk_save_data_app_user
		foreign key (user_id)
        references app_user(user_id),
	constraint fk_save_data_level_data
		foreign key (level_id)
        references level_data(level_id)
);

INSERT into `role` (`name`) values
	('USER'),
    ('ADMIN');

INSERT into level_data (level_name) values
	("Test"),
    ("Test2");

delimiter //
CREATE procedure set_known_good_state()
BEGIN
    DELETE from save_data;
    ALTER table save_data auto_increment = 1;
    DELETE from app_user;
    ALTER table app_user auto_increment = 1;

    INSERT into app_user(username,password_hash, role_id) values
		("admin", "$2a$12$M97L0g/BETfVkdrWu98lWu29w1T232KW8CtJ8Q4XfP/NISiEy71xq", 2),
        ('test', "$2a$10$7JquBL6mi2OO85djCq4jUecR/aKurpmW8Niv1ohxNtoJdoNZPrcKK", 1);
        
	INSERT into save_data(user_id, save_date, save_name, level_id) values
		(2, current_timestamp(), "test", 2),
        (2, current_timestamp(), "test", 1);
	
end //
delimiter ;
