var app = {
  mainContainer : undefined,
  body : undefined,
  init : function init (container){
        this.mainContainer = createElement('div',{
          'class' : 'mainContainer'
        });
        this.mainContainer.append(this.createHeader());
        this.mainContainer.append(this.createBody());

        this.body.setValue("");
        this.body.append(this.createMask());

        container.append(this.mainContainer);
  },

  createHeader : function createHeader(){
    var header = createElement('div',{
      'class' : 'header'
    });

    var iconDiv = createElement('img',{
      'class' : 'iconDiv',
      'attributes'  : {
        'src' : './gameIcon.png'
      },
    });
    header.append(iconDiv);
    this.fillCell(header,"15 Puzzle Game");
    return header;
  },

  createBody : function createBody(){
    this.body = createElement('div',{
      'class' : 'body'
    });
    return this.body;
  },

  createMask : function(){
    var mask = createElement('div',{
      'class' : 'mask'
    });

    var startButton = createElement('input',{
      'class'       : 'startbutton btn-lg btn',
      'attributes'  : {
        'type' : 'button',
        "value": "PLAY"
      },
      'onclick'     : this.startGame.bind(this)
    });
    mask.append(startButton);
    mask.append(this.createInstructionsDiv());
    return mask;
  },

  createInstructionsDiv : function createInstructionsDiv(){
    var instructionDiv = createElement('div',{
      'class' : 'instructionDiv'
    });

    var instructionDivTitle = createElement('h1',{
      'class' : 'instructionDivTitle',
      'value' : '<b>INSTRUCTIONS : </b>'
    });

    instructionDiv.append(instructionDivTitle);

    var instructionDivContent = createElement('p',{
      'class' : 'instructionDivContent',
      'value' : 'Move tiles in grid to order them from <b>1 to 15</b>. To move a tile click on it.'
    });
    instructionDiv.append(instructionDivContent);

    return instructionDiv;
  },

  fillCell : function fillCell(div, value){
    var cellContent = createElement('p',{
      'value'   : value
    });
    div.setAttribute('value', value);
    div.append(cellContent);
  },

  startGame : function startGame(){
      this.body.setValue("");
      this.body.append(game.init(this.onSuccess.bind(this)));
      this.body.append(this.createInstructionsDiv());
  },

  onSuccess : function onSuccess(){
      this.body.setValue("");
      this.body.append(this.createCongratulationsDiv());

      setTimeout(function(){
        this.body.setValue("");
        this.body.append(this.createMask());
      }.bind(this),5000);
  },

  createCongratulationsDiv : function createCongratulationsDiv(){
    var pyro = createElement('div',{
      'class' : 'pyro',
    });

    var pyroBefore = createElement('div',{
      'class' : 'before',
    });
    pyro.append(pyroBefore);
    var pyroAfter = createElement('div',{
      'class' : 'after',
    });
    pyro.append(pyroAfter);

    var pyroAfter = createElement('p',{
      'value' : 'Congratulations !!!!...',
    });
    pyro.append(pyroAfter);

    return pyro;
  }
}
