const mysql=require('mysql');
const mysqlCfg=require('./mysql-config');

module.exports=(req, resp)=>{
    const id=req.params.customerId;
    const conn=mysql.createConnection(mysqlCfg);

    //cause of an SQL Injection
    //const sql='select * from customers where custome_id='${id}';
    const sql='select * from customers where customer_id=?';
    conn.query(sql, id, (err, result)=>{
        if(err) throw err;
        resp.send(result[0]);

        //delayed response (deliberate)
        // setTimeout(() => resp.send(result[0]), 000);
    });
    conn.end();

};