const database = require('../database/database');
const selects = require('./selects');

// Inserts new part_id and new part
exports.insert_new_part = async function (part, category, collection, properties=null) {
    const cat_id = await selects.getCategoryId(category);
    const part_id = await database.query(`
        INSERT INTO namegen.parts (part) VALUES ('${part}')
            RETURNING part_id;`)
        .then(res => res.rows[0].part_id);

    await database.query(`
        INSERT INTO namegen.part_categories (part_id, cat_id)
        VALUES(${part_id}, ${cat_id});`);
    
    const col_id = await selects.getCollectionID(collection);

    console.log('col_id_works')

    const cp_id = await database.query(`
        INSERT INTO namegen.collection_parts (col_id, part_id)
        VALUES (${col_id}, ${part_id})
            RETURNING cp_id;`)
        .then(res => res.rows[0].cp_id);
    
    console.log('cp_id_works')

    console.log(properties)

    if (properties) {
        for (const [key, value] of Object.entries(properties)) {
            if (value) {
                prop_id = await selects.getPropertyID(key);

                await database.query(`
                    INSERT INTO namegen.part_properties (cp_id, prop_id)
                    VALUES (${cp_id}, ${prop_id});`);
            };
        }
    }
    
    console.log('props works')
};

exports.add_category_to_part = async function (new_part, category) {
    const cat_id = await selects.getCategoryId(category);
    const part_id = await selects.getPartID(new_part);

    await database.query(
        `INSERT INTO namegen.part_categories (part_id, cat_id)
        VALUES(${part_id}, ${cat_id});`);
};

exports.insert_collection_parts = async function (collection_name, part_name) {
    const col_id = await selects.getCollectionID(collection_name);
    const part_id = await selects.getPartID(part_name);

    await database.query(
        `INSERT INTO namegen.collection_parts (col_id, part_id)
         VALUES (${col_id}, ${part_id});`
    );
};

exports.insert_property = async function (collection_name, part_name, property_name) {

}