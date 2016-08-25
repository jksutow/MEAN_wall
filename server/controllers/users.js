var mongoose = require('mongoose');
var User = mongoose.model('User');
var userStatus = {loggedIn: false};
module.exports = (function(){
  return{
    index: function(req, res){
        User.find({}, function(err, data){
          if(err){
            res.json({err});
          }
          res.json({users: data});
        });
    },
    create: function(req, res){
        console.log("HIT?!")
        User.findOne({username: req.body.username}, function(err, user){
          if(user){
            userStatus = {
              loggedIn: true,
              user_id: user._id,
              username: user.username
            }
            res.json({status: true, userStatus: userStatus})
            console.log(user);
            console.log("USER LOGGED IN")
          } else{
            var newUser = new User({username: req.body.username});
              newUser.save(function(err){
                if (err){
                  res.json({message: 'An error occured.'})
                  return
                } else {
                  userStatus = {
                    loggedIn: true,
                    user_id: newUser._id,
                    username: newUser.username
                  }
                  res.json({status: true, userStatus: userStatus})
                }
              });
            }
        });
      },
    logout: function(req, res){
      userStatus = {loggedIn: false};
      res.json({status: true, userStatus: userStatus});
    }
  }
})()
// function UsersController(){
//   this.index = function(req, res){
//     User.find({}, function(err, data){
//       if(err){
//         res.json({err});
//       }
//       res.json({users: data});
//       // console.log("USerS", {users: data})
//     });
//   };
//   this.create = function(req, res){
//     console.log("HIT?!")
//     User.findOne({username: req.body.username}, function(err, user){
//       if(user){
//         userStatus = {
//           loggedIn: true,
//           user_id: user._id,
//           username: user.username
//         }
//         res.json({status: true, userStatus: userStatus})
//         console.log(user);
//         console.log("USER LOGGED IN")
//       } else{
//         var newUser = new User({username: req.body.username});
//           newUser.save(function(err){
//             if (err){
//               res.json({message: 'An error occured.'})
//               return
//             } else {
//               userStatus = {
//                 loggedIn: true,
//                 user_id: newUser._id,
//                 username: newUser.username
//               }
//               res.json({status: true, userStatus: userStatus})
//             }
//           });
//         }
//     });
//   }
//
// }
// module.exports = new UsersController();
