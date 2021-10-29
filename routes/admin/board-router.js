const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')

router.get('/', (req, res, next) => {
  const boardType = req.query.boardType || 'default'
  res.render('admin/board/board-list', { css: 'admin-board', boardType })
})

router.get('/:id', (req, res, next) => {
  const type = req.query.type
  const boardType = req.query.boardType || 'default'
  if (type === 'update') {
    res.render('admin/board/board-update', { css: 'admin-board', boardType })
  } else {
    res.render('admin/board/board-view', { css: 'admin-board', boardType })
  }
})

router.post('/', (req, res, next) => {
  res.send('/admin/board:POST')
})

router.put('/', (req, res, next) => {
  res.send('/admin/board:PUT')
})

router.delete('/', (req, res, next) => {
  res.send('/admin/board:DELETE')
})

module.exports = { name: '/board', router }
