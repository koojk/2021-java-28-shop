module.exports = {
  admin: {
    index: [],
    user: [{ path: '', method: 'GET', name: '회원 리스트' }],
    board: [
      { path: 'init', method: 'GET', name: '게시판 관리' },
      { path: '', method: 'GET', name: '게시물 관리' },
    ],
  },
};
