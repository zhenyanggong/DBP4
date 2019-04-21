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

  // first get all friends info into friedns dic
  db.users.find().forEach( function(user) {
  	user.friends.forEach( function(user_friend) {
  		if (user.user_id in friends) {
  			friends["user.user_id"].add(user_friend);
  		}
  		else {
  			friends["user.user_id"] = new Set();
  		}
  		if (user_friend in friends) {
  			friends["user_friend"].add(user.user_id);
  		}
  		else {
  			friends["user_friend"] = new Set();
  		}
  	});
  });

  // sort friends set
  for (var key in Object.keys(friends)) {
  	var tmep = db.users.find(
   		{user_id: { $in: Array.from(friends[key]) } },
   		{user_id: 1, YOB: 1}).sort({YOB: 1, user_id: 1}).limit(1);
  	//print(temp)
  	results[key] = temp.user_id;
  }


  // TODO: implement oldest friends
  // return an javascript object described above
  return results
}
