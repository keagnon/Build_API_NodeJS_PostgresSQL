const fetch = require('node-fetch');
const { Pool } = require('pg');

// Connexion à la base de données PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db',
    password: 'db',
    port: 5432,
});

async function lastElementDB() {
  try {
    // requête pour récupérer le dernier élément
    const resultat = await pool.query('SELECT * FROM db ORDER BY _id DESC LIMIT 1'); 

    // extraire le dernier élément de la réponse
    const dernierElement = resultat.rows[0]._id; 

    // retourner la valeur de l'élément
    return dernierElement;

  } catch (erreur) { 
   // console.error('Erreur lors de la récupération du dernier élément:', erreur.message); 
  }
}
  
  
async function displayLastBlock() {
    while (true) {
      try {
        // récupérer la réponse depuis l'API
        const reponse = await fetch("https://chain.api.btc.com/v3/block/latest"); 

        // extraire les données JSON de la réponse
        const data = await reponse.json(); 

        // extraire la hauteur de la réponse
        const hauteur = data.data.height; 

        return hauteur
       
      } catch (erreur) {
       // console.error("Une erreur est survenue : " + erreur);
        await new Promise(resolve => setTimeout(resolve, 12000)); 

      }
    }
 }

async function insert(start,latest){
    val=true;
    for(let i=start; i<latest;i++){
       
        //while (val==true) {
            try {
                const reponse = await fetch("https://chain.api.btc.com/v3/block/"+i);
                const data = await reponse.json(); 
                // Insérer les données dans la base de données
                    pool.query('INSERT INTO test (height, hash, time) VALUES ($1, $2, $3)', [data.data.height,data.data.height, data.data.height], (error, results) => {
                        if (error) {
                            throw error;
                        }
                        else{
                            val=false;
                            console.log('Data inserted successfully');
                        }
                        //
                        
                       // pool.end();
                    });
            
            } catch (erreur) {
            // gérer les erreurs de manière appropriée
            console.error("Une erreur est survenue : " + erreur);
            
                await new Promise(resolve => setTimeout(resolve, 1600)); 
            }
            
       // }
        
    }
}

async function lastblock() {

    // appeler la fonction avec await pour récupérer la valeur
   const hauteur = await displayLastBlock();
    const dernierElement = await lastElementDB(); 
    //insert(dernierElement,hauteur);
    //console.log(dernierElement,hauteur);
    insert(55,1000);
    
}

lastblock();




