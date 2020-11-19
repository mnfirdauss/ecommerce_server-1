# E-Commerce CMS
----------------
**Login**

	`Login to website`

* **URL**

	`/users/login`

* **Method:**

	`POST`

* **URL Params**

	none

* **Data Params**

	`
		{
			"email": "admin@mail.com",
			"password": "1234",
		}
	`

* **Success Response:**

  * **Code:** 200 CREATED
    **Content:**
		```json
		[
	  	{
				"access_token": "a.qwvne0hqw0ehrqweqvwevrqwhevnrq"
	 		}
		]
		```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Internal Server Error." }`

		

