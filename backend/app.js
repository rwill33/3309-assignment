//server.js
const express = require("express");
const mysql = require('mysql');
const fs = require("fs");
const cors = require('cors');

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
    connection.query(`SELECT * FROM Product`, (err, rows, fields) => {
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
    connection.query(`SELECT productId, quantity FROM CartItem WHERE username='${req.params.username}';`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })
  .put((req, res) => {
    connection.query(`INSERT INTO CartItem (username, productId, quantity) VALUES ('${req.params.username}', ${req.body.productId}, ${req.body.quantity});`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })
  .post((req, res) => {
    connection.query(`UPDATE CartItem SET quantity=${req.body.quantity} WHERE username='${req.params.username}' AND productId=${req.body.productId};`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })
  .delete((req, res) => {
    connection.query(`DELETE FROM CartItem WHERE username='${req.params.username}' AND productId=${req.query.productId};`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(rows);
      }
    })
  })

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


router.route('/')

app.use('/api', router);
app.listen(port, () => console.log(`Listening on port ${port}...`));