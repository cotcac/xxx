// before running test
const mdl = require('../models');
before(async () => {
  try {
    await mdl.sequelize.sync({
      force: true
    })
    console.log('sync sucess');
    
  } catch (error) {
    console.log(error);
    
    
  }
 

})
// after all test done.
after(async()=>{
  console.log('after all done');
})