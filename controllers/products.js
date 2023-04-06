const ProductModel = require("../models/products");

const _ = require("lodash");
// import {get} from "lodash";

const Joi = require("joi");
var jwt = require('jsonwebtoken');
var config = require("../config")

const createProduct = function (req, res, next) {
    //     return res.send({test:isNaN(_.get(req,"body.price")),
    // price:_.get(req,"body.price")}) //this testing is called debugging

    //   if (isNaN(_.get("req.body.price"))) {
    //     return res.status(422).send({ err: "price should be a number" });
    //   } //we are validating the code

    //joi code 
    const schema = Joi.object().keys({
        title: Joi.string().max(150).required(),
        price: Joi.number().required(),
        description : Joi.string().required(),
        image : Joi.string().required()
        //max characters 
    });

    const { error } = schema.validate(req.body);
    const errorDetails = _.get(error, "details", []);
    // if(errorDetails.length  != 0){
    //     return res.send(errorDetails);
    // }

    if (!_.isEmpty(errorDetails)) {
        return res.send(errorDetails)
    };
    //   return res.send(_.get(error,"details",[]));

    const product = new ProductModel(req.body);
    // product.title = req.body.title;
    // product.image = req.body.image;

    product.save(function (err, data) {
        if (err) {
            return res.status(422).send(err);
        }
        return res.send(data);
    });
    // return res.send({success:true, body:req.body, product:product})
};

const getProducts = function (req, res, next) {
    ProductModel.find({}, function (err, data) {
        // return res.send("i am controller of products -abcd ")
        return res.send(data);
    });
};



const getProduct = function (req, res, next) {
    // const id= req.abcd.id //it will get an error abcd is not defined

    // const id = req && req.abcd && req.abcd.id //it is another method

    //it is equal to line no 12 that is a short method using es6 in js ?.
    //let id;
    //if(req){
    //if(req.abcd){
    //if(req.abcd.id){
    //id=req.abcd.id
    //}
    // }
    //}

    // const id = _.get(req,"abcd.id",123);
    const id = _.get(req, "params.id", null);

    ProductModel.findById(id, function (err, data) {
        // return res.send("i am controller of products -abcd ")
        if (err) {
            return res.status(404).send(err)
        }
        return res.send(data);
    });
};


//update data using put
const updateProduct = function (req, res, next) {

    const id = _.get(req, "params.id", null);

    const body = _.get(req, "body", {})
    
    ProductModel.findByIdAndUpdate(id, body, function (err, data) {
        if (err) {
            return res.status(404).send(err)
        }
        return res.send(data);
    })
}
  
// delete data using delete command

const deleteProduct = function (req, res, next) {

    const id = _.get(req, "params.id", null);
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.send({success:false , message: "You are not Authorized to perform this action"})
    }
    const token = authorization.split("Bearer"); 
    const decoded = jwt.verify(token[1],config.JWT_SECRET);
    if(decoded.role != "administrator"){
        return res.send({success:false , message: "You are not Authorized to perform this action"})
    }
    return res.send({success:true, decoded: decoded})
    // return res.send({success:true})
    
    ProductModel.findByIdAndDelete(id, function (err, data) {
        if (err) {
            return res.status(404).send(err)
        }
        return res.send(data);
    })
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
