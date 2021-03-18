const video = document.getElementById('video');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)



function startVideo() {
 
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}
video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
  if(detections != null){
    firebase.database().ref('updatepopup').set({
      number: detections    
    
   }, function(error) {
     if (error) {
       console.log("error");
       // The write failed...
     } else {
       // Data saved successfully!
      //  console.log("no error");
       
       
     }
   });
  }

    console.log(detections.length);
    if(detections.length == 0){
      document.body.style.background ="#f50";
      firebase.database().ref("17EIR085").set({
        inout: 0
        
       }, function(error) {
         if (error) {
           console.log("error");
           // alert("You are notconnected to " + opno +" succesfully, Thank You");
           // The write failed...
         } else {
           // Data saved successfully!
           console.log("no error");
           
           // alert("You are connected to " + opno +" succesfully, Thank You");
         }
       });
    }else if( detections.length == 1){
    document.body.style.background ="#071";
    firebase.database().ref("17EIR085").set({
      inout: 1
      
     }, function(error) {
       if (error) {
         console.log("error");
         // alert("You are notconnected to " + opno +" succesfully, Thank You");
         // The write failed...
       } else {
         // Data saved successfully!
         console.log("no error");
         
         // alert("You are connected to " + opno +" succesfully, Thank You");
       }
     });
  }
  }, 1000)
})



