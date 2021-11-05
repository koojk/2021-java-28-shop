'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const insertBoard = [];
    const insertFile = [];
    for (let i = 1; i <= 120; i++) {
      insertBoard.push({
        binit_id: i < 50 ? 1 : 2,
        user_id: i < 10 ? 1 : i,
        title: '데모 입니다' + i,
        writer: '데모 유저' + i,
        content: '데모 내용 입니다.' + i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Board', insertBoard);
    const files = [
      '211105_f07a2533-60e7-4c53-8479-2c189576ed2c.jpg',
      '211104_65fde3ff-52df-4195-af72-ef588708a797.jpg',
      '211104_c094c39a-dd2d-4f9d-8639-4c52b7d3346b.jpg',
    ];
    for (let i = 50; i < 120; i++) {
      insertFile.push({
        board_id: i,
        oriName: '파일' + i + '.jpg',
        saveName: files[Math.floor(Math.random() * 3)],
        mimeType: 'image/jpg',
        fileType: 'I',
        size: 12369,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('BoardFile', insertFile);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Board', null, {});
  },
};
