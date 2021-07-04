import express from "express";
import {checkCreatePaymentRequest, checkDeletePaymentRequest, checkUpdatePaymentRequest, handleAuth, handleCreatePayment, handleCreateUser, handleDeletePayment, handleGetApp, handleGetPayments, handleLogin, handleLogout, handleUpdatePayment, verifyCookie} from "./middlewares";

export const router = express.Router();

// parse post body content so that it can be accessed - https://stackoverflow.com/questions/5710358/how-to-access-post-form-fields
router.use(express.json());

router.get("/", handleGetApp);

router.post("/login", handleLogin);
router.post("/createUser", handleCreateUser);

router.use(verifyCookie);
router.get("/auth", handleAuth);
router.get("/payments", handleGetPayments);

router.post("/create", checkCreatePaymentRequest);
router.post("/create", handleCreatePayment);

router.post("/udpate", checkUpdatePaymentRequest);
router.post("/update", handleUpdatePayment)

router.post("/delete", checkDeletePaymentRequest);
router.post("/delete", handleDeletePayment);

router.get("/logout", handleLogout);




