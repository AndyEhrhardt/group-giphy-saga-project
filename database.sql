CREATE DATABASE "giphy_search_favorites";

-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key


CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

INSERT INTO "category" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

CREATE TABLE "favorite"(
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR (250),
    "category_id" INT REFERENCES "category" 
);

SELECT "name", "url", "category_id"
FROM "category"
JOIN "favorite" ON "favorite".category_id = "category".id;

CREATE TABLE "favorite"(
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR (250),
    "category_id" INT REFERENCES "category" 
);

SELECT "name", "url", "category_id"
FROM "category"
JOIN "favorite" ON "favorite".category_id = "category".id;