var express=require("express");
var ejs = require("ejs");
var fs = require("fs"); //file system
var app=express();

app.use("/ejs",function(request,response){
    // 파일을 읽습니다.
    fs.readFile('sample.html', 'utf8', function (error, data) {

        response.send(ejs.render(data,{
            title:"ejs연습",
            name:"aaa",
            list:[{name:"홍길동",id:"hkd"},{name:"왕건",id:"wk"}]
        }));
    });
});

app.listen(52273,function(){
    console.log("서버 연결됨 http://127.0.0.1:52273");
})