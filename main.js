var templates = {
  msg: [
    "<div data-postid='<%= _id %>'rel='<%= username %>'>",
    "<h4 id ='idUsername'><%= username %></h4>",
    "<p id = 'message'><%= content %></p>",
    "<button class='delete'>X</button>",
    "</div>"
    ].join("")
};

var localUserName = function () {
return localStorage.getItem ('username');
};

$(document).ready(function(){
  chatApp.init();
  setInterval(function(){chatApp.getAllMessages();}, 1000);
});//end of doc ready

var chatApp = {
  url: "http://tiny-tiny.herokuapp.com/collections/dbchatz",
  init: function () {
    chatApp.initEvents();
    chatApp.initStyling(); // this is loading messages in background
  },
  initEvents: function () {
    $(".username-input-form").on('submit', chatApp.storingUserName);
    $(".outcoming button").on('click', chatApp.sendMessage);
    $("section").on('click', '.delete', chatApp.deleteMessageFromDom);
    $('#logout').on('click', chatApp.logout);
  },
  initStyling: function() {
    chatApp.getAllMessages();
  },

//USERNAME FUNCTIONS

  getUsernameFromDom: function getUsernameFromDom() {
    var username = $('input[name="username-input"]').val();
    return username;
  },
  getUsernameFromStorage: function () {
    return localStorage.getItem ('username');
  },
  storingUserName: function (event) {
    event.preventDefault();
    var newUsername = chatApp.getUsernameFromDom();
    if (newUsername === "") {
      alert("Type in your username!");
    }
    else {
    localStorage.setItem('username',newUsername);
    chatApp.hideHomePage();
    }
    chatApp.displayCurrentUser();
  },

  hideHomePage: function (event) {
    $(".username-section").addClass('inactive');
    $(".main").removeClass('inactive');
    $('.incoming').scrollTop($('.incoming')[0].scrollHeight);
  },

//MESSAGING FUNCTIONS

  sendMessage: function (event) {
     event.preventDefault();
     var newMsg = chatApp.getMessages();
     chatApp.addMessagesToServer(newMsg);
     chatApp.addAllMessages(chatApp.getAllMessages());
     $('input').val('');
  },

  getMessages: function () {
    var content = $('input[name="outcoming-input"]').val();
    var username = chatApp.getUsernameFromStorage();
    return {
      content: content,
      username: username
    };
  },
  addAllMessages: function (chatsArr){
    $('.incoming').html('');
  _.each(chatsArr, function (el){
    chatApp.addMsgToDom(el, templates.msg, $('.incoming'));
    });
    $('.incoming').scrollTop($('.incoming')[0].scrollHeight);
  },
  addMsgToDom: function (data, templateStr, $target){
    var tmpl =_.template(templateStr);
    $target.prepend(tmpl(data));
    localStorage.getItem('username');
  },
  deleteMessageFromDom: function(event){
    var messageid = $(this).closest('div').data('postid');
    var localStor =  localStorage.getItem ('username');
    var divsUsername =  $(this).siblings('h4').text();
    if (localStor === divsUsername) {
    chatApp.deleteMessages(messageid);
    chatApp.addAllMessages(chatApp.getMessages());
    }
  },
  displayCurrentUser: function () {
    var localStor =  localStorage.getItem ('username');
    $('#displayUsername').html("<b>Current Username:</b> " + localStor);
  },
  logout: function () {
    console.log ($(this));
    $('#logout').on('click', function () {
      localStorage.clear();
      $('.main').addClass('inactive');
      $('.username-section').removeClass('inactive');
      $('input[name="username-input"]').val('');
    });
  },
  // scrollTop: function () {
  //   $(".incoming").scrollTop($(".incoming")[0].scrollHeight);
  // },

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
  addMessagesToServer: function addMesages(newMsg) {
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
