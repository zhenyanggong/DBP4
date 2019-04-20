// query 8: Find the city average friend count per user using MapReduce
// Using the same terminology in query6, we are asking you to write the mapper,
// reducer and finalizer to find the average friend count for each city.


var city_average_friendcount_mapper = function() {
  // implement the Map function of average friend count
  emit(this.hometown.city, this.friends.length);
};

var city_average_friendcount_reducer = function(key, values) {
  // implement the reduce function of average friend count
  var sum = 0;
  for (var i = 0; i < values.length; i++) {
  	sum += values[i];
  }
  return sum/values.length;
};

var city_average_friendcount_finalizer = function(key, reduceVal) {
  // We've implemented a simple forwarding finalize function. This implementation 
  // is naive: it just forwards the reduceVal to the output collection.
  // Feel free to change it if needed.
  var ret = reduceVal;
  return ret;
}
