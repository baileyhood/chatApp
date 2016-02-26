
$(document).ready(function(){
chatApp.init();
});//end of doc ready

var chatApp = {
  url: "http://tiny-tiny.herokuapp.com/collections/dbchat",
  init: function () {
    chatApp.initEvents();
    chatApp.initStyling();
  },
  initEvents: function () {
    $(".username-input-form").on('submit', chatApp.storingUserName);
    $(".signin-input-form").on('submit', chatApp.signingIn);
  },
  initStyling: function() {

  },
  getUsernameFromDom: function getUsernameFromDom() {
    var username = $('input[name="username-input"]').val();
    return username;
  },
  getOldUsernameFromDom: function getOldUsernameFromDom (){
    var username = $('input[name="sign-in-input"]').val();
    return username;
  },
  storingUserName: function (event) {
    event.preventDefault();
    var newUsername = chatApp.getUsernameFromDom();
    localStorage.setItem('username',newUsername);
    chatApp.hideHomePage();
  },
  signingIn: function (event) {
    event.preventDefault();
    var oldUsername = chatApp.getOldUsernameFromDom();
    if (oldUsername === localStorage.username) {
    chatApp.hideHomePage();
    }
    else {
      $(this).text("Sorry, wrong username");
    }
  },
  hideHomePage: function (event) {
    $(".username-section").addClass('inactive');
    $(".main").removeClass('inactive');
  },
};//end of var chatApp
