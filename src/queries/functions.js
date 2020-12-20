const database = require('../database/database');

// Queries to see if a part exists and returns the part id
exports.partExists = async function (new_part) {
    const part_exists = await database.query(`
        SELECT *
            FROM namegen.parts
            FULL JOIN namegen.part_letters USING(part_id)
            FULL JOIN namegen.part_clusters USING(part_id)
            FULL JOIN namegen.part_syllables USING(part_id)
            FULL JOIN namegen.part_stems USING(part_id)
            FULL JOIN namegen.part_names USING(part_id)
            WHERE 
                letter =   '${new_part}' OR
                cluster =  '${new_part}' OR
                syllable = '${new_part}' OR
                stem =     '${new_part}' OR
                name =     '${new_part}'
        `);
    
    if (part_exists.rows.length === 1) {
        return part_exists.rows;
    } else {
        return undefined;
    };
};