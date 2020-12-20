const database = require('../database/database');

// Queries to see if a part exists and returns the row
exports.partExists = async function (part) {
    const part_exists = await database.query(`
        SELECT * FROM namegen.parts
        WHERE part = '${part}';`);

    if (part_exists.rows.length === 1) {
        return true;
    } else if (part_exists.rows.length === 0) {
        return false;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

// Queries to see if the specific part type exists and returns the row
exports.partTypeExists = async function (part, category) {
    const part_type_exists = await database.query(`
        SELECT * FROM namegen.parts
        JOIN namegen.part_categories USING(part_id)
        JOIN namegen.categories USING(cat_id)
        WHERE part='${part}'
        AND category='${category}';`);
        
        if (part_type_exists.rows.length === 1) {
            return true;
        } else if (part_type_exists.rows.length === 0) {
            return false;
        } else {
            throw "Too many rows were discovered in part_types. Check database for duplicates"
        };
};

exports.getPartID = async function (part_name) {
    const part = await database.query(
        `SELECT part_id FROM namegen.parts
         WHERE part = '${part_name}';`);

    if (part.rows.length === 1) {
        return part.rows[0].part_id;
    } else {
        return undefined;
    };
};

exports.getCategoryId = async function (category_name) {
    const cat = await database.quert(
        `SELECT cat_id FROM namegen.categories
         WHERE category = '${category_name}';`);

    if (cat.rows.length === 1) {
        return cat.rows[0].cat_id;
    } else {
        return undefined;
    };
};

exports.getCollectionID = async function (collection_name) {
    const col = await database.query(
        `SELECT col_id FROM namegen.collections
         WHERE collection=${collection_name};`);
        
    if (col.rows.length === 1) {
        return col.rows[0].col_id;
    } else {
        return undefined;
    };
};

exports.getPropertyID = async function (property_name) {
    const prop = await database.query(
        `SELECT prop_id FROM namegen.properties
         WHERE property=${property_name};`);
        
    if (prop.rows.length === 1) {
        return prop.rows[0].prop_id;
    } else {
        return undefined;
    };
};

exports.getCollectionPartID = async function (collection_name, part_name) {
    const cp_id = await database.query(
        `SELECT cp_id FROM namegen.collection_parts
         JOIN namegen.collections USING(col_id)
         JOIN namegen.parts USING(part_id)
         JOIN namegen.part_letters USING(part_id)
         JOIN namegen.part_clusters USING(part_id)
         JOIN namegen.part_syllables USING(part_id)
         JOIN namegen.part_stems USING(part_id)
         JOIN namegen.part_names USING(part_id)
         WHERE collection = '${collection_name}' AND
               part =       '${part_name}';`
    );
}