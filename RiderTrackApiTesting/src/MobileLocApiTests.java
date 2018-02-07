import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import io.restassured.RestAssured;
import io.restassured.http.Method;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
 
@RunWith(JUnit4.class)
public class MobileLocApiTests {
 
	@Test
	public void GetLocation()
	{   
		// Base URL to the RESTful web service
		RestAssured.baseURI = "http://savemyloc.herokuapp.com/";
 
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
	
	
	@Test
	public void GetLocationName()
	{   
		RestAssured.baseURI = "http://savemyloc.herokuapp.com/users";
		RequestSpecification httpRequest = RestAssured.given();
		Response response = httpRequest.get("/Umapathi ");
		String responseBody = response.getBody().asString();
		System.out.println("Response Body is =>  " + responseBody);
				int statusCode = response.getStatusCode();
				Assert.assertEquals(statusCode,200);
	}
	
	@Ignore("Test ignored")
	@Test 
	public void postLocation()
	{
    	RestAssured.baseURI  = "https://savemyloc.herokuapp.com/";
    	
    	Response response = RestAssured.given().header("Content-Type", "application/x-www-form-urlencoded").formParam("user", "Prateek").formParam("lat", "33.42194352").formParam("lng", "33.42194352").formParam("time", "232323").when().post(RestAssured.baseURI);
    	
    	String body = response.getBody().asString();
    	System.out.println(body);

	}
 
}