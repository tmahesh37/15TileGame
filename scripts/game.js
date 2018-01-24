var game  = {
  emptyDiv : undefined,
  alertMsg : undefined,
  callback : undefined,
  puzzleSize : undefined,

  init : function init(puzzleSize, difficultyCount , callback){
    var mainContainer = createElement('div',{
      'class' : 'container'
    });
    this.createTable(mainContainer,puzzleSize,difficultyCount);
    this.callback = callback;
    this.puzzleSize = puzzleSize;
    return mainContainer;
  },

  getRandomData : function getRandomData(level,count){
    var data = [];
    for(var row=0 ; row < level ; row++){
      data[row] = [];
      for(var column=0 ; column < level ; column++){
          if(row  === (level-1) && column  === (level-1)){
            data[row][column] = 0;
          }else{
            data[row][column] = (row*level)+(column+1);
          }
      }
    }

    initX = level-1;
    initY = level-1;
    while(count !== 0){
      //Descision of Row or Column
      var rowOrColumn = (Math.floor((Math.random() * 10) + 0) > 5) ? 'row' : 'column',
          upOrDown    = (Math.floor((Math.random() * 10) + 0) > 5) ? 1 : -1 ;

      if(rowOrColumn === 'row'){
        if(0 <= initY + upOrDown && initY + upOrDown <= level-1 ){
            var temp = data[initX][initY + upOrDown];
            data[initX][initY + upOrDown] = 0 ;
            data[initX][initY] = temp ;
            initY = initY + upOrDown ;
            count--;
        }
      }else if(rowOrColumn === 'column'){
        if(0 <= initX + upOrDown  && initX + upOrDown <= level-1 ){
            var temp = data[initX + upOrDown][initY];
            data[initX + upOrDown][initY] = 0 ;
            data[initX][initY] = temp ;
            initX = initX + upOrDown ;
            count--;
        }
      }
    }

    var result = [];
    for(var ii=0 ; ii < level ; ii++){
      result = result.concat(data[ii]);
    }

    return result;
  },

  createTable : function (renderTo,puzzleSize,difficultyCount){

    var index = 0,
        values = this.getRandomData(puzzleSize,difficultyCount),
        columnsize= Math.floor(12/puzzleSize);
    for(var ii=0 ; ii < puzzleSize ; ii++){
      var divRow = createElement('div',{
        'class' : 'row'
      });
      renderTo.append(divRow);
      for(var jj=0 ; jj < puzzleSize ; jj++){
        var value  = values[index++];
        var cell = createElement('div',{
          'class'   : 'cell text-center col-xs-'+columnsize+' col-sm-'+columnsize+' col-md-'+columnsize+' col-lg-'+columnsize,
          'attributes' : {
            'row'     : ii,
            'column'  : jj,
            'value'   : value
          },
          'onclick' : this.onDivSelect.bind(this)
        });
        divRow.append(cell);
        this.fillCell(cell , value);
        if(value === 0){
          this.emptyDiv = cell;
          cell.addClassName('bg-warning');
        }else{
          cell.addClassName('bg-info');
        }
      }
    }
  },

  onDivSelect : function(e,a,b){
    var selectedDiv     = e.currentTarget;
        rowDiff         = parseInt(selectedDiv.getAttribute('row')) - parseInt(this.emptyDiv.getAttribute('row')),
        columnDiff      = parseInt(selectedDiv.getAttribute('column')) - parseInt(this.emptyDiv.getAttribute('column')),
        rowCondition    = ((rowDiff === 1) || (rowDiff === -1)) && (columnDiff === 0)? true : false,
        columnCondition = ((columnDiff === 1) || (columnDiff === -1)) && (rowDiff === 0)? true : false;

      if(rowCondition === columnCondition){
          this.displayAlert("Not valid selection !!!!");
      }else{

          this.fillCell(this.emptyDiv , selectedDiv.getAttribute('value'));
          this.emptyDiv.removeClassName('bg-warning');
          this.emptyDiv.addClassName('bg-info');

          this.fillCell(selectedDiv , 0);
          selectedDiv.addClassName('bg-warning');
          selectedDiv.removeClassName('bg-info');

          this.emptyDiv = selectedDiv;
          this.validate();
      }
  },

  fillCell : function fillCell(div, value){
    var cellContent = createElement('p',{
      'value'   : (value === 0) ? "" : value
    });
    div.setValue("");
    div.setAttribute('value', value);
    div.append(cellContent);
  },

  validate : function validate(){
    var validate  = true,
        divs      = document.getElementsByClassName("cell");
    for(var i=0 ; i< divs.length ; i++){
      var div     = divs[i],
          value   = parseInt(div.getAttribute('value')),
          row     = parseInt(div.getAttribute('row')),
          column  = parseInt(div.getAttribute('column'));
      if((row === this.puzzleSize-1) && (column === this.puzzleSize-1)){
        if((value !== 0)){
          validate = false;
          break;
        }
      }
      else if(value !== ((row*this.puzzleSize)+(column+1))){
        validate = false;
        break;
      }
    }

    if(validate){
      this.callback();
    }
  },

  displayAlert : function displayAlert(msg){
    var alertMsg = alertMsg;
    if(typeof alertMsg !== "undefined"){
      alertMsg.remove();
    }

    alertMsg = createElement('div',{
      'class' : 'alertMsg bg-danger'
    });
    document.body.append(alertMsg);

    this.fillCell(alertMsg, msg);

    setTimeout(function(){
      if(typeof alertMsg !== "undefined"){
        alertMsg.remove();
        alertMsg = undefined;
      }
    }, 500);
  }
};
