DROP DATABASE IF EXISTS korean_dictionary;

CREATE DATABASE korean_dictionary;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS entries;

CREATE TABLE IF NOT EXISTS entries(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    korean VARCHAR(45) NOT NULL,
    classification VARCHAR (45) NOT NULL,
    part_of_speech VARCHAR (45) NOT NULL,
    original_language VARCHAR (45),
    vocabulary_by_level VARCHAR (45) NOT NULL,
    meaning_korean TEXT NOT NULL,
    english VARCHAR(135) NOT NULL,
    meaning_english TEXT NOT NULL
);

\COPY entries(
    korean,
    classification,
    part_of_speech,
    original_language,
    vocabulary_by_level,
    meaning_korean,
    english,
    meaning_english
) FROM '/Users/julienshim/Developer/nlp_korean/custom_dictionary.csv'
DELIMITER ','
CSV HEADER;