# Stationery Shop Project
## Back-end Development
## MERN Stack Development

🛠️ Technology Use
   - Node.js
   - Express.js
   - Mongoose
   - TypeScript

✅ Project setup
   - create express server
   - setup export & import
   - API testing with postman
   - Environment variable & .gitignore
   - create README.md file
   - Modules pattern in software architecture


✅ Database setup
   - connect to mongodb atlas database / local mongodb compass


✅ Product API
 - 🔖 Product interface - model and schema with validations for Product
    - create product validation
    - create product routes and controller

1. POST /api/products -> create the product (D)
    - get the data from request body
    - input validation check
    - check product existing
    - send response

2. GET /api/products -> get all product including search (D)
    - get data from request query
    - search product using regex
    - send response    

3. GET /api/products/:productId -> get the single product (D)
    - get the id from request params
    - findById()
    - send response based on product found or not
    - handle the mongoose Cast error

4. DELETE /api/products/:productId -> delete the product (D)
    - get the id from request params
    - findById(id)
    - findByIdAndDelete(id)
    - send response based on product found or not
    - handle the mongoose Cast error

5. PUT /api/products/:productId -> update the product (D)
    - get the data from request body and params
    - create filter, updates, options
    - findByIdAndUpdate(filter, updates, options)
    - if product was updated then send response


✅ Order API
- 🔖 Order interface - model and schema with validations for order api
    - create order validation
    - create order routes controller and service

1. POST /api/orders -> create the order (D)
    - get the data from request body
    - input validation check
    - send response

2. GET /api/orders/revenue -> get all product including search (D)
    - Use MongoDB aggregation pipeline to calculate the total revenue from all orders
    - Calculate the total price by multiplying the price of each product by the quantity ordered.
    - send response  


✅ package that we will need
 - `npm install express cors dotenv mongoose validator http-errors`

 - `npm install --save-dev typescript ts-node-dev @eslint/js @types/cors @types/express @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier globals prettier typescript-eslint`