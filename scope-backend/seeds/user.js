
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        // passwords are all "password"
        { name: 'user1', businessName: 'testing', telephone: '123456789', fax: '123456789', email: 'user1@email.com', password: '$2b$10$BLVNGAiMe5sI6zR4eMBEZuPpiiw72nGHKbVf0924qOKc096uNw/by' },
        { name: 'user2', businessName: 'testing', telephone: '123456789', fax: '123456789', email: 'user2@email.com', password: '$2b$10$BLVNGAiMe5sI6zR4eMBEZuPpiiw72nGHKbVf0924qOKc096uNw/by' },
        { name: 'user3', businessName: 'testing', telephone: '123456789', fax: '123456789', email: 'user3@email.com', password: '$2b$10$BLVNGAiMe5sI6zR4eMBEZuPpiiw72nGHKbVf0924qOKc096uNw/by' },
      ]);
    });
};
