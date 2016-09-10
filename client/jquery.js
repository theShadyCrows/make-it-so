$( document ).ready(function() {
    console.log( "test" );

     var obj = document.createElement("audio");
  console.log('OBJECT', obj);
        obj.src="http://www.wavlist.com/soundfx/010/crow-1.wav";
        obj.volume=0.10;
        obj.autoPlay=false;
        obj.preLoad=true;       
 
        $("bountyBtn1").on("click",function() {
        	console.log('ALL BUTTONS')
            obj.play();
        });

        // $("makeitso-button").on("click")

 
// $( "#makeitso-button" ).on( "click", function() {
//   console.log('CLICKED');
// });













});