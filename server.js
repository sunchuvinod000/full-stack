var express = require("express");
var app = express();
var mysql = require('mysql');
var cors = require("cors");
const { response } = require("express");
const path = require('path');

const PORT = process.env.PORT || 3005 

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//conection string
//mysql://vnk4ho3mm5249s80:ojegkcj1y4q2n7l9@w1h4cr5sb73o944p.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/hrk2k6wp4lehs95o
const db = mysql.createPool({
    
    host: "	w1h4cr5sb73o944p.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    username: "v6jy421keprwlt2i",
    password: "n08dhnapybx91p5d",
    database: "pwa1b2dciry6hdqe"
   

});
db.getConnection((error,connection) =>{
    try{
        if(connection){
            connection.release();
        }

    }
    catch(error){
        console.log(error);
    }
});


app.get('/read', async (req,res) =>{

    
  await  db.query('CREATE TABLE IF NOT EXISTS merntable(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,name varchar(255),email varchar(255),password varchar(255)) ', (err,resp)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log('created')
        }
    })
  await  db.query('select * from merntable',(error,response)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(response)
            console.table(response)
            res.json(response)
        }
    })

 
    
})
app.get('/:id',(req,res)=>{
    const sql = `select * from merntable where id = ${req.params['id']}`;
    db.query(sql,(error,response)=>{
        if(error){
            console.log(error)
        }
        else{
            
            res.json(response)
        }
    })
})
app.post('/',  (req,res)=>{
    const values=[[req.body.name,req.body.email,req.body.password]]
    db.query('insert into merntable (name,email,password) values ?', [values], (error,response)=>{
      if(error){
          console.log(error)
      }
      else{
          res.json('inserted the row')
          console.log('inserted th values')
      }
    }) 
})
app.put('/:id', (req,res)=>{
    console.log()
    const values=[req.body.name, req.body.email, req.body.password, req.params['id']]
    db.query('update merntable set name = ?, email = ?, password = ? where id = ?',values,(error,response)=>{
        if(error){
            console.log(error)
        }
        else{
            res.json('updated the value')
            console.log('updated the value')
        }
       
    })
   
})


app.delete("/:id", (req,res)=>{

 
 db.query('DELETE FROM merntable WHERE id = ?',[req.params['id']],(error,response)=>{
    if(error){
        console.log(error)
    }
    else{
        res.send('deleted')
        console.log('deleted the row')
    }
 })
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'frontend/build')));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, 'frontend/build','index.html'));
    })
}



app.listen(PORT, ()=>{
    console.log("listening on 3005")
})
