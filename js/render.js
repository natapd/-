(function(){
  var template=document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement=document.querySelector('.setup-similar-list');
//Создание волшебника по шаблону
var renderWizard = function (wizard){
  var element=template.cloneNode(true);
    element.querySelector('.setup-similar-label').textContent=wizard.name;
    element.querySelector('.wizard-coat').style.fill=wizard.colorCoat;
    element.querySelector('.wizard-eyes').style.fill=wizard.colorEyes;
  return element;
};
window.render=function(data){
  var takeNumber = data.length > 4 ? 4 : data.length;
    similarListElement.innerHTML = '';
for( var i=0; i<takeNumber;i++){
similarListElement.appendChild(renderWizard(data[i]));}
document.querySelector('.setup-similar').classList.remove('hidden');
};
})();
