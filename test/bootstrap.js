// before running test
const mdl = require('../models');
before(async () => {
  await mdl.sequelize.sync({
    force: true
  })

})
// after all test done.
after(async()=>{
  console.log('after all done');
})