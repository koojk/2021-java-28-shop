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
    const files = [''];
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
