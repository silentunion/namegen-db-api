const database = require('../database/database');

// Queries to see if a part exists and returns a boolean
exports.partExists = async function (part, category=false) {
    let exists;
   
    if (!category) {
        exists = await database.query(`
            SELECT * FROM namegen.parts
            WHERE part = '${part}';`);
    } else {
        exists = await database.query(`
            SELECT * FROM namegen.parts
            WHERE part = '${part}'
            AND category = '${category}';`);
    }

    if (exists.rows.length === 1) {
        return true;
    } else if (exists.rows.length === 0) {
        return false;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

exports.partExistsInCollection = async function (part, category, collection) {
    const exists = await database.query(
        `SELECT cp_id FROM namegen.collection_parts
         JOIN namegen.collections USING(col_id)
         JOIN namegen.parts USING(part_id)
         WHERE part = '${part}'
           AND category = '${category}'
           AND collection = '${collection}';`);

    if (exists.rows.length === 1) {
        return true;
    } else if (exists.rows.length === 0) {
        return false;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

exports.partPropertyExists = async function (cp_id, prop_id) {
    const exists = await database.query(
        `SELECT * FROM namegen.part_properties
         JOIN namegen.collection_parts USING(col_id)
         JOIN namegen.properties USING(prop_id)
         WHERE cp_id = '${cd_id}'
           AND prop_id = '${prop_id}';`);

    if (exists.rows.length === 1) {
        return true;
    } else if (exists.rows.length === 0) {
        return false;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

exports.getPartID = async function (part, category) {
    const res = await database.query(
        `SELECT part_id FROM namegen.parts
         WHERE part = '${part}'
         AND category = '${category}';`);

    if (res.rows.length === 1) {
        return res.rows[0].part_id;
    } else {
        return undefined;
    };
};

exports.getCollectionID = async function (collection) {
    const res = await database.query(
        `SELECT col_id FROM namegen.collections
         WHERE collection='${collection}';`);
        
    if (res.rows.length === 1) {
        return res.rows[0].col_id;
    } else {
        return undefined;
    };
};

exports.getPropertyID = async function (property) {
    const res = await database.query(
        `SELECT prop_id FROM namegen.properties
         WHERE property='${property}';`);
        
    if (res.rows.length === 1) {
        return res.rows[0].prop_id;
    } else {
        return undefined;
    };
};

exports.getCollectionPartID = async function (part, category, collection) {
    const res = await database.query(
        `SELECT cp_id FROM namegen.collection_parts
         JOIN namegen.collections USING(col_id)
         JOIN namegen.parts USING(part_id)
         WHERE part = '${part}'
           AND category = '${category}'
           AND collection = '${collection}';`);

    if (res.rows.length === 1) {
        return res.rows[0].cp_id;
    } else {
        return undefined;
    };
};