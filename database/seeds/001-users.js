
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'jesus', password: 'jesus'},
        {id: 2, username: 'john', password: 'john'},
        {id: 3, username: 'james', password: 'james'}
      ]);
    });
};
