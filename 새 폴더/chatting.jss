//모듈 추출
var http=require('http');
var fs=require('fs');
var socketio=require('socket.io');
const hostname = '192.168.0.101';
const port = 80;

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

//소켓버서 생성
var io=socketio.listen(server);
//connection은 내장 이벤트같음
io.sockets.on('connection',function(socket){
    //message는 사용자정의 이벤트
    socket.on('message',function(data){
        //클라이언트한테 message이벤트 발생시킴.
        io.sockets.emit('message',data);
    })
})