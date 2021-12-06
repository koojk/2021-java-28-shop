const axios = require('axios');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [];
    const { data: posts } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    for (let i = 0; i < posts.length; i++) {
      if (i % 3 === 0) {
        posts[i].body = '&lt;h2&gt;' + posts[i].body + '&lt;/h2&gt;';
      }
      products.push({
        title: posts[i].title.split(' ')[0] + ' ' + posts[i].title.split(' ')[1],
        priceOrigin: Math.floor(Math.random() * 300000) + 30000,
        priceSale: Math.floor(Math.random() * 300000) + 30000,
        summary: posts[i].title,
        content: posts[i].body,
        amount: i % 20 === 0 ? 0 : Math.floor(Math.random() * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('product', products);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product', null, {});
  },
};
