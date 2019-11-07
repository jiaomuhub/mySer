var sqlMap = {
  FOODS: {
    insert:'INSERT INTO `FOODS`(`name`, `price`) VALUES ([value-1],[value-2])',
    update:'update FOODS set name=?, price=? where id=?',
    delete: 'delete from FOODS where id=?',
    queryById: 'select * from FOODS where id=?',
    queryAll: 'select * from FOODS'
  },
}

module.exports = sqlMap;