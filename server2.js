var mysql=require("mysql");

var client=mysql.createConnection({
    user:'hkd',
    password:'1234'
});
//query함수가 오버로딩 되어있음.
client.query("use company");
//첫번째 매개변수 query문, 2번째 매개변수 함수
//nonblocking I/O  기존 JDBC는 결과값을 rs등에 저장하는 방식이었으나, 
//nodejs는 결과값을가지고  바로 함수를작성할 수 있다.
client.query("select * from products",function(error,result,field){
    if(error){
        console.log(error);
    }else{
        console.log(result);
    }
});