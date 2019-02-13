(function(){

var WizardsName=[
'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита',
' Вашингтон'];
var WizardsLastName=['да Марья', 'Верон', 'Мирабелла','Вальц', 'Онопко', 'Топольницкая',
'Нионго','Ирвинг'];
var coatColors=['rgb(101, 137, 164)','rgb(241, 43, 107)','rgb(146, 100, 161)','rgb(56, 159, 117)',
'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors=['black','red','blue','yellow','green'];


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
var Form=document.querySelector('.setup-wizard-form');


var randomf=function(LengthArray){

    var RandomI=Math.round(Math.random()*(LengthArray-1));
    return RandomI;

  };

//Ручное задание волшебников
var wizards=[];
var coatColor='rgb(101, 137, 164)';
var eyesColor='black';
var ballColor='#ee4830';

/*for (j=0; j<4; j++) {
  Wizards[j]={
    name: WizardsName[randomf(WizardsName.length)]+' '+ WizardsLastName[randomf(WizardsLastName.length)],
    coatColor: coatColors[randomf(coatColors.length)],
    eyesColor: eyesColors[randomf(eyesColors.length)]
    };
} */

// Вставка волшебников в случае успешного соединения с сервером
var successHandler=function(data){
   //Сохраняем скаченный массив волшебников
  wizards=data;
  //updateWizards();

    // Отрисовка похожих персонажей дефолтному
    updateFilter();

  //Просто отрисовка любых волшебников с сервера без похожестей

   /* var fragment=document.createDocumentFragment();
    var n=randomf(wizards.length);
    //console.log(n+ ' '+wizards.length);
    // Чтнение 4х волшебников из 17ти с сервера. Несколько тупое чтение, читает
    // подряд 4-х начиная с рандомного числа массива волшебников, но чтобы избежать
    // чтения Null читает начиная не более чем с 14ого волшебника.
    if (n>=14){n=0}
    for (var i=n; i<n+4; i++){

      fragment.appendChild(window.renderWizard(wizards[i]));
     }

    similarListElement.appendChild(fragment); */
  };

// функция ранжирования волшебников по похожести
var getRank =function(wizard){
  var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 3;
    }

    if (wizard.colorEyes === eyesColor) {
      rank += 2;
    }
    if (wizard.colorFireball === ballColor) {
      rank += 1;
    }
    return rank;
};

//Другая версия сортировки массива, мне не слишком понятная
/*var namesComparator = function (leftName, rightName) {
    if (leftName > rightName) {
      return 1;
    } else if (leftName < rightName) {
      return -1;
    } else {
      return 0;
    }
  };

  var wizardsComparator = function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    return rankDiff === 0 ? namesComparator(left.name, right.name) : rankDiff;
  }; */

  var updateFilter = function () {
    window.render(wizards.slice().
      sort(function(left,right){
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0){
          rankDiff=wizards.indexOf(left)-wizards.indexOf(right);
        }
        return rankDiff;
      }));
  };
// Самый понятный метод выборки волшебников, но затратный
/*var updateWizards=function(){


 var SomeWizardCoatAndEyes=wizards.filter(function(it){
    return ((it.colorCoat===coatColor) && (it.colorEyes===eyesColor));
  });


 var SomeWizardCoat=wizards.filter(function(it){
    return it.colorCoat===coatColor;
  });


  var SomeWizardEyes=wizards.filter(function(it){
    return it.colorEyes===eyesColor;
  });


var FiltredWizards=((SomeWizardCoatAndEyes.concat(SomeWizardCoat)).concat(SomeWizardEyes)).concat(wizards);
var UniqueWizards=FiltredWizards.filter(function(it,i){
    return FiltredWizards.indexOf(it) === i;
});
window.render(UniqueWizards);
}; */

//Неудачное соединение с сервером
var errorHandler=function(errorMessage){
     var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.classList.add('error-message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    CloseErrorMessage();

  };
  //Закрытие окна ошибки по клику
  var CloseErrorMessage=function(){
    var ErrorM=document.querySelector('.error-message');
    //console.log(ErrorM);
    ErrorM.addEventListener('click',function(){ErrorM.remove(); });


  };

//Вторая часть
var onPopupEscPress=function(evt){
   if (evt.keyCode===ESC_KEYCODE && UserNameInput!==document.activeElement){PopupClose();}
};

var PopupOpen=function(){
Setup.classList.remove('hidden');
//window.backend.load(successHandler, errorHandler);
document.addEventListener('keydown',onPopupEscPress);
};

var PopupClose=function(){
  Setup.classList.add('hidden');
  document.removeEventListener('keydown',onPopupEscPress);
  Setup.style.top=80+'px';
  Setup.style.left=50+'%';
 // similarListElement.removeChild();
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
//Старые функции изменения цвета
/*var ChangeColor=function(){

  var newColor=coatColors[randomf(coatColors.length)];
  WizardCoat.style.fill=newColor;
  coatColor=newColor;
  CoatInput.value=WizardCoat.style.fill;

};
var ChangeColor2=function(){
  var newColor=eyesColors[randomf(eyesColors.length)];
  WizardEyes.style.fill=newColor;
  eyesColor=newColor;
  EyesInput.value=WizardEyes.style.fill;

};
var Changecolor3=function(){
var newColor=fireBallColors[randomf(fireBallColors.length)];
FireballInput.value=newColor;
ballColor=newColor;
FireballColor.style.background=FireballInput.value;

}; */

var wizard = {
    onEyesChange: function (color) {
      return color;
    },
    onCoatChange: function (color) {
      return color;
    },
    onBallChange: function (color){
      return color;
    }
  };
//Обработчик клика по мантии
WizardCoat.addEventListener('click',function(){
  //ChangeColor();
 // updateWizards();
 //window.setTimeout(function(){updateFilter();},300);
var newColor=coatColors[randomf(coatColors.length)];
  WizardCoat.style.fill=newColor;
  wizard.onCoatChange(newColor);
  //CoatInput.value=WizardCoat.style.fill;
});

WizardEyes.addEventListener('click',function(){
  //ChangeColor2();
  //updateWizards();
  //updateFilter();
  var newColor=eyesColors[randomf(eyesColors.length)];
  WizardEyes.style.fill=newColor;
  wizard.onEyesChange(newColor);
  //EyesInput.value=WizardEyes.style.fill;
});

FireballColor.addEventListener('click',function(){
  var newColor=fireBallColors[randomf(fireBallColors.length)];
  FireballColor.style.background=newColor;
  wizard.onBallChange(newColor);

});
 wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateFilter();
  });

  wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateFilter();
  });
 wizard.onBallChange = window.debounce(function (color) {
    ballColor = color;
    updateFilter();
  });


window.backend.load(successHandler, errorHandler);
//Сохранение данных формы на сервер
Form.addEventListener('submit',function(evt){
  window.backend.save(new FormData(Form), function(responce){Setup.classList.add('hidden');},errorHandler );
  evt.preventDefault();
});

})();
