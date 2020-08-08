const mysql=require('mysql');
const mysqlCfg=require('./mysql-config');

module.exports=(req, resp)=>{
    const conn=mysql.createConnection(mysqlCfg);

    const requiredFields=[ 'CUSTOMER_ID', 'COMPANY_NAME', 'CONTACT_NAME', 'CONTACT_TITLE',
        'ADDRESS', 'CITY', 'REGION', 'POSTAL_CODE', 'COUNTRY', 'PHONE', 'FAX'];

    const missingFields=[];

    requiredFields.forEach ((field)=>{
        if(field in req.body === false){
            missingFields.push(field);
        }
    });

    if(missingFields.length >0){
        resp.status(400);
        resp.json({missingFields});
        return;
    }
    conn.query('insert into customers set ?',(req.body), (err)=>{
        if (err) throw err;  //results in HTTP resp code 500
        resp.end();
    });   
};