use jmdb11;

CREATE TABLE genres (
	genre_id	INT NOT NULL AUTO_INCREMENT,
    genre		varchar(50) NOT NULL, 
    PRIMARY KEY (genre_id)
);

INSERT INTO genres (genre)
    VALUES ('Alternative'),
    ('Blues'),
    ('Children’s Music'),
    ('Classical'),
    ('Comedy'),
    ('Country'),
    ('Dance'),
    ('Easy Listening'),
    ('Electronic'),
    ('Hip-Hop/Rap'),
    ('Holiday'),
    ('Indie'),
    ('Industrial'),
    ('Christian/Gospel'),
    ('Instrumental'),
    ('Jazz'),
    ('Latin'),
    ('Metal'),
    ('New Age'),
    ('Opera'), 
    ('Pop'), 
    ('R&B/Soul'),
    ('Reggae'),
    ('Rock'),
    ('World'),
