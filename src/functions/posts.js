const database = require('../database/database');
const selects = require('../queries/selects');
const inserts = require('../queries/inserts');

// should only accept a part, category, and collection
exports.insert_parts = async function (req) {    
    var num_inserts = 0;

    for (r of req) {
        let part, category, collection, properties, statistics;
        ({ part, category, collection, properties, statistics } = r);

        console.log('part ', part);
        console.log('category ', part);
        console.log('collection ', collection);
        console.log('properties ', properties);
        console.log('statistics ', statistics);

        const part_exists = await selects.getPartID(part, category);
        const part_exists_in_col = await selects.partExistsInCollection(part, category, collection);

        if (!part_exists) {
            await inserts.insert_part(part, category);
            console.log("Added part");
        }

        if (!part_exists_in_col) {
            await inserts.add_part_to_collection(part, category, collection);
            console.log("Added to collection");
        }

        if (properties.length) {
            await inserts.apply_properties_to_part(part, category, collection, properties);
            console.log("Applied properties to part");
        }
    };
    const ack = 'hmmm'
    return ack;
};