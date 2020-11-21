
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: '9dd6d2af-e5f0-4099-89da-165ce6d93f39', email: 'user1@email.com', password: 'password1'},
        {id: '95d5112e-6c8b-4fd2-93e7-59f91579f788', email: 'user2@email.com', password: 'password2'},
        {id: 'e84f3aab-6331-442a-97ec-9021648d9af1', email: 'user3@email.com', password: 'password3'}
      ]);
    });
};