const { Router } = require('express'); // Import the Router class from express
const fs = require ('fs');

const router = Router(); // Create a new instance of the Router class
const filepath= __dirname+'/razzecani.json';

const getCani = (req, res)=> {
    fs.readFile(filepath, 'utf8', function (err, data) { //read the file
        res.setHeader('Content-type', 'application/json', 'charset-utf-8');
        try {
            const razzecani =JSON.parse(data); //get the data
            res.status(200).send( razzecani); //send data
        } catch (err) { //if error send error
            err.code = 404;
            console.log(err);
            res.status(404).send({ message: 'Cani non trovati' });

        }
    });
}



router.get ('/', getCani);
/**
 * @swagger
 * components:
 *      schemas:
 *          Cani:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  nome:
 *                      type: string
 *                  razza: 
 *                      type: string
 */





/**
 * @swagger
 * /api/razzecani/:
 *      get:
 *          summary: Get all cani
 *          description: Get all cani
 *          responses:
 *              200:
 *                  description: A list of dogs
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Cani'
 *              404:
 *                  description: Cani Not found
 */

module.exports =router;