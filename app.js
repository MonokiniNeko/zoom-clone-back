import express from 'express';
import cors from 'cors';
import start from './ressources/listerners';

// Here to change the listenning port
const port = 8000






const app = express();


const server = app.listen(
    port, 
    () => {console.log('Zoom Clone API is listening on port '+ port);
})


start(server)