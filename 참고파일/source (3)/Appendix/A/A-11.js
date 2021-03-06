// 모듈을 추출합니다.
var net = require('net');
var crypto = require('crypto');

//변수를 선언합니다.
var guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

// TCP 서버를 생성합니다.
net.createServer(function (socket) {
  socket.on('data', function (data) {
    if (/websocket/.test(data.toString())) {
      // Socket Key를 추출합니다.
      var headers = data.toString().split('\n');
      var socketKey = '';
      headers.forEach(function (item) {
        var dictionary = item.split(':');
        if (dictionary.length == 2 && dictionary[0].toLowerCase().trim() == 'sec-websocket-key') {
          socketKey = dictionary[1].trim();
        }
      });

      // Response Key를 생성합니다.
      var longKey = socketKey + guid;
      var shasum = crypto.createHash('sha1').update(longKey);
      var outputKey = shasum.digest('base64');

      // 응답 헤더를 작성합니다.
      socket.write('HTTP/1.1 101 Switching Protocols\r\n');
      socket.write('Upgrade: WebSocket\r\n');
      socket.write('Connection: Upgrade\r\n');
      socket.write('Sec-WebSocket-Accept: ' + outputKey + '\r\n\r\n');

      // 메시지를 전달합니다.
      setInterval(function () {
      }, 1000);
    } else if (/HTTP/.test(data.toString())) {
      // HTML 문자열 배열을 생성합니다.
      var output = [];
      output.push('<script>');
      output.push('    var socket = new WebSocket("ws://localhost:52273/")');
      output.push('    socket.onopen = function (event) {');
      output.push('        console.log("Web Socket Open.");');
      output.push('        setInterval(function () {');
      output.push('            socket.send("From Client");');
      output.push('        }, 1000);');
      output.push('    };');
      output.push('    socket.onerror = function (error) {');
      output.push('        console.log(error);');
      output.push('    };');
      output.push('    socket.onmessage = function (event) {');
      output.push('        console.log("Web Socket Data: " + event.data);');
      output.push('    };');
      output.push('    socket.onclose = function (event) {');
      output.push('        console.log("Web Socket Close.");');
      output.push('    };');
      output.push('</script>');

      // 문자열로 변환합니다.
      output = output.join('\n');

      // 응답 헤더를 작성합니다.
      socket.write('HTTP/1.1 200 OK\r\n');
      socket.write('Server: RintIanTta Node.js Custom Server\r\n');
      socket.write('Content-Type: text/html\r\n');
      socket.write('Content-Length: ' + output.length + '\r\n');
      socket.write('\r\n');
      socket.write(output);
      socket.end();
    } else {

    }
  });
}).listen(52273, function () {
  console.log('TCP Server Running at 127.0.0.1:52273');
});