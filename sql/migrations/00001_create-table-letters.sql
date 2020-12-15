-- PARTS --
CREATE TABLE namegen.parts (
    part_id SERIAL PRIMARY KEY
);

CREATE TABLE namegen.parts_letters (
    part_id INTEGER,
    letter VARCHAR,
    CONSTRAINT parts_letters_pkey PRIMARY KEY (part_id)
    CONSTRAINT parts_letters_part_id_fkey FOREIGN KEY (part_id) REFERENCES namegen.parts (part_id) ON DELETE CASCADE
);

CREATE TABLE namegen.parts_syllables (
    part_id INTEGER,
    syllable VARCHAR,
    CONSTRAINT parts_syllables_pkey PRIMARY KEY (part_id)
    CONSTRAINT parts_syllables_part_id_fkey FOREIGN KEY (part_id) REFERENCES namegen.parts (part_id) ON DELETE CASCADE
);

CREATE TABLE namegen.parts_clusters (
    part_id INTEGER,
    cluster VARCHAR,
    CONSTRAINT parts_clusters_pkey PRIMARY KEY (part_id)
    CONSTRAINT parts_clusters_part_id_fkey FOREIGN KEY (part_id) REFERENCES namegen.parts (part_id) ON DELETE CASCADE
);

-- NAMES, LANGUAGES, THEMES --
CREATE TABLE namegen.names (
    name_id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE namegen.languages (
    lang_id SERIAL PRIMARY KEY,
    language VARCHAR,
    region VARCHAR
);

CREATE TABLE namegen.themes (
    theme_id SERIAL PRIMARY KEY,
    theme VARCHAR,
    description TEXT
);

-- COLLECTIONS BASED ON A THEME OF A LANGUAGE --
CREATE TABLE namegen.collections (
    col_id SERIAL PRIMARY KEY,
    lang_id INTEGER,
    theme_id INTEGER,
    collection VARCHAR,
    description TEXT,
    CONSTRAINT collections_lang_id_fkey FOREIGN KEY (lang_id) REFERENCES namegen.languages (lang_id) ON DELETE CASCADE,
    CONSTRAINT collections_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES namegen.themes (theme_id) ON DELETE CASCADE
);

-- MANY TO MANY TABLES --
CREATE TABLE namegen.language_parts (
    lp_id SERIAL PRIMARY KEY,
    lang_id INTEGER,
    part_id INTEGER,
    is_vowel BOOLEAN,
    frequency DECIMAL,
    CONSTRAINT alphabets_lang_id_fkey FOREIGN KEY (lang_id) REFERENCES namegen.languages (lang_id) ON DELETE CASCADE,
    CONSTRAINT alphabets_part_id_fkey FOREIGN KEY (part_id) REFERENCES namegen.parts (part_id) ON DELETE CASCADE
);

CREATE TABLE namegen.collection_names (
    cn_id SERIAL PRIMARY KEY,
    col_id INTEGER,
    name_id INTEGER,
    frequency DECIMAL,
    meaning TEXT,
    CONSTRAINT collection_names_col_id_fkey FOREIGN KEY (col_id) REFERENCES namegen.collections (col_id) ON DELETE CASCADE,
    CONSTRAINT collection_names_name_id_fkey FOREIGN KEY (name_id) REFERENCES namegen.names (name_id) ON DELETE CASCADE
);

-- SEPARATE ALGORITHMS SECTION (new schema?) --
CREATE TABLE ngtesting.algorithms (
    alg_id SERIAL PRIMARY KEY,
    algorithm VARCHAR,
    description TEXT
);

CREATE TABLE ngtesting.analysis (
    ana_id SERIAL PRIMARY KEY,
    alg_id INTEGER,
    description TEXT,
    CONSTRAINT analysis_alg_id_fkey FOREIGN KEY (alg_id) REFERENCES ngtesting.algorithms (alg_id) ON DELETE CASCADE
);

CREATE TABLE ngtesting.statistics (
    stats_id SERIAL PRIMARY KEY,
    ana_id INTEGER,
    col_id INTEGER,
    frequency DECIMAL,
    CONSTRAINT statistics_ana_id_fkey FOREIGN KEY (ana_id) REFERENCES ngtesting.analysis (ana_id) ON DELETE CASCADE
);

CREATE TABLE ngtesting.stat_parts (
    stats_id INTEGER,
    part_id INTEGER,
    CONSTRAINT stat_parts_pkey PRIMARY KEY (stats_id)
    CONSTRAINT stat_parts_part_id_fkey FOREIGN KEY (part_id) REFERENCES namegen.parts (part_id) ON DELETE CASCADE
);

CREATE TABLE ngtesting.stat_names (
    stats_id INTEGER,
    name_id INTEGER,,
    CONSTRAINT stat_names_pkey PRIMARY KEY (stats_id)
    CONSTRAINT stat_names_name_id_fkey FOREIGN KEY (name_id) REFERENCES namegen.names (name_id) ON DELETE CASCADE
);