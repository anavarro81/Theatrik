const express = require("express"); 
const app = express(); 

const { connect } = require ('./bd')


connect();

app.use(express.json());


app.get("/", (req, res) => {
     res.send("Express on Vercel"); 
}); 




const PORT = process.env.PORT || 5002; 

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

module.exports = app;