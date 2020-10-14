exports.up = function(knex) {
    return knex.schema
    .createTable("users", (tbl) => {
        tbl.increments('id');
        tbl.string("first_name").notNullable();
        tbl.string("last_name").notNullable();
        tbl.string("email").notNullable().unique();
        tbl.string("password");
      })
      .createTable('posts', tbl => {
          tbl.increments()
          tbl.integer('user_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('users')
              .onUpdate('CASCADE')
              .onDelete('CASCADE')
          tbl.text('post_title')
              .notNullable()
          tbl.text('post_category')
              .notNullable()
          tbl.text('post_author')
              .notNullable()
          tbl.integer('rating')
              .unsigned()
              .notNullable()
          tbl.text('post_text')
              .notNullable()
      })
  };
  
  exports.down = function(knex) {
      return knex.schema
          .dropTableIfExists('posts')
          .dropTableIfExists('users')
          
  };
