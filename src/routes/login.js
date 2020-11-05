const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/login', (req, res) => {

    const { username } = req.body;

    //Genero el token
    let token = jwt.sign({
        user: username,
    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    res.json({
        token
    });
});

app.post('/verify', async (req, res) => {
    
    //Recupero el token del header de la peticion    
    const token = req.header('token');    

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        //El token no es correcto
        if (err) {
            return res.status(401).json({                
                message: 'Token no válido'                
            });
        }
        
        //El token es correcto
        res.json({
            message: 'Verificado'
        });
        
        
    });
});

module.exports = app;