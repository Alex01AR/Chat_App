import  express, { Router }  from "express";


const hellomsg = Router();


hellomsg.get('/hello', (req, res) => {
    res.send('Hello World!');        // Send response to the client
});

export {hellomsg}