const video = document.getElementById('video')
const jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZSIsImlhdCI6MTU3NDE5ODY2OH0.4fbxlJ4cQHX2ozsrD5vr-uXq7tbO5kPOd78Qvj5vKgA";
Webcam.set({
  width: 640,
  height: 480,
  image_format: 'jpeg',
  jpeg_quality: 90
 });

 function getUrlParams() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}
 Webcam.attach( '#my_camera' );
 function take_snapshot() {
 

  Webcam.snap( function(data_uri) {
    data_uri=btoa(data_uri);
      console.log(data_uri);
      var http = new XMLHttpRequest();
      var url = '/cam';
      var params = 'base64='+data_uri+'&jwt='+getUrlParams()["jwt"];
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      http.onreadystatechange = function() {
          if(http.readyState == 4 && http.status == 200) {
              alert(http.responseText);
          }
          
      }
      http.send(params);
   });
 }
 function take_snapshot_login() {
 

  Webcam.snap( function(data_uri) {
    data_uri=btoa(data_uri);
      console.log(data_uri);
      var http = new XMLHttpRequest();
      var url = '/facelogin';
      var params = 'base64='+data_uri+"&uuid="+getUrlParams()["uuid"];
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      http.onreadystatechange = function() {
          if(http.readyState == 4 && http.status == 200) {
              alert(http.responseText);
          }
      }
      http.send(params);
   });
 }
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo).finally(removeLoading)

function removeLoading(){
  setTimeout(()=>{
    document.getElementById("spin").style.display="none";
  
  }, 1500)
}
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}
function removeVideo(){
  if(document.getElementById("removeBg").textContent=="Rimuovi video"){
    document.getElementById("video").style.visibility="hidden";
    document.getElementById("removeBg").textContent="Attiva video";
  }else{
    document.getElementById("video").style.visibility="visible";
    document.getElementById("removeBg").textContent="Rimuovi video";
  }
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({scoreThreshold:0.5})).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})