(function(){


var OnMouseDown=function(evt){
  evt.preventDefault();
  var startCoord={
      x:evt.clientX,
     y:evt.clientY
  };
  var dragged=false;
  var OnMouseMove=function(moveEvt){
    moveEvt.preventDefault();
    dragged=true;
    var shift= {
      x:startCoord.x-moveEvt.clientX,
      y:startCoord.y-moveEvt.clientY
    };
    startCoord={
      x:moveEvt.clientX,
      y:moveEvt.clientY
    };

 window.Setup.style.left=(window.Setup.offsetLeft-shift.x)+ 'px';
 window.Setup.style.top=(window.Setup.offsetTop-shift.y)+'px';

   };
   var OnMouseUp=function(upEvt){
    upEvt.preventDefault();
    document.removeEventListener('mousemove', OnMouseMove);
    document.removeEventListener('mouseup',OnMouseUp);
    if (dragged){
      var onClickPreventDefault =function(evt){
        evt.preventDefault();
        DialogHandler.removeEventListener('click',onClickPreventDefault)
      };
      DialogHandler.addEventListener('click',onClickPreventDefault);
      }

   };
  document.addEventListener('mousemove',OnMouseMove);
  document.addEventListener('mouseup',OnMouseUp);
};
var DialogHandler=window.Setup.querySelector('.upload');

DialogHandler.addEventListener('mousedown',OnMouseDown);
})();
