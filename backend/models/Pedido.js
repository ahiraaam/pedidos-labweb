const knex = require('../database/connection');

exports.all = () => {
    return knex
        .select('*')
        .from('pedido');
}

exports.create = (pedido) => {
    return knex('pedido')
        .insert(
            { 
                name: pedido.name,
                id_destino: 1,
                time_status: pedido.time
            }
            );
}

exports.find = (id) => {
    return knex
        .select('*')
        .from('pedido')
        .where('id', id)
        .first();
}

exports.updateDestino = (pedido, destino) => {
    return knex('pedido')
    .where({ id: pedido.id })
    .update({ 
                id_destino: destino.id,
                time_status: pedido.time
            })
}

    exports.delete = (id) => {
    return knex('pedido')
    .where({ id: id })
    .del()
}   