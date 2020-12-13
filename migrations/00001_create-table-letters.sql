
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

CREATE TABLE namegen.parts_words (
    part_id INTEGER,
    word VARCHAR,
    CONSTRAINT parts_words_pkey PRIMARY KEY (part_id)
    CONSTRAINT parts_words_part_id_fkey FOREIGN KEY (part_id) REFERENCES namegen.parts (part_id) ON DELETE CASCADE
);

CREATE TABLE namegen.parts_names (
    part_id INTEGER,
    name VARCHAR,
    CONSTRAINT parts_names_pkey PRIMARY KEY (part_id)
    CONSTRAINT parts_names_part_id_fkey FOREIGN KEY (part_id) REFERENCES namegen.parts (part_id) ON DELETE CASCADE
);

CREATE TABLE namegen.languages (
    lang_id SERIAL PRIMARY KEY,
    language VARCHAR,
    region VARCHAR
);

CREATE TABLE namegen.alphabets (
    alpha_id SERIAL PRIMARY KEY,
    lang_id INTEGER,
    part_id INTEGER,
    is_vowel BOOLEAN,
    frequency DECIMAL,
    CONSTRAINT alphabets_lang_id_fkey FOREIGN KEY (lang_id) REFERENCES namegen.languages (lang_id) ON DELETE CASCADE,
    CONSTRAINT alphabets_part_id_fkey FOREIGN KEY (part_id) REFERENCES namegen.parts (part_id) ON DELETE CASCADE
);

CREATE TABLE namegen.themes (
    theme_id SERIAL PRIMARY KEY,
    theme VARCHAR,
    description TEXT
);

CREATE TABLE namegen.collections (
    col_id SERIAL PRIMARY KEY,
    lang_id INTEGER,
    theme_id INTEGER,
    collection VARCHAR,
    description TEXT,
    CONSTRAINT collections_lang_id_fkey FOREIGN KEY (lang_id) REFERENCES namegen.languages (lang_id) ON DELETE CASCADE,
    CONSTRAINT collections_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES namegen.themes (theme_id) ON DELETE CASCADE
);

CREATE TABLE namegen.statistics (
    stats_id SERIAL PRIMARY KEY,
    col_id INTEGER,
    part_id INTEGER,
    frequency DECIMAL,
    meaning TEXT,
    CONSTRAINT statistics_col_id_fkey FOREIGN KEY (col_id) REFERENCES namegen.collections (col_id) ON DELETE CASCADE,
    CONSTRAINT statistics_part_id_fkey FOREIGN KEY (part_id) REFERENCES namegen.parts (part_id) ON DELETE CASCADE
);
