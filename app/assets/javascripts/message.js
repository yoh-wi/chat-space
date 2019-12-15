$(function() {
  // function buildHTML(message){
  //   var html = ``
  // }

  $('.chat-main__message-form__new').on('submit', function(e) {
    e.preventDefault();
    // var message = $('.chat-main__message-form__new__input-box__text').val();
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
      $('')
    })
    
  });
});

// .chat-main__message-list__message
//   .chat-main__message-list__message__upper-info
//     .chat-main__message-list__message__upper-info__name
//       = message.user.name
//     .chat-main__message-list__message__upper-info__date
//       = message.created_at.strftime("%Y/%m/%d %H:%M")
//   .chat-main__message-list__message__lower-info
//     - if message.content.present?
//       %p.chat-main__message-list__message__lower-info__content
//         = message.content
//     = image_tag message.image.url, size: '200x97', class: 'chat-main__message-list__message__lower-info__image' if message.image.present?