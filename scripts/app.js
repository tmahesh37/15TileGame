var app = {
  mainContainer : undefined,
  init : function init (container){
        this.mainContainer = createElement('div',{
          'class' : 'mainContainer'
        });
        this.mainContainer.append(this.createMask("15 Puzzle Game"));
        container.append(this.mainContainer);
  },

  createMask : function createMask(msg){

    var mask = createElement('div',{
      'class' : 'mask'
    });

    var iconDiv = createElement('img',{
      'class' : 'iconDiv',
      'attributes'  : {
        'src' : './gameIcon.png'        
      },
    });
    mask.append(iconDiv);

    this.fillCell(mask,msg);

    var startButton = createElement('input',{
      'class'       : 'startbutton btn-lg btn-primary',
      'attributes'  : {
        'type' : 'button',
        "value": "PLAY"
      },
      'onclick'     : this.startGame.bind(this)
    });
    mask.append(startButton);

    return mask;
  },

  fillCell : function fillCell(div, value){
    var cellContent = createElement('p',{
      'value'   : value
    });
    div.setAttribute('value', value);
    div.append(cellContent);
  },

  startGame : function startGame(){
      this.mainContainer.setValue("");
      this.mainContainer.append(game.init(this.onSuccess.bind(this)));
  },

  onSuccess : function onSuccess(){
      this.mainContainer.setValue("");
      this.mainContainer.append(this.createMask("Congragulations !!!"));
  }
}
