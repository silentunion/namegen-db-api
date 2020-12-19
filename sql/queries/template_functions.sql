

CREATE OR REPLACE FUNCTION insert_part(_new_part VARCHAR, _part_column VARCHAR, _part_table VARCHAR)
RETURNS void AS
$BODY$
BEGIN 
	IF NOT EXISTS 
        (SELECT letter, cluster, syllable, stem, name
        FROM namegen.parts
        FULL JOIN namegen.letters USING(part_id)
        FULL JOIN namegen.clusters USING(part_id)
        FULL JOIN namegen.syllables USING(part_id)
        FULL JOIN namegen.stems USING(part_id)
        FULL JOIN namegen.names USING(part_id)
        WHERE letter = _new_part
           OR cluster = _new_part
           OR syllable = _new_part
           OR stem = _new_part
           OR name = _new_part)
    THEN
        WITH new_part_id AS (
            INSERT INTO namegen.parts (part_id) VALUES (DEFAULT)
            RETURNING part_id
        )
        INSERT INTO namegen._part_table (part_id, _part_column)
            VALUES((SELECT part_id FROM new_part_id), _new_part);
    ELSIF NOT EXISTS
        (SELECT _part_column
         FROM namegen._part_table
         WHERE _part_column = _new_part)
    THEN
        INSERT INTO namegen._part_table (part_id, _part_column)
            VALUES((SELECT part_id FROM namegen.parts
                    JOIN namegen.letters USING(part_id)
                    JOIN namegen.clusters USING(part_id)
                    JOIN namegen.syllables USING(part_id)
                    JOIN namegen.stems USING(part_id)
                    JOIN namegen.names USING(part_id)
                    WHERE letter = _new_part
                        OR cluster = _new_part
                        OR syllable = _new_part
                        OR stem = _new_part
                        OR name = _new_part), _new_part);
	END IF
END;
$BODY$ LANGUAGE 'plpgsql';