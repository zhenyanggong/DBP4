// query6 : Find the Average friend count per user for users
//
// Return a decimal variable as the average user friend count of all users
// in the users document.

function find_average_friendcount(dbname){
  db = db.getSiblingDB(dbname);
  // TODO: return a decimal number of average friend count
  //var average = parseFloat(db.flat_users.find().count()) / parseFloat(db.users.find().count());
  var temp = db.users.aggregate([{$project : {"_id" : 0, "user_id" : 1, "friend_num": {$size: "$friends"}}}]);

  var num_user = 0;
  var sum = 0;
  temp.forEach( function(user) {
  	sum += user.friend_num;
  	num_user ++;
  });

  var average = sum / num_user; 
  return average;
}
