//모듈 추출
var fs = require("fs"); //file system
var express=require("express");
var ejs = require("ejs");
var bodyParser=require("body-parser"); 
var mysql=require("mysql");

//데이터 베이스 연결
var client=mysql.createConnection({
    user:'hkd',
    password:'1234',
    database:'company'
});

//서버 생성
var app=express();
app.use('/css',express.static('css'));
app.use(bodyParser.urlencoded({extended:false}));

//서버 실행
app.listen(52273,function(){
    console.log("서버 연결됨 http://127.0.0.1:52273");
})

// 라우팅(url이동) 설정
app.get('/',function(request,response){
    //파일을 읽습니다.
    fs.readFile('board_list.html','utf8',function(error,data){
        //DB쿼리 실행
        client.query('select * from board order by id desc limit 0,10',function(error,results){
            //응답
            response.send(ejs.render(data,{
                data : results
                }));
        });
    });
});

//등록 링크 누를 때
app.get('/insert',function(request,response){
    //파일 읽습니다.
    fs.readFile('board_insert.html','utf8',function(error,data){
        response.send(data);
    });
});

//form에 데이터 입력 후 submit 버튼을 눌렀을 때
app.post('/insert',function(request,response){
    //변수 선언
    var body=request.body;
    var d=new Date(); 
    var year=d.getFullYear(); //년도
    var month=d.getMonth()+1; //월 , +1해야 현재 월
    var date=d.getDate(); // 일
    if(month<10){ month="0"+month; } // 01월 02월 이렇게 2자리 맞춰주기 위한 코드
    var ymd = year+"-"+month+"-"+date;
    //db query 실행
    client.query('insert into board(title, content, wdate) values(?, ?, ?)',
    [body.title, body.content, ymd],function(){
        //응답합니다.
        response.redirect('/'); // 목록으로 이동
    });
});

//title 링크 클릭했을 때
app.get('/content/:id',function(request,response){
    //파일을 읽습니다
    fs.readFile('board_content.html','utf8',function(error,data){
        //query실행
        client.query('select * from board where id= ?',request.params.id,function(error,result){
            //응답 및 데이터보내줌
            response.send(ejs.render(data,{
                data:result[0]
                //1건일때도 배열로 처리가되서
                //data : result[0] 을 해줘야 forEach를 안써도 된다.
                }));
        });
    });
});

//삭제
app.get('/delete/:id',function(request,response){
   client.query('delete from board where id=?',request.params.id,function(error,request){
       response.redirect('/');
   });
});