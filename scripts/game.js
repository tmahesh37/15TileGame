var game  = {
  emptyDiv : undefined,
  alertMsg : undefined,
  callback : undefined,

  init : function init(callback){
    var mainContainer = createElement('div',{
      'class' : 'container'
    });
    this.createTable(mainContainer);
    this.callback = callback;
    return mainContainer;
  },

  createTable : function (renderTo){

    var index = 0,
        values = [1,2,3,4,5,6,7,8,9,10,11,12,13,0,14,15];

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
      'value'   : value
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
