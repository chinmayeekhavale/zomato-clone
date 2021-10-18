import { RestaurantModel } from "../../database/allModels";
import express from "express";

//Validation
import { ValidateRestaurantId, ValidateRestaurantCity, ValidateRestaurantSearchString } from "../../validation/restaurant";

const Router = express.Router();

/*
Route         /
Descrip       Get All Restaurant details
Params        None
Access        Public
Method        GET
*/

Router.get("/", async(req,res) => {
    try {
        await ValidateRestaurantCity(req.query);
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        return res.json({restaurants});
    }
    catch(error) {
        return res.status(500).json({error:error.message});
    }
});

/*
Route         /
Descrip       Get Particular Restaurant details on id
Params        _id
Access        Public
Method        GET
*/

Router.get("/:id", async(req,res) => {
    try {
        await ValidateRestaurantId(req.params);
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findOne(_id);

        if(!restaurant) 
        return res.status(404).json({error: "Restaurant not found"});

        return res.json({restaurant});
    }
    catch(error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route         /
Descrip       Get Particular Restaurant details on search
Params        none
Body          searchString
Access        Public
Method        GET
*/

Router.get("/search", async(req,res) => {
    try {
        await ValidateRestaurantSearchString(req.body);
        const {searchString} = req.body;
        const restaurant = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i"},
        });
        return res.json({restaurant});
    }
    catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;
