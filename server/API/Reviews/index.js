import express from "express";

import {ReviewModel} from "../../database/allModels";

const Router = express.Router();

/*
Route         /
Descrip       Add New Review
Params        none
Body          Review object
Access        Public
Method        POST
*/

Router.post("/new", async(req,res) => {
    try {
        const {reviewData} = req.body;

        await ReviewModel.create(reviewData);

        return res.json({review: "Successfully created Review"});
    }
    catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route         /delete
Descrip       Delete a Review
Params        none
Access        Public
Method        DELETE
*/

Router.post("/delete/:id", async(req,res) => {
    try {
        const {_id } = req.params;

        await ReviewModel.findByIdAndDelete(_id);

        return res.json({review: "Successfully deleted Review"});
    }
    catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;