# Order Management App

This is an order management app, you can order the products also in bulk/multiple order.

## Installation

Use these commands to run the application

```bash
git clone REPOSITORY_LINK
npm install
npm start
```

| Roles             |
| ----------------- |
| 1. Admin          |
| 2. Dealer         |
| 3. Representative |
| 4. Shopkeeper     |


## Things used
      1. Backend using NodeJs(ExpressJs)
      2. Database- NoSQL
      3. Logging- Winston
      4. Caching- Redis
      5. Authentication- JWT

## Refer to this diagram for the database model

![picture alt](https://github.com/arshad404/Order-Management-App/blob/master/models/models.jpg)

## Routes

1. Auth Route

      1. Can log in as an Admin, Dealer, Representative, Shopkeeper.

2. Admin Route

      1. Can add User (Admin, Representative, Shopkeeper, Dealer).
      2. Can add/edit Shops.
      3. Can add products to inventory.
      4. Check/edit account status[Active, Suspended, Blocked].
      5. Can check/update the order status.
      6. Can add multiple pictures to the product.

3. Dealer Route

      1. Can order in bulk with multiple products.
      2. Edit the order.
      3. Check/edit the status of the product.

4. Representative

      1. Can do an order on behalf of any shopkeeper.
      2. Get the order status.
      3. Add shop to any shopkeeper.
      4. Daily visits to any shop updated in the log.

5. Shopkeeper
      1. Can able to do the orders.
      2. Get the order status of his own orders only.
      3. Confirm the orders which are placed by a representative to the dealer.

### Dependencies used

    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "crypto-random-string": "^3.3.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-rate-limit": "^5.2.5",
    "helmet": "^4.4.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.11.15",
    "morgan": "^1.10.0",
    "multer": "^1.4.2",
    "winston": "^3.3.3",
    "winston-mongodb": "^5.0.6"
    "nodemon": "^2.0.7"
