// find the oldest friend for each user who has a friend. 
// For simplicity, use only year of birth to determine age, if there is a tie, use the one with smallest user_id
// return a javascript object : key is the user_id and the value is the oldest_friend id
// You may find query 2 and query 3 helpful. You can create selections if you want. Do not modify users collection.
//
//You should return something like this:(order does not matter)
//{user1:userx1, user2:userx2, user3:userx3,...}

function oldest_friend(dbname){
  db = db.getSiblingDB(dbname);
  var results = {};
  var friends = {};
  //print("hello");

  db.users.find().forEach( function(user) {
  		user.friends.forEach( function(friend_id) {
  			// check results[friend_id]
  			//print("ok");
  			if (friend_id in results) {
  				if (!(results[friend_id] in friends)) {
  					friends[results[friend_id]] = db.users.find({"user_id": results[friend_id]}).next();
  				}
  				var big_user = friends[results[friend_id]];
  				//print(big_user);

  				if (user.YOB < big_user.YOB) {
  					results[friend_id] = user.user_id;
  				}
  				else if (user.YOB == big_user.YOB && user.user_id < big_user.user_id) {
  					results[friend_id] = user.user_id;
  				}
  			}
  			else {
  				results[friend_id] = user.user_id;
  			}
  			// check results[user.user_id]
  			if (user.user_id in results) {
  				if (!(friend_id in friends)) {
  					friends[friend_id] = db.users.find({"user_id": friend_id}).next();
  				}
  				var temp_user = friends[friend_id];
  				if (!(user.user_id in friends)) {
  					friends[user.user_id] = db.users.find({"user_id": results[user.user_id]}).next();
  				}
  				var big_user = friends[user.user_id];
  				//print(temp_user);
  				if (temp_user.YOB < big_user.YOB) {
  					results[user.user_id] = friend_id;
  				}
  				else if (temp_user.YOB == big_user.YOB && temp_user.user_id < big_user.user_id) {
  					results[user.user_id] = friend_id;
  				}
  			}
  			else {
  				results[user.user_id] = friend_id;
  			}
  		});
  });

  // TODO: implement oldest friends
  // return an javascript object described above
  return results;
}
