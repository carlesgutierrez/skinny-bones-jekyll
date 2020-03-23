let idMethodGetMedia = 0;
var global_happyValue = 0.0;
var video;

if(idMethodGetMedia == 0){
  //video = document.getElementById('video')
  video = document.querySelector('video');
}
else if(idMethodGetMedia == 1){

}
else if(idMethodGetMedia == 2){

}

//face-api vars

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('models'),
  faceapi.nets.faceExpressionNet.loadFromUri('models')
]).then(startVideo)

function startVideo() {
  video.width = 1280;
  video.height = 720;

  navigator.getUserMedia(
    { video: { } },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  console.log("displaySize");
  console.log(displaySize);
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    //const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    //const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()

    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //faceapi.draw.drawDetections(canvas, resizedDetections)
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    if(typeof (detections[0].expressions) == 'undefined'){
      //console.log(detections);
      //console.log("no expressions");
    }else {
      //console.log("happy is = " + str(detections[0].expressions.happy));
      global_happyValue = detections[0].expressions.happy;
    }

  }, 100)
})
