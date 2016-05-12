require(['skrollr'], function(skrollr){
  skrollr.init({
    forceHeight: false,
    smoothScrolling: false, 
    render: function(data) {
        //Debugging - Log the current scroll position.
        //console.log(data.curTop);
      }
  });
});
