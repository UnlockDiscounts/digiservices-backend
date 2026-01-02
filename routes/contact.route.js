import {
    createContactMessage,
    getContactMessages,
    deleteContactMessage
} from "../controllers/contact.controller.js";
import Router from "express";

const contactRouter = Router();

// ROUTES
contactRouter.post("/", createContactMessage);
contactRouter.get("/", getContactMessages);
contactRouter.delete("/:id", deleteContactMessage);
export default contactRouter;
