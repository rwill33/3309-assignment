//server.js
const express = require("express");
const mysql = require('mysql');
const fs = require("fs");
const cors = require('cors');
const { query } = require("express");

const config = JSON.parse(fs.readFileSync('sqlconfig.json'));
const connection = mysql.createConnection(config);

const router = express.Router();
const app = express();


const port = process.env.PORT || 3000;

// Parse data in body as JSON
router.use(express.json());

// Setup middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
})
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  
app.use(cors(corsOptions));

router.route('/users')
  .get((req, res) => {
    connection.query('SELECT * FROM User', (err, rows, fields) => {
      if (err) {
          res.status(500).send(err)
      } else {
          res.send(rows);
      }
    })
  })
  .put((req, res) => {
    connection.query(`INSERT INTO User VALUES ('${req.body.username}', '${req.body.password}', '${req.body.fName}', '${req.body.lName}', '${req.body.email}');`, (err, rows, fields) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.send(rows);
      }
    })
  })

router.route('/customerAddress')
  .put((req, res) => {
    let query
    if(req.body.streetAddress2 && req.body.province) {
      query = `INSERT INTO CustomerAddress (addressNo, username, streetAddress1, streetAddress2, postalCode, country, province, city) SELECT COUNT(addressNo)+1 , '${req.body.username}', '${req.body.streetAddress1}', '${req.body.streetAddress2}', '${req.body.postalCode}', '${req.body.country}', '${req.body.province}', '${req.body.city}' FROM CustomerAddress WHERE username = '${req.body.username}';`;
    } else if (req.body.streetAddress2) {
      query = `INSERT INTO CustomerAddress (addressNo, username, streetAddress1, streetAddress2, postalCode, country, city) SELECT COUNT(addressNo)+1 , '${req.body.username}', '${req.body.streetAddress1}', '${req.body.streetAddress2}', '${req.body.postalCode}', '${req.body.country}', '${req.body.city}' FROM CustomerAddress WHERE username = '${req.body.username}';`;
    } else if(req.body.province) {
      query = `INSERT INTO CustomerAddress (addressNo, username, streetAddress1, postalCode, country, province, city) SELECT COUNT(addressNo)+1 , '${req.body.username}', '${req.body.streetAddress1}', '${req.body.postalCode}', '${req.body.country}', '${req.body.province}', '${req.body.city}' FROM CustomerAddress WHERE username = '${req.body.username}';`;
    } else {
      query = `INSERT INTO CustomerAddress (addressNo, username, streetAddress1, postalCode, country, city) SELECT COUNT(addressNo)+1 , '${req.body.username}', '${req.body.streetAddress1}', '${req.body.postalCode}', '${req.body.country}', '${req.body.city}' FROM CustomerAddress WHERE username = '${req.body.username}';`;
    }
    connection.query(query, (err, rows, fields) => {
      if (err) {
          res.status(500).send(err)
      } else {
          res.send(rows);
      }
    })
  });

router.route('/customerAddress/:username')
  .get((req, res) => {
    connection.query(`SELECT * FROM CustomerAddress WHERE username='${req.params.username}'`, (err, rows, fields) => {
      if (err) {
          res.status(500).send(err)
      } else {
          res.send(rows);
      }
    })
  });

router.route('/store')
  .put((req, res) => {
    connection.query(`INSERT INTO Store(storeName) VALUES ('${req.body.storeName}');`, (err, rows, fields) => {
      if (err) {
          res.status(500).send(err)
      } else {
        connection.query(`INSERT INTO StoreOwner(username, storeId) VALUES ('${req.body.username}', (SELECT storeId FROM Store WHERE storeId = LAST_INSERT_ID()));`, (err, rows, fields) => {
          if (err) {
              res.status(500).send(err)
          } else {
              res.send(rows);
          }
        })
      }
    })
  });

