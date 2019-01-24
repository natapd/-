(function(){
var CLOUWD_HEIGHT=270;
var CLOUWD_WIDTH=420;
var GISTA_WIDTH=40;
var MAX_HEIGHT=150;
var CLOUD_X=100;
var CLOUD_Y=10;
var GAP=10;
var LEFT_PADDING=50;
var FONT_GAP=20;
var BAR_WIDTH=40;
var BAR_GAP=50;
var BAR_STEP=BAR_WIDTH+BAR_GAP;
var BOTTOM_PADDING=20;
var CloudPaint = function (ctx,x,y,color){
ctx.fillStyle=color;
ctx.fillRect(x,y, CLOUWD_WIDTH, CLOUWD_HEIGHT);
};
var MaxTime = function (times){
  var max=times[0];
  for (var i=0; i<times.length; i++){
    if (times[i]>max){
       max=times[i];
      }
    }
    return max;
};
var GistoPaint = function (ctx,x,y,height,color){
ctx.fillStyle=color;
ctx.fillRect(x,y,GISTA_WIDTH,height);

};
window.renderStatistics = function (ctx,names,times){
CloudPaint(ctx,CLOUD_X+GAP,CLOUD_Y+GAP,'rgba(0, 0, 0, 0.7)');
CloudPaint(ctx,CLOUD_X,CLOUD_Y,'white');
ctx.fillStyle='black';
ctx.font = '16px PT Mono';
ctx.fillText('Ура вы победили!',CLOUD_X+LEFT_PADDING,CLOUD_Y+FONT_GAP);
ctx.fillText('Список результатов:',CLOUD_X+LEFT_PADDING,CLOUD_Y+FONT_GAP*2);
var mtime=MaxTime(times);

for (var i=0; i<names.length; i++){
    var BarHeight=Math.round((MAX_HEIGHT*times[i])/mtime);
    if (names[i]==='Вы'){
      ctx.fillText(Math.round(times[i]),CLOUD_X+LEFT_PADDING+i*BAR_STEP,280-BOTTOM_PADDING-BarHeight-30);
       GistoPaint(ctx,CLOUD_X+LEFT_PADDING+i*BAR_STEP,280-BOTTOM_PADDING-BarHeight-20,BarHeight,"rgba(255,0,0,1)");
      ctx.fillStyle='black';
      ctx.fillText(names[i],CLOUD_X+LEFT_PADDING+i*BAR_STEP,280-BOTTOM_PADDING);
    } else {

      ctx.fillText(Math.round(times[i]),CLOUD_X+LEFT_PADDING+i*BAR_STEP,280-BOTTOM_PADDING-BarHeight-30);
       GistoPaint(ctx,CLOUD_X+LEFT_PADDING+i*BAR_STEP,280-BOTTOM_PADDING-BarHeight-20,BarHeight,'rgba(0,0,255,' + Math.random() + ')');
      ctx.fillStyle='black';
      ctx.fillText(names[i],CLOUD_X+LEFT_PADDING+i*BAR_STEP,280-BOTTOM_PADDING);
    }
}
};
})();
