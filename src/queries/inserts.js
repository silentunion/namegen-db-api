const database = require('../database/database');
const selects = require('./selects');

// Inserts new part_id and new part
exports.insert_new_part = async function (new_part, part_type, part_table) {
    await database.query(
        `WITH new_part_id AS (
            INSERT INTO namegen.parts (part_id) VALUES (DEFAULT)
            RETURNING part_id
        )
        INSERT INTO namegen.${part_table} (part_id, ${part_type})
        VALUES((SELECT part_id FROM new_part_id), '${new_part}');`);
};

exports.insert_part_type = async function (part_id, new_part, part_type, part_table) {
    await database.query(
        `INSERT INTO namegen.${part_table} (part_id, ${part_type})
        VALUES(${part_id}, '${new_part}');`);
};

exports.insert_collection_parts = async function (collection_name, part_name) {
    const col_id = await selects.getCollectionID(collection_name);
    const part_id = await selects.getPartID(part_name);

    await database.query(
        `INSERT INTO namegen.collection_parts (col_id, part_id)
         VALUES (${col_id}, ${part_id});`
    );
;}