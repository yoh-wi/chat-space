json.id @message.id
json.content @message.content
json.image @message.image
json.created_at @message.created_at.strftime("%Y/%m/%d" + "(" + "%a" + ") " + "%H:%M")
json.user_name @message.user.name 