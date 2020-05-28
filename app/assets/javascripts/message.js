$(function(){

    function buildHTML(message){
     if ( message.image ) {
       var html =
        `<div class="a-message">
           <div class="a-message__head">
             <div class="user-name">
               ${message.user_name}
             </div>
             <div class="sended-date">
               ${message.created_at}
             </div>
           </div>
           <p class="a-message__content">
             ${message.content}
           </p>
           </div>
           <img src=${message.image} >
         </div>`
       return html;
     } else {
       var html =
        `<div class="a-message">
           <div class="a-message__head">
             <div class="user-name">
               ${message.user_name}
             </div>
             <div class="sended-date">
               ${message.created_at}
             </div>
           </div>
           <p class="lower-message__content">
             ${message.content}
           </p>
           </div>
         </div>`
       return html;
     };
   }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-view').append(html);
      $('form')[0].reset();
      $('.main-chat__message-view').animate({ scrollTop: $('.main-chat__message-view')[0].scrollHeight});
      $('.send-button').prop('disabled', false);
     })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });

})
});
