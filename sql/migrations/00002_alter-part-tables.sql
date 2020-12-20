DROP TABLE IF EXISTS
    namegen.part_letters,
    namegen.part_clusters,
    namegen.part_syllables,
    namegen.part_stems,
    namegen.part_names;

ALTER TABLE namegen.parts
ADD COLUMN part VARCHAR;

CREATE TABLE IF NOT EXISTS namegen.categories (
    cat_id SERIAL PRIMARY KEY,
    category VARCHAR
);

CREATE TABLE IF NOT EXISTS namegen.part_categories (
    pc_id SERIAL PRIMARY KEY,
    part_id INTEGER,
    cat_id INTEGER,
    CONSTRAINT part_categories_part_id_fkey FOREIGN KEY (part_id) REFERENCES namegen.parts (part_id) ON DELETE CASCADE,
    CONSTRAINT part_categories_cat_id_fkey FOREIGN KEY (cat_id) REFERENCES namegen.categories (cat_id) ON DELETE CASCADE
);