// const express = require("express");
// const contactsRouter = require("./app/routes/contact.route");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use("/api/contacts", contactsRouter);

// app.get("/",(req, res) => {
    //     res.json({message: " Welcome to contact book application."});
    // });
    
    // module.exports = app;
    
const express = require("express");
const ApiError = require("./app/api-error");

const contactsRouter = require("./app/routes/contact.route");

const cors = require("cors");
const { application } = require("express");

const app = express();
app.use(express.json());

app.use(cors());
app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req, res, next)=>{
    return next(new ApiError(404, "Resource not found"));
});
//define error
app.use((err,req,res,next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

application.use(express.json());


module.exports = app;