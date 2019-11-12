$(function(){ 
  function buildHTML(message){
    var img = (message.image != null) ? `<img src = "${message.image}">` : "";  
    var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="message__upper-info">
          <div class="message__upper-info__talker">
            ${message.user_name}
          </div>
          <div class="message__upper-info__date">
            ${message.date}
          </div>
        </div>
        <div class="message__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        ${img}
      </div>`
    return html;
  } 

  $('#new_message').on('submit', function(){
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData, 
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    return false
  });

  // ここから自動更新機能
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){  // group/:group_id/messagesというURLの時だけ、以降の記述が実行されます。
             // リクエスト先と形式を指定しています。
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data('message-id');
    $.ajax({
      url: "api/messages",   //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      type: 'GET',     //ルーティングで設定した通りhttpメソッドをgetに指定
      dataType: 'json',
      data: {id: last_message_id}    //dataオプションでリクエストに値を含める
    })

    .done(function(messages) {
          // フォームに入力されたデータを引数として取得しています。
      var insertHTML = '';    //追加するHTMLの入れ物を作る
      messages.forEach(function(message){     //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        insertHTML = buildHTML(message);      //メッセージが入ったHTMLを取得
        $('.messages').append(insertHTML);    //メッセージを追加
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      });
    })
    
    .fail(function() {
      // alert("自動更新に失敗しました")
    });
    };
  }


  setInterval(reloadMessages, 5000);

})
