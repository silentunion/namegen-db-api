const database = require('../database/database');

exports.insert_parts = async function (req) {    
    var num_inserts = 0;

    for (r of req) {
        let new_part = r.new_part;
        let part_type = r.part_type;
        let part_table = r.part_table;

        console.log(new_part, part_type, part_table);
    };

    const ack = 'Hubba bubba thisa worka';
    return ack;
};