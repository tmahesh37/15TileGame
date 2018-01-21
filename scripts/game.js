var game  = {
  emptyDiv : undefined,
  alertMsg : undefined,
  callback : undefined,

  init : function init(difficultyCount , callback){
    var mainContainer = createElement('div',{
      'class' : 'container'
    });
    this.createTable(mainContainer,difficultyCount);
    this.callback = callback;
    return mainContainer;
  },

  getRandomData : function getRandomData(count){
    var data = [
      [1,2,3,4],
      [5,6,7,8],
      [9,10,11,12],
      [13,14,15,0]
    ];

    initX = 3;
    initY = 3;
    while(count !== 0){
      //Descision of Row or Column
      var rowOrColumn = (Math.floor((Math.random() * 10) + 0) > 5) ? 'row' : 'column',
          upOrDown    = (Math.floor((Math.random() * 10) + 0) > 5) ? 1 : -1 ;

      if(rowOrColumn === 'row'){
        if(0 <= initY + upOrDown && initY + upOrDown <= 3 ){
            var temp = data[initX][initY + upOrDown];
            data[initX][initY + upOrDown] = 0 ;
            data[initX][initY] = temp ;
            initY = initY + upOrDown ;
            count--;
        }
      }else if(rowOrColumn === 'column'){
        if(0 <= initX + upOrDown  && initX + upOrDown <= 3 ){
            var temp = data[initX + upOrDown][initY];
            data[initX + upOrDown][initY] = 0 ;
            data[initX][initY] = temp ;
            initX = initX + upOrDown ;
            count--;
        }
      }
    }

    var result = [];
    for(var ii=0 ; ii < 4 ; ii++){
      result = result.concat(data[ii]);
    }

    return result;
  },

  createTable : function (renderTo,difficultyCount){

    var index = 0,
        values = this.getRandomData(difficultyCount);

    for(var ii=0 ; ii < 4 ; ii++){
      var divRow = createElement('div',{
        'class' : 'row'
      });
      renderTo.append(divRow);
      for(var jj=1 ; jj <= 4 ; jj++){
        var value  = values[index++];
        var cell = createElement('div',{
          'class'   : 'cell text-center col-xs-3 col-sm-3 col-md-3 col-lg-3',
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
      if((row === 3) && (column === 4)){
        if((value !== 0)){
          validate = false;
          break;
        }
      }
      else if(value !== ((row*4)+column)){
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
