$(function(){
  function buildHTML(message){
  if ( message.image ) {
      //data-idが反映されるようにしている
      var html =
       `<div class="a-message" data-message-id=${message.id}>
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
      //同様にdata-idが反映されるようにしている
      var html =
       `<div class="a-message" data-message-id=${message.id}>
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

var reloadMessages = function() {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  var last_message_id = $('.message:last').data("message-id");
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: "api/messages",
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.main-chat__message-view').append(insertHTML);
      $('.main_chat__message-view').animate({ scrollTop: $('.messages')[0].scrollHeight});
    }
  })
  .fail(function() {
    alert('error');
  });
};

setInterval(reloadMessages, 7000);
//$(function(){});の閉じタグの直上(処理の最後)に以下のように追記
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
