import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.TreeSet;
import java.util.Vector;



//json.simple 1.1
// import org.json.simple.JSONObject;
// import org.json.simple.JSONArray;

// Alternate implementation of JSON modules.
import org.json.JSONObject;
import org.json.JSONArray;

public class GetData{
	
    static String prefix = "jiaqni.";
	
    // You must use the following variable as the JDBC connection
    Connection oracleConnection = null;
	
    // You must refer to the following variables for the corresponding 
    // tables in your database

    String cityTableName = null;
    String userTableName = null;
    String friendsTableName = null;
    String currentCityTableName = null;
    String hometownCityTableName = null;
    String programTableName = null;
    String educationTableName = null;
    String eventTableName = null;
    String participantTableName = null;
    String albumTableName = null;
    String photoTableName = null;
    String coverPhotoTableName = null;
    String tagTableName = null;

    // This is the data structure to store all users' information
    // DO NOT change the name
    JSONArray users_info = new JSONArray();		// declare a new JSONArray

	
    // DO NOT modify this constructor
    public GetData(String u, Connection c) {
	super();
	String dataType = u;
	oracleConnection = c;
	// You will use the following tables in your Java code
	cityTableName = prefix+dataType+"_CITIES";
	userTableName = prefix+dataType+"_USERS";
	friendsTableName = prefix+dataType+"_FRIENDS";
	currentCityTableName = prefix+dataType+"_USER_CURRENT_CITY";
	hometownCityTableName = prefix+dataType+"_USER_HOMETOWN_CITY";
	programTableName = prefix+dataType+"_PROGRAMS";
	educationTableName = prefix+dataType+"_EDUCATION";
	eventTableName = prefix+dataType+"_USER_EVENTS";
	albumTableName = prefix+dataType+"_ALBUMS";
	photoTableName = prefix+dataType+"_PHOTOS";
	tagTableName = prefix+dataType+"_TAGS";
    }
	
	
	
	
    //implement this function

    @SuppressWarnings("unchecked")
    public JSONArray toJSON() throws SQLException{ 

    	JSONArray users_info = new JSONArray();
		
	// Your implementation goes here....		
    	try(Statement stmt = oracleConnection.createStatment(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY))
    	{
    		ResultSet rst = stmt.execute("SELECT USER_ID, FIRST_NAME, LAST_NAME, YEAR_OF_BIRTH, MONTH_OF_BIRTH, DAY_OF_BIRTH, GENDER FROM "
    					+ userTableName);

    		while (rst.next())
    		{
    			JSONObject info = new JSONObject();
    			JSONObject hometown = new JSONObject();
    			JSONObject current = new JSONObject();
    			JSONArray friends = new JSONArray();
    			info.put("user_id", rst.getLong(1));
    			info.put("first_name", rst.getString(2));
    			info.put("last_name", rst.getString(3));
    			info.put("YOB", rst.getLong(4));
    			info.put("MOB", rst.getLong(5));
    			info.put("DOB", rst.getLong(6));
    			info.put("gender", rst.getString(7));
    			Long uid = rst.getLong(1);

    			Statement stmt1 = oracleConnection.createStatment(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
    			ResultSet rst1 = stmt1.execute("SELECT C.CITY_NAME, C.STATE_NAME, C.COUNTRY_NAME FROM "
    					+ cityTableName + " C, " + hometownCityTableName + " H "
    					+ "WHERE H.USER_ID = " + uid + " AND H.CITY_ID = C.CITY_ID");
    			while(rst1.next())
    			{
    				hometown.put("state", rst1.getString(2));
    				hometown.put("country", rst1.getString(3));
    				hometown.put("city", rst1.getString(1));
    			}
    			info.put("hometown", hometown);

    			ResultSet rst2 = stmt1.execute("SELECT C.CITY_NAME, C.STATE_NAME, C.COUNTRY_NAME FROM "
    					+ cityTableName + " C, " + currentCityTableName + " H "
    					+ "WHERE H.USER_ID = " + uid + " AND H.CITY_ID = C.CITY_ID");
    			while(rst2.next())
    			{
    				current.put("state", rst2.getString(2));
    				current.put("country", rst2.getString(3));
    				current.put("country", rst2.getString(1));
    			}
    			info.put("current", hometown);

    			ResultSet rst3 = stmt1.execute("SELECT DISTINCT USER2_ID FROM "
    						+ friendsTableName + " WHERE USER1_ID = " + uid);
    			while(rst3.next())
    			{
    				friends.put(rst3.getLong(1));
    			}
    			info.put("friends", friends);
    			user_info.put(info);
    		}
    		rst.close();
    		rst1.close()
    		rst2.close();
    		rst3.close();
    		stmt1.close();
		}
		return users_info;
    }

    // This outputs to a file "output.json"
    public void writeJSON(JSONArray users_info) {
	// DO NOT MODIFY this function
	try {
	    FileWriter file = new FileWriter(System.getProperty("user.dir")+"/output.json");
	    file.write(users_info.toString());
	    file.flush();
	    file.close();

	} catch (IOException e) {
	    e.printStackTrace();
	}
		
    }
}
