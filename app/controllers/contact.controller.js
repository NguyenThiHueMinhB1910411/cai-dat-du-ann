const ContactService = require("../services/contact.service");
const MongDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");


exports.findOne = async(req, res,next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if(!document){
            return next (new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    }
    catch (error){
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=$req.params.id}`
            )
        );
    }
}

exports.update = async (req , res, next) => {
    if(Object.keys(req.body).length  === 0){
        return next (new ApiError(400, "Data to update can not be empty"));

    }
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was updated successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async( req, res, next) => {
    try{
        const contactService = new ContactService(MongDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: " Contact was deleted successfull "});
    }catch (error){
        return next(
            new ApiError(
                500,
                `Could not deleted contact with id=${req.param.id}`
            )
        );
    }
};



// exports.deleteAll = (req, res) =>{
//     res.send({message: "deleteAll handler"});
// };
exports.deleteAll = async (_req,res,next) =>{
    try{
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
        

    }catch (error){
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
}



// exports.findAllFavorite = (req, res) =>{
//     res.send({message: "findAllFavorite handler"});
// };

exports.findAllFavorite = async (_req,res,next) => {
    try {
        const contactService = new contactService(MongoDB.client);
        const documents = await contactService.findAllFavorite();
        return res.send(documents);
    }catch (error){
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorite contacts"
            )
        );
    }
};

//create and save a new contact
exports.create = async(req, res, next) =>{
    console.log(req.body);
    if(!req.body?.name){
        return next(new ApiError(400, "Name can not be empty"));
    }

    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    }catch (error){
        return next(
            new ApiError(500, "An error occurred while creatig the contact")
        );
    }
};


//cai dat handler findAll
//retrieve all contacts of a use from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try{
        const contactService = new ContactService(MongoDB.client);
        const {name} = req.query;
        if(name){
            documents = await ContactService.findByName(name);
        }else{
            documents = await ContactService.find({});

        }
    } catch(error){
        return next(
            new ApiError(5000, "An error occurred while retrieving contacts")
        );
    }

    return res.send(documents);
}
