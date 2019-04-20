// query2 : unwind friends and create a collection called 'flat_users' 
// where each document has the following schema:
/*
{
  user_id:xxx
  friends:xxx
}
*/

function unwind_friends(dbname){
    db = db.getSiblingDB(dbname);
    // TODO: unwind friends
    /*
    db.users.find().forEach( function(myDoc) { 
    	for (index = 0; index < myDoc.friends.length; index++) {
    		db.flat_users.insertOne( {
    			user_id: myDoc.user_id,
    			friends: myDoc.friends[index],
 			} )
    	}
    });
    */
    db.users.aggregate([{$unwind : "$friends"},{$project : {_id : 0, user_id : 1, friends : 1}},{$out : "$flat_users"}])
    // returns nothing. It creates a collection instead as specified above.
}
