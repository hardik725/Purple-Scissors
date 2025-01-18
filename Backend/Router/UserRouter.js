import express from "express";
import { signUp, login,username} from "../Controller/UserController.js";
import { addToCart,addToWishlist,addToOrders } from "../Controller/UserController.js";
import { removeFromCart,removeFromWishlist,removeFromOrders } from "../Controller/UserController.js";
import { getAllCart,getAllWish,getAllOrder , getNumbers} from "../Controller/UserController.js";

const router = express.Router();

// Sign Up Route
router.post("/signup", signUp);

// Login Route
router.post("/login", login);

// Get username
router.post("/getname", username);

router.post("/addcart",addToCart);
router.post("/addwish",addToWishlist);
router.post("/addorder",addToOrders);

// now the path for remove from them

router.post("/removecart",removeFromCart);
router.post("/removewish",removeFromWishlist);
router.post("/removeorder",removeFromOrders);

//get all the items
router.post("/allcart",getAllCart);
router.post("/allwish",getAllWish);
router.post("/allorder",getAllOrder);

router.post("/allnum",getNumbers);

export default router;
