const database = require('../database/database');
const selects = require('../queries/selects');
const inserts = require('../queries/inserts');

exports.insert_parts = async function (req) {    
    var num_inserts = 0;
    console.log(req);

    for (r of req) {
        console.log(r);

        let part, category, properties;
        ({ part, category, ...properties } = r);

        console.log(part, category, properties);

        const part_exists = await selects.partExists(part);

        if (!part_exists) {
            await inserts.insert_new_part(part, category);
            console.log('New part inserted');

        } else {
            const part_type_exists = await selects.partTypeExists(part, category);
            
            if (!part_type_exists) {
                await inserts.add_category_to_part(part, category);
                console.log('Existing part added to category');

            } else {
                console.log('Part already exists with category')
            }
        };
    };
    const ack = 'woohoo'
    return ack;
};