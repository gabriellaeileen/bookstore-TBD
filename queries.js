const getInventory = `SELECT * FROM public.inventorydetails`;

const getRating = `SELECT * FROM public.bookrating`;

const getBook = `SELECT * FROM public.bookinfo`;

const getWishlist = `SELECT * FROM public.customerwishlist`;

const getRatingbyBook = `SELECT * FROM public.bookrating WHERE bookname= $1`

const getBookbyLang ="SELECT * FROM public.bookinfo WHERE langname=$1";

const getBookbyPublisher = `SELECT * FROM public.bookinfo WHERE "Publisher_name"=$1`;

const checkRatingExist = `SELECT * FROM public."Rating" WHERE "Book_booknum" = $1 AND "Customer_custID" = $2`;

const addRatingQuery = `INSERT INTO public."Rating" ("Book_booknum", "Customer_custID", rate, rev, revdate)  VALUES ($1, $2, $3, $4, $5)`;

const deleteRating = `DELETE FROM public."Rating" WHERE rate= $1`;

const deleteCustomer = `DELETE FROM public."Customer" WHERE phone= $1`;

const getBookbyAuthor = `SELECT * FROM public.bookinfo WHERE authname= $1`;

const updateCustomerName = 'UPDATE public."Customer" SET custname = $1 WHERE phone = $2';

const getCustomer = `SELECT * FROM public.customerinfo`;

const getCustomerbyPhone = `SELECT * FROM public.customerinfo WHERE phone = $1`;

const insertCustomer = `INSERT INTO "Customer" ("custID", custname, phone, "addrID") 
VALUES ($1, $2, $3, $4)`;

const checkCustomerExist = `SELECT * FROM public."Customer"
WHERE phone= $1`;

const insertAddress= `INSERT INTO "Address" ("addrID", street, city, province, country, postcode) 
VALUES ($6, $1, $2, $3, $4, $5)`;

const addWishlistQuery= `INSERT INTO "Wishlist" ("Customer_custID", "Book_booknum")
VALUES ($2, $1)`;

const checkWishlistExist = `SELECT * FROM public."Wishlist" WHERE "Book_booknum" = $1 AND "Customer_custID" = $2`;

const checkAddressExist = `SELECT * FROM public.alamat WHERE street = $1 AND city = $2 AND province = $3 AND country = $4 AND postcode = $5`;

const getBookbyTitle = `SELECT * FROM public.bookinfo WHERE bookname= $1`;

const getBookbyFormat = `SELECT * FROM public.bookinfo WHERE format= $1`;

module.exports = {
    getInventory,
    getRating,
    getBook,
    getWishlist,
    getBookbyPublisher,
    getRatingbyBook,
    getBookbyLang,
    getBookbyTitle,
    getBookbyAuthor,
    getBookbyFormat,
    checkRatingExist,
    addRatingQuery,
    deleteRating,
    deleteCustomer,
    updateCustomerName,
    getCustomer,
    getCustomerbyPhone,
    insertAddress,
    insertCustomer,
    checkCustomerExist,
    addWishlistQuery,
    checkWishlistExist,
    checkAddressExist,
};