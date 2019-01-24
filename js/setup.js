(function(){

var WizardsName=[
'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита',
' Вашингтон'];
var WizardsLastName=['да Марья', 'Верон', 'Мирабелла','Вальц', 'Онопко', 'Топольницкая',
'Нионго','Ирвинг'];
var coatColors=['rgb(101,137,164)','rgb(241,43,107)','rgb(146,100,161)','rgb(56,159,117)',
'rgb(215,210,55)'];
var eyesColors=['black','red','blue','yellow','green'];
var similarListElement=document.querySelector('.setup-similar-list');
var template=document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
//Вторая часть
var SetupOpen=document.querySelector('.setup-open');
 window.Setup=document.querySelector('.setup');
var UserNameInput=Setup.querySelector('.setup-user-name');
var SetupClose=document.querySelector('.setup-close');
var ESC_KEYCODE=27;
var ENTER_KEYCODE=13;
var WizardCoat=Setup.querySelector('.wizard-coat');
var WizardEyes=Setup.querySelector('.wizard-eyes');
var FireballColor=Setup.querySelector('.setup-fireball-wrap');
var fireBallColors=['#ee4830','#30a8ee','#5ce6c0','#e848d5','#e6e848'];
var CoatInput=Setup.querySelector('input[name=coat-color]');
var EyesInput=Setup.querySelector('input[name=eyes-color]');
var FireballInput=Setup.querySelector('input[name=fireball-color]');



var randomf=function(LengthArray){

    var RandomI=Math.round(Math.random()*(LengthArray-1));
    return RandomI;

  };

var Wizards=[];

for (j=0; j<4; j++) {
  Wizards[j]={
    name: WizardsName[randomf(WizardsName.length)]+' '+ WizardsLastName[randomf(WizardsLastName.length)],
    coatColor: coatColors[randomf(coatColors.length)],
    eyesColor: eyesColors[randomf(eyesColors.length)]
    };
}

var renderWizard = function (wizard){
  var element=template.cloneNode(true);
    element.querySelector('.setup-similar-label').textContent=Wizards[i].name;
    element.querySelector('.wizard-coat').style.fill=Wizards[i].coatColor;
    element.querySelector('.wizard-eyes').style.fill=Wizards[i].eyesColor;
  return element;
};

var fragment=document.createDocumentFragment();
for( var i=0; i<Wizards.length;i++){
 fragment.appendChild(renderWizard(Wizards[i]));
  }

similarListElement.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');

//Вторая часть
var onPopupEscPress=function(evt){
   if (evt.keyCode===ESC_KEYCODE && UserNameInput!==document.activeElement){PopupClose();}
};

var PopupOpen=function(){
Setup.classList.remove('hidden');
document.addEventListener('keydown',onPopupEscPress);
};

var PopupClose=function(){
  Setup.classList.add('hidden');
  document.removeEventListener('keydown',onPopupEscPress);
  Setup.style.top=80+'px';
  Setup.style.left=50+'%';
};

//Обработчик событие открытие окна установки персонажа
SetupOpen.addEventListener('click', function(){
    PopupOpen();
  });

//Обработчик открытие окна установки персонажа по нажатию на Enter
SetupOpen.addEventListener('keydown',function(evt){
    if (evt.keyCode===ENTER_KEYCODE){
      PopupOpen();
    }
  });

//Обработчики закрытия окна настройки персонажа по крестику
SetupClose.addEventListener('click', function(){
    PopupClose();
  });

SetupClose.addEventListener('keydown',function(evt){
if (evt.keyCode===ENTER_KEYCODE){PopupClose();}

 });
var ChangeColor=function(){
  WizardCoat.style.fill=coatColors[randomf(coatColors.length)];
  CoatInput.value=WizardCoat.style.fill;
  console.log(CoatInput.value);

};
var ChangeColor2=function(){
  WizardEyes.style.fill=eyesColors[randomf(eyesColors.length)];
  EyesInput.value=WizardEyes.style.fill;
  console.log(EyesInput.value);
};
var Changecolor3=function(){

FireballInput.value=fireBallColors[randomf(fireBallColors.length)];
FireballColor.style.background=FireballInput.value;
console.log(FireballInput.value +' ' +FireballColor.style.background);
};
WizardCoat.addEventListener('click',function(){
  ChangeColor();
});
WizardEyes.addEventListener('click',function(){
  ChangeColor2();
});
FireballColor.addEventListener('click',function(){
  Changecolor3();
});

})();
