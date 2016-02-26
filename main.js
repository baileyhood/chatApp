var templates = {
  msg: [
    "<article data-idx='<%= idx %>'>",
    "<p><%= content %></p>",
      "<button class='delete'>delete</button>"
    ].join("")
};

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
    $(".outcoming button").on('click', chatApp.sendMessage);
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

  sendMessage: function (event) {
     event.preventDefault();
     var newMsg = chatApp.getMessages();
     chatApp.addMessages(newMsg);
     chatApp.addAllMessages(chatApp.getAllMessages());
     $('input').val('');
  },

  getMessages: function () {
    var content = $('input[name="outcoming-input"]').val();
    return {
      content:content
    };
  },
  addAllMessages: function (){
    $('.incoming').html('');
  _.each(chatApp.getAllMessages(), function (el, idx){
    el.idx = idx;
    chatApp.addMsgToDom(el, templates.msg, $('.incoming'));
    });
  },
  addMsgToDom: function (data, templateStr, $target){
    var tmpl =_.template(templateStr);
    $target.append(tmpl(data));
  },
  getAllMessages: function getAllMessages(){
    $.ajax ({
      url: chatApp.url,
      method: 'GET',
      success: function (message) {
        console.log (message);
        // chatApp.addAllMessages (message);
      }
    });
  },
  addMessages: function addMesages(newMsg) {
    $.ajax ({
      url: 'http://tiny-tiny.herokuapp.com/collections/dbchat',
      method: 'POST',
      data: newMsg,
      success: function (response) {
        chatApp.getMessages();
      },
      error: function (err) {
        console.log("error",err);
      }
    });
  },
};//end of var chatApp
