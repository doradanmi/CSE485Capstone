README for all the Backend lambda functions. 

Account Management 
Create Account 
URL: https://twvazdor6gp5x4nuofhderginy0ytwbf.lambda-url.us-east-1.on.aws/
Request Body format: 
========================================================================
{
“user”: username,
“password”: password,
“first_name”: user_first_name,
“last_name”: user_last_name,
“email”: user_email_address,
“role”: users_role
}
========================================================================

Response format: 
========================================================================
Successful  
“statusCode”: 200,
 “body”: {“message”: "User account created successfully"}


User Exists 
“statusCode”: 401,
 “body”: {“message”: "User account already exists please login instead"}

Invalid json request body 
“statusCode”: 400,
 “body”: {“error”: “Invalid input”}
========================================================================

Login Account
URL: https://7moom33eemsdtvhzinznxo2mcu0wueqr.lambda-url.us-east-1.on.aws/
Request Body format:
========================================================================
{
“user”: username,
“password”: password
}
========================================================================

Response format:
========================================================================
Successful  
“statusCode”: 200,
 “body”: {“message”: "User account Found",
     “Key”: gen_key,
     “User”: user_hash
     }

Creating Key Error
“statusCode”: 400,
 “body”: {“message”: "ERROR CREATING KEY"}

Error with account query 
“statusCode”: 401,
 “body”: {“message”: "Error with user account"}

Error with account verification 
“statusCode”: 401,
 “body”: {“message”: "User account not verified"}

Invalid json request body 
“statusCode”: 400,
 “body”: {“error”: “Invalid input”}
========================================================================
Get Account
URL: https://iy26k5d2dpn4ihfs5oeaguy3im0bjqmg.lambda-url.us-east-1.on.aws/ 
Request Body format: 
========================================================================
{
“Key”: gen_key
}
========================================================================
Response format: 
========================================================================
Successful  
“statusCode”: 200,
 “body”: {“email”: user_email,
     “first_name”: user_first_name,
     “last_name”: user_last_name,
     “role”: user_role
     }

Error key authentication
“statusCode”: 401,
 “body”: {“message”: "Authentication failed. Invalid key! Please log in again for new key"}

Invalid json request body 
“statusCode”: 400,
 “body”: {“error”: “Invalid input”}

========================================================================
Update Account
URL: https://j23ikc56jl4q22ofgxulwfjiny0eyaxi.lambda-url.us-east-1.on.aws/ 
Request Body format: ========================================================================
{
“user”: username,
“password”: password,
“first_name”: user_first_name,
“last_name”: user_last_name,
“email”: user_email_address,
“role”: users_role
}
========================================================================

Response Body format: 
========================================================================
Successful  
“statusCode”: 200,
 “body”: {“email”: user_email,
     “first_name”: user_first_name,
     “last_name”: user_last_name,
     “role”: user_role
     }

Issue updating account 
“statusCode”: 400,
 “body”: {“error”: "issue with updating"}

Error with account
“statusCode”: 401,
 “body”: {“message”: "Error with user account"}

User account not verified 
“statusCode”: 401,
 “body”: {“message”: "User account not verified"}

Invalid json request body 
“statusCode”: 400,
 “body”: {“error”: “Invalid input”}
========================================================================

Delete Account
URL: https://vfdxqadufcp3moeugbted437li0xjjhm.lambda-url.us-east-1.on.aws/ 
Request Body format: 
========================================================================
{
“Key”: gen_key
}

========================================================================

Response Body format: 
========================================================================
Successful  
“statusCode”: 200,
 “body”: {“message”: "User deleted successfully"}


User not found
“statusCode”: 401,
 “body”: {“message”: "User not found"}

Invalid json request body 
“statusCode”: 400,
 “body”: {“error”: “Invalid input”}
========================================================================
Flight Management
Add Flight
URL: https://ncfqx2g33wwmf4ofvlgw3d52vm0haiaq.lambda-url.us-east-1.on.aws/
Request Body format: 
========================================================================
{
“Flight”: flight_number,
“Altitude”: altitude,
“Start”: start_lat_long,
“End”: end_lat_long,
“Start_Time”: start_time,
“Speed”: speed,
“User”: user_hash_session_var
}
========================================================================
Response Body format: 
========================================================================
Successfully added flight
“statusCode”: 200,
 “body”: {“message”: "Flight added successfully"}

Successfully link flight
“statusCode”: 200,
 “body”: {“message”: "We have linked the flights"}

Flights conflicting
“statusCode”: 400,
 “body”: {“message”: "This flight is conflicting with another flight at this location. Please try changing the time. Available times include: ' + time1 + " and " + time2"}

Flight exists error
“statusCode”: 400,
 “body”: {“message”: "Error this flight already exists"}

Invalid json request body 
“statusCode”: 400,
 “body”: {“error”: “Invalid input”}
========================================================================
Get flight 
URL: https://xzy55jtx57tccv6r56hi45rmma0qmnfs.lambda-url.us-east-1.on.aws/ 
Request Body format: 
========================================================================
{
“User”: user_hash
}
========================================================================
Response format: 
========================================================================
Successful  (returns a dictionary of flights using one flight as an example)
“statusCode”: 200,
 “body”: {“flight_name”: { 
“Start”: start_lat_long,
“End”: end_lat_long,
     	“Start_Time”: start_time,
    	“End_Time”: end_time,
     	“Speed”: speed,
	“Altitude”: alt
	}
     }
Successful no flight attached to account
“statusCode”: 200,
 “body”: {“message”: "No flights found for this user"}

Invalid json request body 
“statusCode”: 400,
 “body”: {“error”: “Invalid input”}

========================================================================
Delete flight:
URL:https://i24eystngccnone2eijvnkcgey0laugl.lambda-url.us-east-1.on.aws/ 
Request Body format:
========================================================================
{
“User”: user_hash,
“Flight”: flight_number
}
========================================================================
Response Body format: 
========================================================================
Successful  
“statusCode”: 200,
 “body”: {“message”: "Flight deleted successfully"}

Invalid json request body 
“statusCode”: 400,
 “body”: {“error”: “Invalid input”}

========================================================================
Drone Management
Add Drones
URL: https://k5damhxdzuoskygjx4kjgmwl5u0bqjgy.lambda-url.us-east-1.on.aws/ 
Request body format: 
========================================================================
{
“Drone”: drone_name,
“Make”: make,
“Model”: model,
“User”: user_hash
     }
========================================================================
Response body format: 
========================================================================
Successful  
“statusCode”: 200,
 “body”: {“message”: "Drone successfully added to account"}

Drone already exists 
“statusCode”: 401,
 “body”: {“message”: “Drone already exists on account”}

Invalid json request body 
“statusCode”: 400,
 “body”: {“error”: “Invalid input”}

========================================================================
Get Drones
URL: https://226ruughfrpu46mrtk2a6tzbbm0xigex.lambda-url.us-east-1.on.aws/ 
Request Body: 
========================================================================
{
“User”: user_hash
}

========================================================================

Response body format: 
========================================================================
Successful  (returns a dictionary of drones using one flight as an example)
“statusCode”: 200,
 “body”: {{“drone”: drone_name,
     “make”: make,
     “model”: model},
     }
Successful No drones for user
“statusCode”: 200,
 “body”: {“message”: "No Drones found for this user"}

Invalid json request body 
“statusCode”: 400,
 “body”: {“error”: “Invalid input”}

========================================================================