router.route('/stores/:username')
  .get((req, res) => {
    connection.query(`SELECT * FROM store s JOIN storeOwner o ON s.storeId=o.storeId WHERE username='${req.params.username}';`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })

router.route('/products')
  .get((req, res) => {
    connection.query(`SELECT p.*, AVG(r.rating) as avgRating FROM Product p LEFT JOIN Review r ON p.ProductID=r.productId GROUP BY p.productID;`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })
router.route('/products/:storeId')
  .get((req, res) => {
    connection.query(`SELECT p.*, AVG(r.rating) as avgRating FROM Product p LEFT JOIN Review r ON p.ProductID=r.productId WHERE storeId='${req.params.storeId}' GROUP BY p.productID;`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })

router.route('/store/:storeId')
  .get((req, res) => {
    connection.query(`SELECT * FROM store WHERE storeId='${req.params.storeId}';`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })
  .put((req, res) => {
    connection.query(`INSERT INTO Product(name, price, brand, quantity, category, storeId) VALUES ('${req.body.name}', ${req.body.price}, '${req.body.brand}', ${req.body.quantity}, '${req.body.category}', ${req.params.storeId});`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })
  .post((req, res) => {
    let changes = Object.keys(req.body);
    let changesString;
    changes.forEach((change, index) => {
      if(index === 0) {
        changesString = `${change}='${req.body[change]}'`
      } else {
        changesString = changesString + `, ${change}='${req.body[change]}'`
      }
    })
    connection.query(`UPDATE Store SET ${changesString} WHERE storeId=${req.params.storeId};`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })

router.route('/productReview/:productId')
  .get((req, res) => {
    connection.query(`SELECT * FROM review WHERE productId='${req.params.productId}';`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })
  .put((req, res) => {
    connection.query(`INSERT INTO Review (username, productId, message, rating) VALUES('${req.body.username}', ${req.params.productId}, '${req.body.message}', ${req.body.rating});`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })

router.route('/cart/:username')
  .get((req, res) => {
    connection.query(`SELECT c.productId as productId, c.quantity as quantity, p.name, p.price, p.brand, p.category FROM CartItem c JOIN Product p ON c.productId=p.productId WHERE username='${req.params.username}';`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })
  .put((req, res) => {
    connection.query(`INSERT INTO CartItem (username, productId, quantity) SELECT '${req.params.username}', ${req.body.productId}, ${req.body.quantity} WHERE EXISTS(SELECT * FROM Product WHERE productId='${req.body.productId}' AND quantity >=${req.body.quantity}) ON DUPLICATE KEY UPDATE quantity=(SELECT (quantity+1) FROM CartItem WHERE username='${req.params.username}' AND productId=${req.body.productId});`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })
  .delete((req, res) => {
    connection.query(`UPDATE CartItem as c, (SELECT (quantity-1) as quantity FROM CartItem WHERE username='${req.params.username}' AND productId=${req.query.productId}) as q SET c.quantity = q.quantity WHERE username='${req.params.username}' AND productId=${req.query.productId};`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        connection.query(`DELETE FROM CartItem WHERE username='${req.params.username}' AND productId=${req.query.productId} AND quantity=0;`, (err, rows, fields) => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.send(rows);
          }
        })
      }
    })
  });

router.route('/order')
  .get((req,res) => {
    let where;
    if (req.query.storeId) {
      where = `WHERE storeId='${req.query.storeId}'`;
    } else if (req.query.username) {
      where = `WHERE username='${req.query.username}'`;
    } else {
      where ='';
    }
    connection.query(`SELECT * FROM icommercestore.Order ${where};`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })
  .put((req, res) => {
    connection.query(`INSERT INTO icommercestore.Order (amount, storeId, username, addressNo) SELECT SUM(p.price*c.quantity) as amount, p.storeId, c.username , 1 FROM CartItem c JOIN Product p USING (productId) WHERE c.username = '${req.body.username}' GROUP BY storeId;`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        connection.query(`INSERT INTO OrderItem (orderNo, productId, quantity)
          SELECT orderNo, productId, quantity
          FROM icommercestore.CartItem c, icommercestore.Order o
          WHERE orderNo = LAST_INSERT_ID() AND c.username = "${req.body.username}";`, (err, rows, fields) => {
          if (err) {
            res.status(500).send(err)
          } else {
            connection.query(`DELETE FROM CartItem WHERE username='${req.body.username}'`, (err, rows, fields) => {
              if (err) {
                res.status(500).send(err)
              } else {
                res.send(rows);
              }
            })
          }
        })
      }
    })
  })

router.route('/order/:storeId')
  .get((req,res) => {
    connection.query(`SELECT * FROM icommercestore.Order WHERE storeId='${req.params.storeId}';`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })

  router.route('/findStoreId/:storeName')
  .get((req,res) => {
    connection.query(`SELECT storeId FROM store WHERE storeName = '${req.params.storeName}'`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })

  router.route('/findAllStores')
  .get((req,res) => {
    connection.query(`SELECT storeName,storeId FROM store`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })

  
  router.route('/bestSeller/:id')
  .get((req,res) => {
    connection.query(`(SELECT O.productID, name, price, O.amount, quantity FROM product 
      INNER JOIN (SELECT productId, amount FROM icommercestore.order 
        INNER JOIN orderitem ON icommercestore.order.orderNo = orderitem.orderNo WHERE storeId = '${req.params.id}') O 
      ON product.productID = O.productID)
    ORDER BY price*amount*quantity DESC;`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })
  router.route('/findStoreAnnual/:id')
  .get((req,res) => {
    connection.query(`SELECT * FROM (SELECT COUNT(orderNo) as numOfOrders, SUM(amount) as total FROM icommercestore.Order WHERE storeId=${req.params.id}) as orderSummary JOIN (SELECT SUM(quantity) as numOfProductsSold FROM icommercestore.Order o JOIN OrderItem oi ON o.orderNo=oi.orderNo WHERE storeId=${req.params.id}) as productCount;`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })

  router.route('/findStoreNames/:storeName')
  .get((req,res) => {
    connection.query(`SELECT storeName,storeId FROM store WHERE storeName LIKE '%${req.params.storeName}%'  `, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })

  router.route('/addReview')
  .put((req,res) => {

console.log(req.body.username)
console.log(req.body.id)
console.log(req.body.textRating)
console.log(req.body.numberRating)

    connection.query(`INSERT INTO review (username,productId,message,rating) VALUES ('${req.body.username}','${req.body.id}','${req.body.textRating}','${req.body.numberRating}')`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })



router.route('/')

app.use('/api', router);
app.listen(port, () => console.log(`Listening on port ${port}...`));