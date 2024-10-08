VIDEO DEMO-
[VIDEO DEMO](https://www.canva.com/design/DAGOl96Oz-8/HWtNoP5PRzr_AaEOXP8GCA/edit?utm_content=DAGOl96Oz-8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)


# Vehicle and Organization Management API

This project provides a RESTful API for managing vehicles and organizations. The API is built using Node.js, Express, and MongoDB, with features like VIN decoding using the NHTSA API, rate limiting, and organization policy management.



### Prerequisites

- Node.js
- MongoDB





# Vehicle API


### `GET /api/vehicles/decode/:vin`

#### Description
Retrieve detailed information about a vehicle using its Vehicle Identification Number (VIN). This endpoint decodes the VIN by calling the NHTSA API and returns specific details about the vehicle.

#### Parameters
- **vin** (path parameter): A 17-character alphanumeric VIN.

#### Example Request
```http
GET http://localhost:3000/api/vehicles/decode/YV1RS61R922101022
```

#### Response
**Success (200 OK)**
```json
{
  "manufacturer": "Volvo",
  "model": "S60",
  "year": "2002"
}
```

**Error (400 Bad Request)**
```json
{
  "message": "Invalid VIN format"
}
```


#### Notes
- The VIN must be a valid 17-character string.
- The endpoint retrieves `manufacturer`, `model`, and `year` from the NHTSA API.


### Vehicle Endpoints

1. **Add a Vehicle**

   - **Endpoint:** `POST /vehicles`
   - **Request Body:**

     ```json
     {
       "vin": "XXXXXXXXXXXXXXXXX",
       "org": "orgId"
     }
     ```

   - **Response:**
     - `201 Created`: Returns the created vehicle's details.
     - `400 Bad Request`: If the VIN is invalid or the organization is not found.

2. **Get Vehicle by VIN**

   - **Endpoint:** `GET /vehicles/:vin`
   - **Response:**
     - `200 OK`: Returns the details of the vehicle associated with the VIN.
     - `400 Bad Request`: If the VIN is invalid.
     - `404 Not Found`: If the vehicle is not found.
    
### Organization Endpoints

1. **Create an Organization**

   - **Endpoint:** `POST /orgs`
   - **Request Body:**

     ```json
     {
       "name": "OrgName",
       "account": "OrgAccount",
       "website": "https://orgwebsite.com",
       "fuelReimbursementPolicy": 1000,
       "speedLimitPolicy": 60
     }
     ```

   - **Response:**
     - `201 Created`: Returns the created organization's details.
     - `400 Bad Request`: If there's an error in creating the organization.

2. **Update an Organization**

   - **Endpoint:** `PUT /orgs`
   - **Request Body:**

     ```json
     {
       "id": "orgId",
       "account": "UpdatedAccount",
       "website": "https://updatedwebsite.com",
       "fuelReimbursementPolicy": 1200,
       "speedLimitPolicy": 80
     }
     ```

   - **Response:**
     - `200 OK`: Returns the updated organization's details.
     - `400 Bad Request`: If there's an error in updating the organization.
     - `404 Not Found`: If the organization is not found.


## Validation and Error Handling

- VINs are validated using a regex pattern to ensure they are valid 17-character alphanumeric strings.
- Organization IDs are checked against the database to ensure they exist before associating a vehicle with an organization.
- Errors are returned with appropriate HTTP status codes (`400` for bad requests, `404` for not found, etc.).

## Rate Limiting

- The VIN decoding service uses a rate limiter to ensure that no more than 5 requests per minute are sent to the NHTSA API.
- Requests beyond this limit are blocked, and an error message is returned.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express**: Web framework for handling routes and middleware.
- **MongoDB**: NoSQL database for storing vehicles and organizations.
- **Mongoose**: ODM library for MongoDB, providing schema validation and query building.
- **Axios**: Promise-based HTTP client for making API requests (e.g., to the NHTSA API).
- **NHTSA API**: External API for decoding VINs.

