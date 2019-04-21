// query 8: Find the city average friend count per user using MapReduce
// Using the same terminology in query6, we are asking you to write the mapper,
// reducer and finalizer to find the average friend count for each city.


var city_average_friendcount_mapper = function() {
  // implement the Map function of average friend count
  var temp = {
    num_user: 1,
    num_friends: this.friends.length
  };
  emit(this.hometown.city, temp);
};

var city_average_friendcount_reducer = function(key, values) {
  // implement the reduce function of average friend count
  var temp = {
    num_user: 0,
    num_friends: 0
  }
  for (var i = 0; i < values.length; i++) {
  	temp.num_user += values[i].num_user;
    temp.num_friends += values[i].num_friends;
  }
  return temp;
};

var city_average_friendcount_finalizer = function(key, reduceVal) {
  // We've implemented a simple forwarding finalize function. This implementation 
  // is naive: it just forwards the reduceVal to the output collection.
  // Feel free to change it if needed.
  var ret = reduceVal.num_friends / reduceVal.num_user;
  return ret;
}
