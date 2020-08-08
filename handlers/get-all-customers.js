const mysql=require('mysql');
const mysqlCfg={
    user: 'root',
    password: 'Admin@123',
    database: 'northwind',
    port: 3306,
    host: 'localhost'
};

module.exports=function(req,resp){

    const page= req.query.page || 1;
    const limit= req.query.limit || 10;
    const skip=(page-1)*10;
    const conn=mysql.createConnection(mysqlCfg);
    conn.query('SELECT * from customers limit ? offset ?',[parseInt(limit), skip], function(err, rows){
        if (err) throw err;
    
        resp.send(rows);
    });
    conn.end();
};