$(document).ready(function(){

function getUserNameFromDom () {
  var userInput = $('input[name="to-do-item"]').val();
}

$('h1').text("ChatApp");
$("form").on('click', function(event){
  event.preventDefault();
  var userName = getUserNameFromDom();
});

});
