//모듈 추출
var http=require('http');
var fs=require('fs');
var socketio=require('socket.io');

//웹서버 생성
var server=http.createServer(function (request,response){
    //HTMLPage.html파일을 읽습니다.
    fs.readFile('HTMLPage.html',function(error,data){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end(data);
    });
}).listen(52273, function(){
    console.log('server running at http://127.0.0.1:52273');
});