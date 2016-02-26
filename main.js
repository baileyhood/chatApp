var templates = {
  msg: [
     "<div data-postid='<%= _id %>'>",
    "<p><%= content %></p>",
      "<button class='delete'>delete</button>",
    "</div>"
    ].join("")
};

$(document).ready(function(){
  chatApp.init();
});//end of doc ready

var chatApp = {
  url: "http://tiny-tiny.herokuapp.com/collections/dbchatz",
  init: function () {
    chatApp.initEvents();
    chatApp.initStyling();
  },
  initEvents: function () {
    $(".username-input-form").on('submit', chatApp.storingUserName);
    $(".signin-input-form").on('submit', chatApp.signingIn);
    $(".outcoming button").on('click', chatApp.sendMessage);
    $("section").on('click', '.delete', chatApp.deleteMessageFromDom);
  },
  initStyling: function() {
    chatApp.getAllMessages();
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
      content: content
    };
  },
  addAllMessages: function (chatsArr){
    $('.incoming').html('');
  _.each(chatsArr, function (el){
    chatApp.addMsgToDom(el, templates.msg, $('.incoming'));
    });
  },
  addMsgToDom: function (data, templateStr, $target){
    var tmpl =_.template(templateStr);
    $target.prepend(tmpl(data));
  },
  deleteMessageFromDom: function(event){
    var messageid = $(this).closest('div').data('postid');
    chatApp.deleteMessages(messageid);
    chatApp.addAllMessages(chatApp.getMessages());
  },

//AJAX
  getAllMessages: function getAllMessages(){
    $.ajax ({
      url: chatApp.url,
      method: 'GET',
      success: function (message) {
        chatApp.addAllMessages (message);
      }
    });
  },
  addMessages: function addMesages(newMsg) {
    $.ajax ({
      url: 'http://tiny-tiny.herokuapp.com/collections/dbchatz',
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
  deleteMessages: function deleteMessages (messageid) {
    $.ajax ({
      url: chatApp.url + '/' + messageid,
      method: 'DELETE',
      success: function (response) {
        chatApp.getAllMessages();
      },
      error: function (err) {
        console.log ("error", err);
      }
    });
  },
};//end of var chatApp
