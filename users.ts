const express=require('express');
const fs=require('fs');
const router=express.Router();
const pg=require("./database");



router.get('/:id',async (req:any,res:any)=>{ 
  const { id }=req.params;
  console.log(`Hello from get ${id}`)
  await pg.query(`SELECT * FROM  users,customer,role where users.uid=${id} and users.uid=customer.cid and users.uid=role.rid order by uid;`,
    (err:any,result:any)=>{
        if(err)
        console.log("Error");
        else{
           console.log(result.rows);
            res.status(200).json(result.rows);
            
        }
        
    });
   
   
});

router.get('/',async (req:any,res:any)=>{ 

  await pg.query('SELECT * FROM  users,customer,role where users.uid=customer.cid and users.uid=role.rid order by uid;',
    (err:any,result:any)=>{
        if(err)
        console.log("Error");
        else{
            
            res.status(200).json(result.rows);
            
        }
        
    });
   
   
});





router.post('/',async (req:any,res:any)=>{
   
    const user=req.body;
    console.log("In post");
   
    var queryResult=await pg.query(`INSERT INTO users(UId,First_Name,Middle_Name,Last_Name,Email,Phone_Number,Role,Address,createdOn) VALUES (${user.uid},'${user.fname}', '${user.mname}','${user.lname}','${user.email}','${user.phonenumber}','${user.role}','${user.address}',now());
    INSERT INTO role(rid,rname,key,description) VALUES (${user.uid},'${user.rname}', '${user.key}','${user.description}');
    INSERT INTO customer(CName,Website,CAddress,CId) VALUES ('${user.cname}', '${user.website}','${user.caddress}','${user.uid}');`,(err:any,result:any)=>{
        if(err){
            res.status(404).send("Something went wrong! Check your data");
        }
         else{
             res.send("Updated");
         }
    });
    
});

router.delete('/:id',async (req:any,res:any)=>{
    const { id } = req.params;
    await pg.query(`DELETE FROM role WHERE rid=${id};
    DELETE FROM Customer WHERE cid=${id};
    DELETE FROM users WHERE UId=${id};`, (err:any,result:any)=>{
        if(err)
        console.log("Error");
        else{
            console.log("Deleted");
            res.status(200).send("Successfully deleted");
            
        }
        
    });
});

router.patch('/:id',async (req:any,res:any)=>{
    const { id } = req.params;
    

    const user = req.body;
   
    const queryResult=await pg.query(`UPDATE users SET First_Name='${user.fname}',
        Middle_Name='${user.mname}',Last_Name='${user.lname}',Email='${user.email}',
        Phone_Number='${user.phonenumber}',Role='${user.role}',Address='${user.address}'
        WHERE UId=${id};
        UPDATE customer SET CName='${user.cname}',Website='${user.website}',
        CAddress='${user.caddress}' WHERE CId=${id};

        UPDATE role SET rname='${user.rname}',key='${user.key}',description='${user.description}' WHERE rid=${id};
        
        `,(err:any,result:any)=>{
            if(err){
                console.log("error");
                res.status(404).send("Error in updating");
            }

            else{ 
                console.log("updated");
                res.send("Updated");
            }
        });
    
  
    
}); 


export default router;