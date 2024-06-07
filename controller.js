const { query } = require('express');
const pool = require('../../db');
const queries = require('./queries')

const getInventory = (req, res) => {
    pool.query(queries.getInventory, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getWishlist = (req, res) => {
    pool.query(queries.getWishlist, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getRating = (req, res) => {
    pool.query(queries.getRating, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getCustomer = (req, res) => {
    pool.query(queries.getCustomer, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getBook = (req, res) => {
    pool.query(queries.getBook, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getRatingbyBook = (req,res) => {
    const bookname = req.params.bookname;
    pool.query(queries.getRatingbyBook, [bookname], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getCustomerbyPhone = (req,res) => {
    const phone = req.params.phone;
    pool.query(queries.getCustomerbyPhone, [phone], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getBookbyPublisher = (req, res) => {
    const Publisher_name = req.params.Publisher_name;
    pool.query(queries.getBookbyPublisher, [Publisher_name], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getBookbyFormat = (req, res) => {
    const format = req.params.format;
    pool.query(queries.getBookbyFormat, [format], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getBookbyLang = (req, res) => {
    const langname = req.params.langname;
    pool.query(queries.getBookbyLang, [langname], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getBookbyTitle = (req, res) => {
    const bookname = req.params.bookname;
    pool.query(queries.getBookbyTitle, [bookname], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getBookbyAuthor = (req, res) => {
    const authname = req.params.authname;
    pool.query(queries.getBookbyAuthor, [authname], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addRating = (req, res) => {
    const { Book_booknum, Customer_custID, rate, rev, revdate } = req.body;

    // Check if rating exists
    pool.query(queries.checkRatingExist, [Book_booknum, Customer_custID], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            return res.status(400).send("Rating already exists");
        }

        // Insert new rating
        pool.query(queries.addRatingQuery, [Book_booknum, Customer_custID, rate, rev, revdate], (error, results) => {
            if (error) throw error;
            res.status(201).send("Rating added successfully");
        });
    });
};

const deleteRating = (req, res) => {
    const rate = req.params.rate;
    pool.query(queries.deleteRating, [rate], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            return res.status(404).send("Rating does not exist");
        }
        res.status(200).send("Rating deleted successfully")
    });
};

const deleteCustomer = (req, res) => {
    const phone = req.params.phone;
    pool.query(queries.deleteCustomer, [phone], (error, results) => {
        if (error) {
            // Handle the error gracefully
            console.error('Error deleting customer:', error);
            return res.status(500).send("An error occurred while deleting the customer.");
        }

        // Check if any rows were affected (deleted)
        if (results.affectedRows === 0) {
            return res.status(404).send("Customer does not exist");
        }

        // Send a success response
        res.status(200).send("Customer deleted successfully");
    });
};


const updateCustomerName = (req, res) => {
    const phone = req.params.phone;
    const {custname} = req.body;

    pool.query(queries.getCustomerbyPhone, [phone], (error, results) => {
        const noCustomer = !results.rows.length;
        if(noCustomer) {
            res.send("customer doesnt exist");
        }

        pool.query(queries.updateCustomerName, [custname, phone], (error, results) => {
            if (error) throw error;
            res.status(200).send("Customer name updated");
        });
    });
};

const addWishlist = (req, res) => {
    const { Book_booknum, Customer_custID } = req.body;

    // Check if book exist in wishlist
    pool.query(queries.checkWishlistExist, [Book_booknum, Customer_custID], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            return res.status(400).send("Book is already in wishlist!!!!!");
        }

        // Insert new book
        pool.query(queries.addWishlistQuery, [Book_booknum, Customer_custID], (error, results) => {
            if (error) throw error;
            res.status(201).send("Book successfully added to wishlist");
        });
    });
};

const insertAddress = (req, res) => {
    const { street, city, province, country, postcode, addrID } = req.body; 

    pool.query(queries.checkAddressExist,  [street, city, province, country, postcode], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            return res.status(400).send("address exist!");
        }

        pool.query(queries.insertAddress, [ street, city, province, country, postcode, addrID], (error, results) => {
            if (error) throw error;
            res.status(201).send("address successfully added");
        });
    });
};

const addCustomer2 = async (req, res) => {
    const { custID, custname, phone, street, city, province, country, postcode, addrID} = req.body; 
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Check if customer exists
        const customerCheck = await client.query(queries.checkCustomerExist, [phone]);
        if (customerCheck.rows.length) {
            await client.query('ROLLBACK');
            return res.status(400).send("Customer already exists");
        }

        // Check if address exists
        const addressCheck = await client.query(queries.checkAddressExist, [street, city, province, country, postcode, ]);
        if (addressCheck.rows.length) {
            addrID = addressCheck.rows[0].addrID;
        } else {
            // Insert new address
            const addressInsert = await client.query(queries.insertAddress, [street, city, province, country, postcode, addrID]);
            addrID = addressInsert.rows[0].addrID;
        }

        // Add customer
        await client.query(queries.insertCustomer, [custID, custname, phone, addrID]);

        await client.query('COMMIT');
        res.status(201).send("Customer and address added successfully");
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error adding customer:', error);
        res.status(500).send("Failed to add customer and address");
    } finally {
        client.release();
    }
};



const addCustomer3 = async (req, res) => {
    const { custID, custname, phone, street, city, province, country, postcode, addrID } = req.body; 

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

                // Check if address exists
       let addressCheck;
        try {
            addressCheck = await client.query(queries.checkAddressExist, [street, city, province, country, postcode]);
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error checking address existence:', error);
            return res.status(500).send("Failed to check address existence");
        }
        // Check if customer exists
        const customerCheck = await client.query(queries.checkCustomerExist, [phone]);
        if (customerCheck.rows.length) {
            await client.query('ROLLBACK');
            return res.status(400).send("Customer already exists");
        }

        if (!addressCheck.rows.length) {
            // Insert new address
            try {
            await client.query(queries.insertAddress, [ street, city, province, country, postcode, addrID]);
            } catch (error) {
                await client.query('ROLLBACK');
                console.error('Error inserting address:', error);
                return res.status(500).send("Failed to insert address");
            }
        }

        // Add customer
        try {
            await client.query(queries.insertCustomer, [custID, custname, phone, addrID]);
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error inserting customer:', error);
            return res.status(500).send("Failed to insert customer");
        }


   
   
    

        await client.query('COMMIT');
        res.status(201).send("Customer and address added successfully");
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error adding customer:', error);
        res.status(500).send("Failed to add customer and address");
    } finally {
        client.release();
    }
};






module.exports = {
    getInventory,
    getCustomer,
    getRating,
    getBook,
    getWishlist,
    getRatingbyBook,
    getCustomerbyPhone,
    getBookbyPublisher,
    getBookbyLang,
    getBookbyFormat,
    getBookbyTitle,
    getBookbyAuthor,
    addRating,
    addWishlist,
    deleteCustomer,
    deleteRating,
    updateCustomerName,
    addCustomer2,
    addCustomer3,
    insertAddress,
};