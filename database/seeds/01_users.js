exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        first_name:"Testing",
        last_name:"Purposes",
        email: "user@email.com",
        password: "password"
      }
    ]);
  });
};