const database = require('../database/database');
const selects = require('../queries/selects');
const inserts = require('../queries/inserts');

// should only accept a part, category, and collection
exports.insert_parts = async function (req) {    
    var num_inserts = 0;

    for (r of req) {
        let part, category, collection;
        ({ part, category, collection } = r);

        const part_exists = await selects.partExists(part, category);
        const part_exists_in_col = await selects.partExistsInCollection(part, category, collection);

        if (!part_exists) {
            await inserts.insert_part(part, category);
            console.log("Added part")
        }

        if (!part_exists_in_col) {
            await inserts.add_part_to_collection(part, category, collection)
            console.log("Added to collection")
        }
    };
    const ack = 'woohoo'
    return ack;
};