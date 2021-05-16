use jmdb11;


CREATE TABLE Bands (
	band_id	INT NOT NULL AUTO_INCREMENT,
    band_name VARCHAR (50) NOT NULL,
    genre_id INT NOT NULL,
    subgenre_id INT NOT NULL, 
    origin VARCHAR(50) NOT NULL,
    yearsActive VARCHAR(40) NOT NULL,
    website VARCHAR(60) NOT NULL,
    currentMembers VARCHAR(100) NOT NULL,
    history_id INT NOT NULL,
    
    PRIMARY KEY (band_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id),
    FOREIGN KEY (subgenre_id) REFERENCES subgenres(subgenre_id),
    FOREIGN KEY (history_id) REFERENCES BandHistory(id)
);

CREATE TABLE BandHistory(
	id  INT NOT NULL AUTO_INCREMENT,
    bio VARCHAR(1000) NOT NULL,  
    past_members VARCHAR(300) NULL,
    PRIMARY KEY (id)
);


CREATE TABLE Albums(
	id	INT NOT NULL AUTO_INCREMENT,
    album_name VARCHAR(100) NOT NULL,
    release_date VARCHAR(20) NOT NULL,
    length VARCHAR(10) NOT NULL,
    band_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (band_id) REFERENCES Bands(band_id)
    
);

CREATE TABLE songs(
	id INT NOT NULL AUTO_INCREMENT,
    song_name VARCHAR(30) NOT NULL,
    length VARCHAR (10) NOT NULL,
    album_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (album_id) REFERENCES Albums(id)
);

ALTER TABLE songs
ADD FOREIGN KEY (band_id) REFERENCES bands(band_id);



select * from songs


