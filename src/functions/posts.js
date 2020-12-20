const database = require('../database/database');
const selects = require('../queries/selects');
const inserts = require('../queries/inserts');

exports.insert_parts = async function (req) {    
    var num_inserts = 0;

    for (r of req) {
        let new_part = r.new_part;
        let part_type = r.part_type;
        let part_table = 'part_' + part_type + 's';

        const part_exists = await selects.partExists(new_part);

        if (!part_exists) {
            await inserts.insert_new_part(new_part, category);
        } else if (!part_type_exists) {
            await inserts.add_category_to_part(new_part, category);
        } else {
            console.log('Part already exists with category')
        };  

        // // if part does not exist at all
        // if(!Array.isArray(part_exists) || !part_exists.length){

        //     await inserts.insert_new_part(new_part, part_type, part_table);

        // } else {
        //     const part_type_exists = await selects.partTypeExists(new_part, part_type, part_table);
        //     // if part exists but part type does not
        //     if (!Array.isArray(part_type_exists) || !part_type_exists.length){
        //         const part_id = part_type_exists[0].part_id
                
        //         await inserts.insert_part_type(part_id, new_part, part_type, part_table);

        //         console.log('Inserted new part');
        //     };
        // };

    const ack = 'woohoo'
    return ack;
}};