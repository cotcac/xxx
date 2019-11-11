module.exports = {
    valid:{
        name:'Leo Messi',
        age: 1990,
        email:'leo@example.com',
        password:'abcxyz',
        role:"admin"
    },
    valid2:{
        name:'Leo Messi 2',
        age: 1990,
        email:'leosddd@example.com',
        password:'abcdddxyz',
        role:"admin"
    },
    unvalid1:{
        name:'x',// name less than 3
        age:1990
    },
    unvalid2:{
        name:'Leo Messi 2',// missing age
    },
    unvalid3:{
        name:'Leo Messi 2',
        age: 1990,
        email:'not_an_email',
        password:'abcdddxyz',
        role:"admin"
    },
    unvalid4:{
        name:'Leo Messi 2',
        age: 1990,
        email:'aaa@ssfdfd.com',
        password:'1',// password too short error
        role:"admin"
    },
    unvalid5:{
        name:'Leo Messi 2',
        age: 1990,
        email:'leo@example.com',// email already exist
        password:'1fdsfdsfasfdsfsda',
        role:"admin"
    },
   
  }