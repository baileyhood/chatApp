
// var templates = {
//   msg: [
//     "<article data-idx='<%= idx %>'>",
//     "<p><%= content %></p>",
//       "<button class='delete'>delete</button>"
//     ].join("")
// };

var messages = [];

// function getAllMessages(){
//   return messages;
// }
//
// function addMessages(newMsg){
//   messages.push(newMsg);
// }

function deleteMessages(idx){
  messages.splice(idx, 1);
}

// function addMsgToDom( data, templateStr, $target){
//   var tmpl =_.template(templateStr);
//   $target.append(tmpl(data));
// }
//
// function addAllMessages(){
//   $('.incoming').html('');
// _.each(getAllMessages(), function (el, idx){
//   el.idx = idx;
//   addMsgToDom(el, templates.msg, $('.incoming'));
// });
// }
// function getMessages(){
//   var content = $('input[type="text"]').val();
//   return {
//     content:content
//   }
//
// }

$(document).ready(function(){
  addAllMessages(messages);

  // $('.outcoming button').on('click', function (event){
  //    event.preventDefault();
  //    var newMsg = getMessages();
  //    addMessages(newMsg);
  //    addAllMessages(getMessages());
  //    $('input').val('');
  //
  // });
  $('section').on('click', '.delete', function(event){
    var idx = $(this).closest('article').data('idx');
    deleteMessages(idx);
    addAllMessages(getMessages());
  });

});
