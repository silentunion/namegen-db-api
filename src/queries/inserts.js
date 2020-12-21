const database = require('../database/database');
const selects = require('./selects');

// Inserts new part_id and new part
exports.insert_part = async function (part, category) {
    const part_id = await database.query(`
        INSERT INTO namegen.parts (part, category)
        VALUES ('${part}', '${category}')
            RETURNING part_id;`)
        .then(res => res.rows[0].part_id);

    return part_id;
};

exports.add_part_to_collection = async function (part, category, collection) {
    const col_id = await selects.getCollectionID(collection);
    const part_id = await selects.getPartID(part, category);

    const cp_id = await database.query(`
        INSERT INTO namegen.collection_parts (col_id, part_id)
        VALUES (${col_id}, ${part_id})
            RETURNING cp_id;`)
        .then(res => res.rows[0].cp_id);
    
    return cp_id;
};

exports.apply_properties_to_part = async function (part, category, collection, properties) {
    const cp_id = await selects.getCollectionPartID(part, category, collection);
    
    if (properties.length) {
        for (property of properties) {
            let prop_id = await selects.getPropertyID(property);
            let part_prop_exists = await selects.partPropertyExists(cp_id, prop_id);

            if (!part_prop_exists) {
                await database.query(`
                    INSERT INTO namegen.part_properties (cp_id, prop_id)
                    VALUES (${cp_id}, ${prop_id});`);
            }
        }
    };
};
