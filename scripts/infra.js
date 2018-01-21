var createElement = function(type,options){
  var div = document.createElement(type);

  div.addClassName = function(input){
      var temp  = (this.className === "")? [] : this.className.split(" "),
          input = input.split(" ");
      for (var i = 0; i < input.length; i++) {
        if((input[i] !== "" ) && (temp.indexOf(input[i]) === -1 )){
          temp.push(input[i]);
        }
      }
      this.className = temp.join(" ");
  };
  div.removeClassName = function(input){
    var temp  = (this.className === "")? [] : this.className.split(" "),
        input = input.split(" ");
    for (var i = 0; i < input.length; i++) {
      var index = temp.indexOf(input[i]);
      if((input[i] !== "" ) && (index > -1 )){
        temp.splice(index,1);
      }
    }
    this.className = temp.join(" ");
  };
  div.setValue = function(input){
    this.innerHTML = input;
  };
  div.getValue = function(){
    return this.innerText;
  };

  options = (options)?options:{};
  if(typeof options.class !== "undefined"){
    div.addClassName(options.class);
  }

  if(typeof options.attributes !== "undefined"){
    for (var key in options.attributes) {
        if (options.attributes.hasOwnProperty(key)) {
            div.setAttribute(key, options.attributes[key]);
        }
    }
  }

  if(typeof options.value !== "undefined"){
    div.setValue(options.value);
  }
  if(typeof options.onclick !== "undefined"){
    div.onclick = options.onclick;
  }
  return div;
};
