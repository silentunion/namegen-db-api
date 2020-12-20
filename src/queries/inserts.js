const database = require('../database/database');
const selects = require('./selects');

// Inserts new part_id and new part
exports.insert_new_part = async function (new_part, part_type, part_table) {
    const insert_new_part = await database.query(
        `WITH new_part_id AS (
            INSERT INTO namegen.parts (part_id) VALUES (DEFAULT)
            RETURNING part_id
        )
        INSERT INTO namegen.${part_table} (part_id, ${part_type})
        VALUES((SELECT part_id FROM new_part_id), '${new_part}');`);
};

