const database = require('../../database/database');

exports.getPartIDFromPart = async function (part, category=false) {
    let res;  
    if (!category) {
        res = await database.query(`
            SELECT part_id FROM namegen.parts
            WHERE part = '${part}';`);
    } else {
        res = await database.query(`
            SELECT part_id FROM namegen.parts
            WHERE part = '${part}'
            AND category = '${category}';`);
    }

    if (res.rows.length === 1) {
        return res.rows[0].part_id;
    } else if (res.rows.length === 0) {
        return undefined;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

exports.getLangIDFromLanguage = async function (language) {
    const res = await database.query(
        `SELECT lang_id FROM namegen.languages
         WHERE language = '${language}';`);

    if (res.rows.length === 1) {
        return res.rows[0].lang_id;
    } else if (res.rows.length === 0) {
        return undefined;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

exports.getThemeIDFromTheme = async function (theme) {
    const res = await database.query(
        `SELECT theme_id FROM namegen.themes
         WHERE theme = '${theme}';`);

    if (res.rows.length === 1) {
        return res.rows[0].theme_id;
    } else if (res.rows.length === 0) {
        return undefined;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

exports.getColIDFromCollection = async function (collection) {
    const res = await database.query(
        `SELECT col_id FROM namegen.collections
         WHERE collection='${collection}';`);

    if (res.rows.length === 1) {
        return res.rows[0].col_id;
    } else if (res.rows.length === 0) {
        return undefined;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

exports.getPropIDFromProperty = async function (property) {
    const res = await database.query(
        `SELECT prop_id FROM namegen.properties
         WHERE property = '${property}';`);

    if (res.rows.length === 1) {
        return res.rows[0].prop_id;
    } else if (res.rows.length === 0) {
        return undefined;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

exports.getCPIDFromTables = async function (part, category, collection) {
    const res = await database.query(
        `SELECT cp_id FROM namegen.collection_parts
         JOIN namegen.collections USING(col_id)
         JOIN namegen.parts USING(part_id)
         WHERE part = '${part}'
           AND category = '${category}'
           AND collection = '${collection}';`);

    if (res.rows.length === 1) {
        return res.rows[0].cp_id;
    } else if (res.rows.length === 0) {
        return undefined;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

exports.getPPIDFromTables = async function(part, category, collection, property) {
    const res = await database.query(
        `SELECT pp_id FROM namegen.part_properties
         JOIN namegen.properties USING(prop_id)
         JOIN namegen.collection_parts USING(cp_id)
         JOIN namegen.collections USING(col_id)
         JOIN namegen.parts USING(part_id)
         WHERE part = '${part}'
           AND category = '${category}'
           AND collection = '${collection}'
           AND property = '${property}';`);

    if (res.rows.length === 1) {
        return res.rows[0].pp_id;
    } else if (res.rows.length === 0) {
        return undefined;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

exports.getPSIDFromIDs = async function (cp_id) {
    const res = await database.query(`
        SELECT ps_id FROM namegen.part_statistics
        JOIN namegen.collection_parts USING(cp_id)
        WHERE cp_id = '${cp_id}';`);
    
    if (res.rows.length === 1) {
        return res.rows[0].ps_id;
    } else if (res.rows.length === 0) {
        return false;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};

exports.getPPIDFromIDs = async function (cp_id, prop_id) {
    const res = await database.query(
        `SELECT pp_id FROM namegen.part_properties
         JOIN namegen.collection_parts USING(cp_id)
         JOIN namegen.properties USING(prop_id)
         WHERE cp_id = '${cp_id}'
         AND prop_id = '${prop_id}';`);

    if (res.rows.length === 1) {
        return res.rows[0].pp_id;
    } else if (res.rows.length === 0) {
        return false;
    } else {
        throw "Too many rows were discovered in parts. Check database for duplicates"
    };
};
