const express = require('express');
const app = express();
const appR = express();
const cors = require('cors');
const pool = require('./db');


//middleware 
app.use(cors());
app.use(express.json());
appR.use(cors());
appR.use(express.json());


//ROUTES

//create an item 

app.post("/bikes",  async (req, res) => {
    try {
        
        const { name, type, price } = req.body;

        const newItem = await pool.query(
            "INSERT INTO bikes (name, type, price) VALUES($1,$2,$3) RETURNING *", 
            [name, type, price]
            );
        res.json(newItem.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

appR.post("/rented",  async (req, res) => {
    try {
        
        const { name, type, price } = req.body;

        const newEl = await pool.query(
            "INSERT INTO rented (name, type, price) VALUES($1,$2,$3) RETURNING *", 
            [name, type, price]
            );
        res.json(newEl.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})


//get all items after reload

app.get("/bikes", async(req, res) => {
    try {
        const allBikes = await pool.query('SELECT * FROM bikes');
        res.json(allBikes.rows)
    } catch (err) {
        console.error(err.message);
        
    }
})

appR.get("/rented", async(req, res) => {
    try {
        const allRents = await pool.query('SELECT * FROM rented');
        res.json(allRents)
    } catch (err) {
        console.error(err.message);
        
    }
})

//GET AN ITEM

app.get("/bikes/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const bike = await pool.query("SELECT * FROM bikes WHERE id = $1", [id]);

        res.json(bike.rows[0]);
    } catch (err) {
        console.error(err.message);
        
    }
})

appR.get("/rented/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const bikeRented = await pool.query("SELECT * FROM rented WHERE id = $1", [id]);

        res.json(bikeRented.rows[0]);
    } catch (err) {
        console.error(err.message);
        
    }
})

//delete an item from available list

app.delete("/bikes/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteBike = await pool.query("DELETE FROM bikes WHERE id = $1", [id]);

        res.json('bike was deleted!');
    } catch (err) {
        console.error(err.message);
        
    }
})

appR.delete("/rented/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteRent = await pool.query("DELETE FROM rented WHERE id = $1", [id]);

        res.json('rented bike was deleted!');
    } catch (err) {
        console.error(err.message);
        
    }
})

app.listen(5000, () => {
    console.log('server has started on port 5000');
});

appR.listen(5001, () => {
    console.log('server has started on port 5001');
});
