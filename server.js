//express 모듈 사용

var express=require("express");

//웹서버 생성
var app=express();

//웹서버 응답
app.use(express.static('public'));
// app.use(function(request,response){ response.send("<h1>안녕하세요?</h1>");});

var items=[{
    name:"우유",
    price:"2000"
},{
    name:"홍차",
    price:"5000",
},{
    name:"커피",
    price:"3000",
}];
//라우트 합니다. (주소를 설정합니다.)
app.all("/data.html",function(request,response){ 
    var output="";
    output+="<!DOCTYPE html>";
    output+="<html lang='en'>";
    output+="<head>";
    output+="<meta charset='UTF-8'>";
    output+="<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
    output+="<meta http-equiv='X-UA-Compatible' content='ie=edge'>";
    output+="<title>nodejs</title>";
    output+="</head>";
    output+="<body>";
    //javascript forEach 반복문
    items.forEach(function(item){
        output+="<div>";
        output+="    <h1>"+item.name+"</h1>";
        output+="    <h2>"+item.price+"</h2>";
        output+="</div>";
    });
    output+="</body>";
    output+="</html>";
    response.send(output);
});
app.all("/data.json",function(request,response){ 
    // response.type("application/json");
    // response.send(JSON.stringify(items));

    // response.type("text/json");
    // response.send(items);

    response.send(items);
 });
app.all("/data.xml",function(request,response){ 
    var output='';
    output+='<?xml version="1.0" encoding="utf-8"?>';
    output+='<products>';
    items.forEach(function(item){
        output+='<product>';
        output+='  <name>'+item.name+'</name>';
        output+='  <price>'+item.price+'</price>';
        output+='</product>';
    });
    output+='</products>';
    response.type("text/xml");
    response.send(output);
});
app.all("/parameter/:id",function(request,response){
     //변수 선언
     var id=request.params.id;
    //  var id = request.param('id');
     //응답합니다
     response.send('<h1>'+id+'</h1>');
    });

app.all("/parameters/:id/:no",function(request,response){
    var id=request.params.id;
    response.send('<h1>'+id+'</h1>');
    
    },function(request,response){
        var no=request.params.no;
        response.send('<h2>'+no+'</h2>');
        response.send('<h2>아아아아아아아</h2>');
    });
//웹서버 실행
app.listen(52273,function(){
    console.log("서버시작됨 http://127.0.0.1:52273");
})