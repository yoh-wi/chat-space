$(function() {
  // 画面を読み込んだら一番下の最新のメッセージへ移動
  $(document).ready(function() {
    $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight}, 100);
  });

  var buildHTML = function(message) {
    if (message.content && message.image) {
      var addContent = `<p class="chat-main__message-list__message__lower-info__content">
                          ${message.content}
                        </p>`
      var addImage = `<img src="${message.image}", class="chat-main__message-list__message__lower-info__image", width="200">` 
    } else if (message.content) {
      var addContent = `<p class="chat-main__message-list__message__lower-info__content">
                          ${message.content}
                        </p>`
      var addImage = ''
    } else if (message.image) {
      var addContent = ''
      var addImage = `<img src="${message.image}", class="chat-main__message-list__message__lower-info__image", width="200">` 
    } 
    
      var html = `<div class="chat-main__message-list__message", data-message-id="${message.id}">
                    <div class="chat-main__message-list__message__upper-info">
                      <div class="chat-main__message-list__message__upper-info__name">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-list__message__upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                      <div class="chat-main__message-list__message__lower-info">
                      ${addContent}
                      ${addImage}  
                    </div>
                  </div>`
    return html; 
  }

  var reloadMessages = function() {
    last_message_id = $('.chat-main__message-list__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = ''
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
          //メッセージが入ったHTMLに、入れ物ごと追加
          $('.chat-main__message-list').append(insertHTML);
          $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        });
      };
    })  
    .fail(function() {
      alert('自動更新ができませんでした。再読み込みしてください。');
    });
  };  

  $('.chat-main__footer__message-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight}, 'fast');
      $('.chat-main__footer__message-form')[0].reset();
      $('.chat-main__footer__message-form__submit-btn').prop('disabled', false);  
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.chat-main__footer__message-form__submit-btn').prop('disabled', false);
    });
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000)
  } 
});