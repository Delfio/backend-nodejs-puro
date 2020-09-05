async function up(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('avatar');
    })
}

async function down(knex) {
    return knex.schema.table('users', table => {
        table.string('avatar').notNullable();
    })
}

module.exports = {
    up,
    down
}