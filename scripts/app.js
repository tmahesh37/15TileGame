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
        'src' : './gameIcon.jpg'
      },
    });
    header.append(iconDiv);
    this.fillCell(header,"Puzzle Game");
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
      'onclick'     : this.requestPreferences.bind(this)
    });
    mask.append(startButton);
    mask.append(this.createInstructionsDiv());
    return mask;
  },

  createInstructionsDiv : function createInstructionsDiv(){
    var instructionDiv = createElement('div',{
      'class' : 'instructionDiv'
    });

    var instructionDivTitle = createElement('p',{
      'class' : 'instructionDivTitle',
      'value' : '<b>INSTRUCTIONS : </b>'
    });

    instructionDiv.append(instructionDivTitle);

    var instructionDivContent = createElement('p',{
      'class' : 'instructionDivContent',
      'value' : 'Move tiles in grid to order them. To move a tile click on it.'
    });
    instructionDiv.append(instructionDivContent);

    return instructionDiv;
  },

  fillCell : function fillCell(div, value){
    var cellContent = createElement('p',{
      'value'   : value
    });
    div.append(cellContent);
  },

  requestPreferences : function requestPreferences(){
    var self = this,
        difficultyDiv,
        difficultyLevel,
        puzzleSizeDiv,
        puzzleSize;

    this.body.setValue("");

    preferenceDiv = createElement('div',{
      'class'   : 'preferenceDiv'
    });

    var puzzlePromise = function(resolve, reject) {
      preferenceDiv.setValue("");
      self.fillCell(preferenceDiv,'Choose your Puzzle size');

      var onPuzzleSizeSelection = function(e){
        puzzleSize = parseInt(e.currentTarget.getAttribute('puzzleSize'));
        resolve();
      };
      puzzleSizeDiv = createElement('div',{
        'class'   : 'puzzleSize btn-group btn-group-lg',
        'html'  : [
          {
            type : 'input',
            options: {
              'class'       : 'btn',
              'attributes'  : {
                'type' : 'button',
                "value": "3*3",
                "puzzleSize": 3
              },
              'onclick'     : onPuzzleSizeSelection
            }
          },
          {
            type : 'input',
            options: {
              'class'       : 'btn',
              'attributes'  : {
                'type' : 'button',
                "value": "4*4",
                "puzzleSize": 4
              },
              'onclick'     : onPuzzleSizeSelection
            }
          },
          {
            type : 'input',
            options: {
              'class'       : 'btn',
              'attributes'  : {
                'type' : 'button',
                "value": "6*6",
                "puzzleSize": 6
              },
              'onclick'     : onPuzzleSizeSelection
            }
          }
        ]
      });

      preferenceDiv.append(puzzleSizeDiv);
    };

    var difficultyPromise = function(resolve, reject) {
      preferenceDiv.setValue("");
      self.fillCell(preferenceDiv,'Choose your Puzzle difficulty');

      var onDifficultySelection = function(e){
        difficultyLevel = parseInt(e.currentTarget.getAttribute('difficultyCount'));
        resolve();
      };
      difficultyDiv = createElement('div',{
        'class'   : 'difficultyCount btn-group btn-group-lg',
        'html'  : [
          {
            type : 'input',
            options: {
              'class'       : 'btn',
              'attributes'  : {
                'type' : 'button',
                "value": "EASY",
                "difficultyCount" : 3
              },
              'onclick'     : onDifficultySelection
            }
          },
          {
            type : 'input',
            options: {
              'class'       : 'btn',
              'attributes'  : {
                'type' : 'button',
                "value": "MEDIUM",
                "difficultyCount" : 6
              },
              'onclick'     : onDifficultySelection
            }
          },
          {
            type : 'input',
            options: {
              'class'       : 'btn',
              'attributes'  : {
                'type' : 'button',
                "value": "HARD",
                "difficultyCount" : 10
              },
              'onclick'     : onDifficultySelection
            }
          }
        ]
      });

      preferenceDiv.append(difficultyDiv);
    };

    new Promise(puzzlePromise).then(function() {
      new Promise(difficultyPromise).then(function() {
        self.startGame(puzzleSize,difficultyLevel*puzzleSize);
      });
    });

    this.body.append(preferenceDiv);
  },

  startGame : function startGame(puzzleSize,difficultyCount){
      this.body.setValue("");
      this.body.append(game.init(puzzleSize,difficultyCount, this.onSuccess.bind(this)));
      this.body.append(this.createInstructionsDiv());
  },

  onSuccess : function onSuccess(){
      this.body.setValue("");
      this.body.append(this.createCongratulationsDiv(function(){
          this.requestPreferences();
        }));
  },

  createCongratulationsDiv : function createCongratulationsDiv(callback){
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

    retryBtn = createElement('input',{
      'class'       : 'btn btn-lg',
      'attributes'  : {
        'type' : 'button',
        "value": 'Play Again',
        "difficultyCount" : 3
      },
      'onclick'     : callback.bind(this)
    });

    pyro.append(retryBtn);

    return pyro;
  }
}
