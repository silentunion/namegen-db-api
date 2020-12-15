INSERT INTO namegen.cluster (cluster)
    SELECT {cluster}
    WHERE NOT EXISTS (SELECT cluster FROM namegen.cluster WHERE cluster = {cluster});


DO $$
DECLARE

BEGIN 
	IF NOT EXISTS
        (SELECT letter, cluster, syllable
        FROM ng.parts
        FULL JOIN ng.letters USING(part_id)
        FULL JOIN ng.clusters USING(part_id)
        FULL JOIN ng.syllables USING(part_id)
        WHERE letter=part OR cluster=part OR syllable='a')
    THEN
		INSERT INTO ng.parts (part_id) VALUES (53);
        INSERT INTO ng.syllables (part_id, syllable)
        VALUES ((SELECT MAX(part_id) FROM ng.parts), 'a');
    ELSE IF NOT EXISTS
        (SELECT letter
         FROM ng.letters
         WHERE letter='a')
    THEN INSERT INTO value
	END IF;
END $$
        