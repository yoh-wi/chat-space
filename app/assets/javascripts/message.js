$(function() {
  function buildHTML(message){
    if (message.image.url != null) {
      var addImage = `<img src="${message.image.url}", class="chat-main__message-list__message__lower-info__image", width="200">` 
    } else {
      var addImage = ''
    }
      var html = `<div class="chat-main__message-list__message">
                    <div class="chat-main__message-list__message__upper-info">
                      <div class="chat-main__message-list__message__upper-info__name">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-list__message__upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                      <div class="chat-main__message-list__message__lower-info">
                      <p class="chat-main__message-list__message__lower-info__content">
                        ${message.content}
                      </p>
                      ${addImage}  
                    </div>
                  </div>`
    return html; 
  }


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
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.chat-main__footer__message-form')[0].reset();
      $('.chat-main__footer__message-form__submit-btn').prop('disabled', false);
      
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.chat-main__footer__message-form__submit-btn').prop('disabled', false);
    })
  });
});