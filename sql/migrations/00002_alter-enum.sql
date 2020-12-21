ALTER TYPE namegen.enum_part_category RENAME VALUE 'letter' TO 'letters';
ALTER TYPE namegen.enum_part_category RENAME VALUE 'cluster' TO 'clusters';
ALTER TYPE namegen.enum_part_category RENAME VALUE 'syllable' TO 'syllables';
ALTER TYPE namegen.enum_part_category RENAME VALUE 'stem' TO 'stems';
ALTER TYPE namegen.enum_part_category RENAME VALUE 'name' TO 'names';

ALTER TABLE namegen.languages RENAME COLUMN category TO class;
ALTER TABLE namegen.themes RENAME COLUMN category TO topic;