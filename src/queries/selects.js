const database = require('../database/database');

// Queries to see if a part exists and returns a boolean
exports.partExists = async function (part, category=false) {
    let part_exists;
   
    if (!category) {
        part_exists = await database.query(`
            SELECT * FROM namegen.parts
            WHERE part = '${part}';`);
    } else {
        part_exists = await database.query(`
            SELECT * FROM namegen.parts
            WHERE part = '${part}'
            AND category = '${category}';`);
    }

    if (part_exists.rows.length === 1) {
        return true;
    } else if (part_exists.rows.length === 0) {
        return false;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

exports.partExistsInCollection = async function (part, category, collection) {
    const cp = await database.query(
        `SELECT cp_id FROM namegen.collection_parts
         JOIN namegen.collections USING(col_id)
         JOIN namegen.parts USING(part_id)
         WHERE part = '${part}'
           AND category = '${category}'
           AND collection = '${collection}';`);

    if (cp.rows.length === 1) {
        return cp.rows[0].cp_id;
    } else {
        return undefined;
    };
};

exports.getPartID = async function (part, category) {
    const part = await database.query(
        `SELECT part_id FROM namegen.parts
         WHERE part = '${part}'
         AND category = '${category}';`);

    if (part.rows.length === 1) {
        return part.rows[0].part_id;
    } else {
        return undefined;
    };
};

exports.getCollectionID = async function (collection) {
    const col = await database.query(
        `SELECT col_id FROM namegen.collections
         WHERE collection='${collection}';`);
        
    if (col.rows.length === 1) {
        return col.rows[0].col_id;
    } else {
        return undefined;
    };
};

exports.getPropertyID = async function (property) {
    const prop = await database.query(
        `SELECT prop_id FROM namegen.properties
         WHERE property='${property}';`);
        
    if (prop.rows.length === 1) {
        return prop.rows[0].prop_id;
    } else {
        return undefined;
    };
};

exports.getCollectionPartID = async function (part, category, collection) {
    const cp = await database.query(
        `SELECT cp_id FROM namegen.collection_parts
         JOIN namegen.collections USING(col_id)
         JOIN namegen.parts USING(part_id)
         WHERE part = '${part}'
           AND category = '${category}'
           AND collection = '${collection}';`);

    if (cp.rows.length === 1) {
        return cp.rows[0].cp_id;
    } else {
        return undefined;
    };
};