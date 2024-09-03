# Ethereum Expense Tracker API

## Available Endpoints

### 1. Check API Status

- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Returns a message confirming that the Ethereum Expense Tracker API is running, along with the API version and available routes.

### 2. List All Transactions

- **Endpoint:** `/api/transactions/:address`
- **Method:** `GET`
- **Description:** Retrieves all transactions for a given Ethereum address.

### 3. Get Latest Ethereum Price

- **Endpoint:** `/api/price/eth`
- **Method:** `GET`
- **Description:** Fetches the latest Ethereum price.

### 4. Get User Balance Information

- **Endpoint:** `/api/balance/:address`
- **Method:** `GET`
- **Description:** Retrieves the balance information for a given Ethereum address.


#For running the app in local machine just create a .env file in project root directory and add:-

MONGODB_URI="your_local_mongodb_database_url"
