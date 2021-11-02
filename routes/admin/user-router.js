const path = require('path');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { error, telNumber, alert, generateUser } = require('../../modules/util');
const { User } = require('../../models');
const pager = require('../../middlewares/pager-mw');

// 회원 등록 화면
router.get('/', (req, res, next) => {
  if (req.query.type === 'create') {
    const ejs = {
      telNumber,
      type: req.query.type || '',
    };
    res.render('admin/user/user-form', ejs);
  } else next();
});

// 회원리스트
router.get('/', pager(User), async (req, res, next) => {
  const rs = await User.findAll({
    order: [['id', 'desc']],
    offset: req.pager.startIdx,
    limit: req.pager.listCnt,
  });
  const users = generateUser(rs);
  const ejs = { telNumber, pager: req.pager, users };
  res.render('admin/user/user-list', ejs);
});

// 회원 수정 화면
router.get('/:id', (req, res, next) => {
  const ejs = {
    telNumber,
    type: req.query.type || '',
  };
  res.render('admin/user/user-form', ejs);
});

// 회원 저장
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    user.save();
    res.send(alert('회원가입이 완료되었습니다.', '/admin/user'));
  } catch (err) {
    next(createError(err));
  }
});

// 회원 수정
router.put('/', (req, res, next) => {
  res.send('/admin/user:PUT');
});

// 회원 삭제
router.delete('/', (req, res, next) => {
  res.send('/admin/user:DELETE');
});

module.exports = { name: '/user', router };
