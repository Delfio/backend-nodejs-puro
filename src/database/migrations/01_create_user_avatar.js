async function up(knex) {
    return knex.schema.createTable('user_avatar', table => {
        table.increments('id').primary();
        table.string('path').notNullable();
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('SET NULL')
            .onUpdate('CASCADE')
    })
}

async function down(knex) {
    return knex.schema.dropTable('user_avatar');
}

module.exports = {
    up,
    down
}