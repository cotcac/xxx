const jwt = require('jsonwebtoken');
module.exports = function(role="user"){
  return function (req, res, next) {
    //format of token
    // Authorization: Bearer <access_token>
  
    // Get auth header value.
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearertoken = bearer[1];
      // Set the token
      req.token = bearertoken;
      // next middlware
      jwt.verify(req.token, 'wowwow', (err, data) => {
        if (err) return res.sendStatus(403);
        console.log(data);
        // Authorization
        if(data.role!==role){
          return res.status(403).send(`Only ${role} can access this resource!`);
        }
        //req.user = data;// id, role, expired
      //  let user = await mdl.User.findOne({where:{ id: jwt_payload.id }, raw: true})
       // console.log('[User]',user);
          next();
      })
    } else {
      res.sendStatus(403);
    }
  }
  

}

