
const insert = `DO $$
BEGIN 
    IF NOT EXISTS 
        (SELECT *
            FROM namegen.parts
            FULL JOIN namegen.part_letters USING(part_id)
            FULL JOIN namegen.part_clusters USING(part_id)
            FULL JOIN namegen.part_syllables USING(part_id)
            FULL JOIN namegen.part_stems USING(part_id)
            FULL JOIN namegen.part_names USING(part_id)
            WHERE letter = '${new_part}'
              OR cluster = '${new_part}'
             OR syllable = '${new_part}'
                 OR stem = '${new_part}'
                 OR name = '${new_part}')
    THEN
        WITH new_part_id AS (
            INSERT INTO namegen.parts (part_id) VALUES (DEFAULT)
            RETURNING part_id
        )
        INSERT INTO namegen.${part_table} (part_id, ${part_type})
            VALUES((SELECT part_id FROM new_part_id), '${new_part}');
    ELSIF NOT EXISTS
        (SELECT ${part_type}
        FROM namegen.${part_table}
        WHERE ${part_type} = '${new_part}')
    THEN
        INSERT INTO namegen.${part_table} (part_id, ${part_type})
            VALUES((SELECT part_id
                FROM namegen.parts
                FULL JOIN namegen.part_letters USING(part_id)
                FULL JOIN namegen.part_clusters USING(part_id)
                FULL JOIN namegen.part_syllables USING(part_id)
                FULL JOIN namegen.part_stems USING(part_id)
                FULL JOIN namegen.part_names USING(part_id)
                WHERE letter = '${new_part}'
                  OR cluster = '${new_part}'
                 OR syllable = '${new_part}'
                     OR stem = '${new_part}'
                     OR name = '${new_part}'), '${new_part}');
    END IF;
END $$`
