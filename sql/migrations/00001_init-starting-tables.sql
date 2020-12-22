CREATE TYPE namegen.enum_part_category
AS ENUM('letter', 'cluster', 'syllable', 'stem', 'name');

-- PARTS --
CREATE TABLE namegen.parts (
    part_id SERIAL PRIMARY KEY,
    part VARCHAR,
    category namegen.enum_part_category
);

-- COLLECTIONS --
CREATE TABLE namegen.languages (
    lang_id SERIAL PRIMARY KEY,
    language VARCHAR,
    category VARCHAR,
    region VARCHAR
);

CREATE TABLE namegen.themes (
    theme_id SERIAL PRIMARY KEY,
    theme VARCHAR,
    category VARCHAR
);

CREATE TABLE namegen.collections (
    col_id SERIAL PRIMARY KEY,
    lang_id INTEGER,
    theme_id INTEGER,
    collection VARCHAR,
    CONSTRAINT collections_lang_id_fkey FOREIGN KEY (lang_id) REFERENCES namegen.languages (lang_id) ON DELETE CASCADE,
    CONSTRAINT collections_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES namegen.themes (theme_id) ON DELETE CASCADE
);

-- PROPERTIES --
CREATE TABLE namegen.properties (
    prop_id SERIAL PRIMARY KEY,
    property VARCHAR
);

-- MANY TO MANY TABLES --
CREATE TABLE namegen.collection_parts (
    cp_id SERIAL PRIMARY KEY,
    col_id INTEGER,
    part_id INTEGER,
    CONSTRAINT collection_parts_col_id_fkey FOREIGN KEY (col_id) REFERENCES namegen.collections (col_id) ON DELETE CASCADE,
    CONSTRAINT collection_parts_part_id_fkey FOREIGN KEY (part_id) REFERENCES namegen.parts (part_id) ON DELETE CASCADE
);

CREATE TABLE namegen.part_properties (
    pp_id SERIAL PRIMARY KEY,
    cp_id INTEGER,
    prop_id INTEGER,
    CONSTRAINT part_properties_cp_id_fkey FOREIGN KEY (cp_id) REFERENCES namegen.collection_parts (cp_id) ON DELETE CASCADE,
    CONSTRAINT part_properties_prop_id_fkey FOREIGN KEY (prop_id) REFERENCES namegen.properties (prop_id) ON DELETE CASCADE
);

-- STATISTICS --
CREATE TABLE namegen.part_statistics (
    ps_id SERIAL PRIMARY KEY,
    cp_id INTEGER,
    frequency DECIMAL,
    CONSTRAINT part_statistics_cp_id_fkey FOREIGN KEY (cp_id) REFERENCES namegen.collection_parts (cp_id) ON DELETE CASCADE
);
