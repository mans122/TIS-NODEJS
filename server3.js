var express=require("express");

// body-parser : 폼태그에 입력한 값을 데이터화 해서 ajax등 서버쪽에 보내고자 할 때 필요한 모듈
var bodyParser=require("body-parser"); 

var mysql=require("mysql");
var client=mysql.createConnection({
    user:'hkd',
    password:'1234',
    database:'company'
});

var app=express();
app.use(express.static("public")); // public이란 폴더를 사용한다.
app.use(bodyParser.urlencoded({extended:false})); 

//라우팅

    //목록 --get방식 처리
    app.get("/products",function(request,response){
        client.query("select * from products",function(error,data){
            response.send(data);
        });
    });

    //등록 -- 입력받아야 하므로 post방식 처리
    app.post("/products",function(request,response){
                //변수를 선언합니다.
                var name = request.body.name;
                var modelnumber = request.body.modelnumber;
                var series = request.body.series;
                console.log(name+modelnumber+series);
                //데이터베이스 요청 수행
                client.query('insert into products (name,modelnumber,series) values(?,?,?)',[
                    name, modelnumber, series],
                    function(error,data){
                    console.log(data);
                    response.send(data);
                });    
    });

    //수정 -- id를 동적패러미터로 받아서 처리
    app.put("/products/:id",function(request,response){        
        var id=Number(request.params.id);
        var name=request.body.name;
        var modelnumber=request.body.modelnumber;
        var series=request.body.series;
        var query='update products set ';
        if(name){query+=" name='"+name+"',"};
        if(modelnumber){query+=" modelnumber='"+modelnumber+"',"};
        if(series){query+=" series='"+series+"',"};
        query = query.substr(0,query.lastIndexOf(','));
        query+=" where id="+id;
        client.query(query,function(error,data){
            response.send(data);
        });
    });

    //삭제 -- 
    app.delete("/products/:id",function(request,response){
        var id=Number(request.params.id);

        // query="delete from products where id=?",[id],function(){};
        client.query("delete from products where id=?",[id],function(error,data){
            response.send(data);
        });
    });

app.listen(52273,function(){
    console.log("서버 연결됨 http://127.0.0.1:52273");
})