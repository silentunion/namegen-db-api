INSERT INTO namegen.cluster (cluster)
    SELECT {cluster}
    WHERE NOT EXISTS (SELECT cluster FROM namegen.cluster WHERE cluster = {cluster});

-- If value doesn't exist at all,
    -- insert it with new part id
-- If value does exist,
    -- check if already the type requested, If type does exist
            -- do nothing
    -- If type doesn't exist
            -- get the part_id from the existing type and add the part to the requested type
DO $$
BEGIN 
	IF NOT EXISTS 
        (SELECT letter, cluster, syllable
        FROM ng.parts
        FULL JOIN ng.letters USING(part_id)
        FULL JOIN ng.clusters USING(part_id)
        FULL JOIN ng.syllables USING(part_id)
        WHERE letter='${new_part}' OR cluster='${new_part}' OR syllable='${new_part}')
    THEN
		INSERT INTO ng.parts (part_id) VALUES (new_id);
        INSERT INTO ng.syllables (part_id, syllable)
        VALUES ((SELECT MAX(part_id) FROM ng.parts), '${new_part}');
    ELSE IF NOT EXISTS
        (SELECT letter
         FROM ng.letters
         WHERE letter='a')
    THEN INSERT INTO value
	END IF;
END $$


-- Template Collection Insert --
INSERT INTO namegen.languages (language)
    SELECT '{language}'
    WHERE NOT EXISTS (
        SELECT 1 FROM namegen.languages WHERE language='{language}'
    );

INSERT INTO namegen.themes (theme)
    SELECT '{theme}'
    WHERE NOT EXISTS (
        SELECT 1 FROM namegen.themes WHERE theme='{theme}'
    );

INSERT INTO namegen.collections (lang_id, theme_id, collection)
    SELECT (SELECT lang_id FROM namegen.languages WHERE language='{language}'),
           (SELECT theme_id FROM namegen.themes WHERE theme='{theme}'),
           '{collection}'
    WHERE NOT EXISTS (
        SELECT 1 FROM namegen.collections WHERE collection='collection'
    );