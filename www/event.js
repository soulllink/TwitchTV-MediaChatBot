const url = 'ws://localhost:3333'
const connection = new WebSocket(url)


connection.onerror = error => {
  console.log(`WebSocket error: ${error}`)
}

connection.onopen = () => {
  connection.send('Web client is refreshed')
}

connection.onmessage = e => {
  let render = JSON.parse(e.data)
  console.log(render,);
  let refduration = Number((render.duration.toFixed(3)).toString().split(".").join("")); 
  if (render.type === "mp3") {
    let aurl = './sounds/' + render.filename + '.mp3';
    let audio = new Audio(aurl);
    audio.load();
    audio.play();
  }
  if (render.type === "mp4") {
      let vurl = './videos/' + render.filename + '.mp4';
      $('video #source').attr('src', vurl);
      $('video').get(0).load();
      $('video').get(0).play();
      
      setTimeout(() => {
        location.reload();   
      }, refduration);
      
  }
}