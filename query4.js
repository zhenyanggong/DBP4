
// query 4: find user pairs (A,B) that meet the following constraints:
// i) user A is male and user B is female
// ii) their Year_Of_Birth difference is less than year_diff
// iii) user A and B are not friends
// iv) user A and B are from the same hometown city
// The following is the schema for output pairs:
// [
//      [user_id1, user_id2],
//      [user_id1, user_id3],
//      [user_id4, user_id2],
//      ...
//  ]
// user_id is the field from the users collection. Do not use the _id field in users.
  
function suggest_friends(year_diff, dbname) {
    db = db.getSiblingDB(dbname);
    var pairs = [];
    // TODO: implement suggest friends
    // Return an array of arrays.
    db.users.find({"gender" : "male"}).forEach(function(UA){
        var B = db.users.find({"gender" : "female"});
        B.forEach(function(UB){
            if (UB.hometown.city === UA.hometown.city)
            {
                if(Math.abs(UA.YOB - UB.YOB) < year_diff)
                {
                    if(UA.user_id < UB.user_id && UA.friends.indexOf(UB.user_id) === -1)
                    {
                        var temp = [UA.user_id, UB.user_id];
                        pairs.push(temp);
                    }
                    else if (UB.user_id < UA.user_id && UB.friends.indexOf(UA.user_id) === -1)
                    {
                        var temp = [UA.user_id, UB.user_id];
                        pairs.push(temp);
                    }
                }
            }
        });
    });
    

    return pairs;
}
