const express = require("express"); 
const app = express();
const playRoutes = require ('./src/api/routes/play.routes.js')
const cors = require("cors");

const { connect } = require ('./bd')

connect();

//
app.use(
     cors({
          origin: "*",
          credential: true,
     })
);

app.use(express.json());

app.use("/play", playRoutes);// ruta inicial
// app.use("/companies", companiesRoutes);// ruta inicial


app.get("/", (req, res) => {
     res.send("Express on Vercel"); 
}); 


const PORT = process.env.PORT || 5002; 

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

module.exports = app;