const { Router } = require('express');
const controller = require('./controller')

const router = Router();

router.get("/inventory", () => controller.getInventory);
router.get("/rating", controller.getRating);
router.get("/book", controller.getBook);
router.get("/book/language/:langname", controller.getBookbyLang);
router.get("/book/author/:authname", controller.getBookbyAuthor);
router.get("/book/title/:bookname", controller.getBookbyTitle);
router.get("/book/format/:format", controller.getBookbyFormat);
router.get("/book/publisher/:Publisher_name", controller.getBookbyPublisher);
router.get("/customer", controller.getCustomer);
router.get("/customer/phone/:phone", controller.getCustomerbyPhone);
router.get("/wishlist", controller.getWishlist);

router.post("/rating", controller.addRating);
router.post("/wishlist", controller.addWishlist);
router.post("/customer2", controller.addCustomer2);
router.post("/address", controller.insertAddress);
router.post("/customer3", controller.addCustomer3);

router.delete("/:rate", controller.deleteRating);
router.delete("/customer/:phone", controller.deleteCustomer);

router.put("/customer/:phone", controller.updateCustomerName);

module.exports = router;