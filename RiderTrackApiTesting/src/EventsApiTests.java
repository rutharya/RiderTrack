import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.json.simple.JSONObject;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;


public class EventsApiTests {

	
	
	@Test
	public void GetAllEvents()
	{   
		Properties prop = new Properties();
		InputStream input = null;
		try {
			input = new FileInputStream("config.properties");

			// load a properties file
			prop.load(input);
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
		// Base URL to the RESTful web service
		String getAllEventsApi = prop.getProperty("GetAllEventsApi");
		RestAssured.baseURI = getAllEventsApi;
 
		// Get the RequestSpecification of the request that you want to sent
		// to the server. The server is specified by the BaseURI that we have
		// specified in the above step.
		RequestSpecification httpRequest = RestAssured.given();
 
		// Make a request to the server by specifying the method Type and the method URL.
		// This will return the Response from the server. Store the response in a variable.
		Response response = httpRequest.get();
 
		// Now let us print the body of the message to see what response
		// we have received from the server
		String responseBody = response.getBody().asString();
		System.out.println("Response Body is =>  " + responseBody);
		
		// Get the status code from the Response. In case of 
				// a successful interaction with the web service, we
				// should get a status code of 200.
				int statusCode = response.getStatusCode();
		 
				// Assert that correct status code is returned.
				Assert.assertEquals(statusCode /*actual value*/, 200 /*expected value*/);
 
	}	
	
	@Ignore("Test ignored")
	@Test
	public void postEvent()
	{   
		
		Properties prop = new Properties();
		InputStream input = null;
		try {
			input = new FileInputStream("config.properties");

			// load a properties file
			prop.load(input);
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
		String baseURL ="http://localhost:3000";
		RestAssured.baseURI = baseURL;
		RequestSpecification httpRequest = RestAssured.given();
		JSONObject requestParams = new JSONObject();
		requestParams.put("name", prop.getProperty("EventName")); // Cast
		requestParams.put("image", prop.getProperty("EventImage"));
		requestParams.put("description", prop.getProperty("EventDescription"));
		requestParams.put("date", prop.getProperty("EventDate"));
		requestParams.put("location", prop.getProperty("EventLocation"));
		requestParams.put("time", prop.getProperty("EventTime"));
		
System.out.println(requestParams);
		httpRequest.body(requestParams.toJSONString());
		
		
		
		Response response = httpRequest.post("/saveEvent");
	 
		int statusCode = response.getStatusCode();
		System.out.println("++++"+ statusCode);
		Assert.assertEquals(statusCode, "201");
		String successCode = response.jsonPath().get("SuccessCode");
    	Assert.assertEquals( "Correct Success code was returned", successCode, "OPERATION_SUCCESS");
		
		}
	
	
	

	
	

	
	
	
}
