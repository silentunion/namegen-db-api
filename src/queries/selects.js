const database = require('../database/database');

// Queries to see if a part exists and returns the row
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

// Queries to see if the specific part type exists and returns the row
exports.partTypeExists = async function (new_part, part_type, part_table) {
    const part_type_exists = await database.query(
    `SELECT ${part_type}
        FROM namegen.${part_table}
        WHERE ${part_type} = '${new_part}';`);
        
    if (part_type_exists.rows.length === 1) {
        return part_type_exists.rows;
    } else {
        return undefined;
    };
};

exports.getCollectionID = async function (collection_name) {
    const col_id = await database.query(
    `SELECT col_id FROM namegen.collections
    WHERE collection=${collection_name};`);
        
    if (col.rows.length === 1) {
        return col_id.rows[0].col_id;
    } else {
        return undefined;
    };
};