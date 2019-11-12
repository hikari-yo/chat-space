json.content @message.content
# json.date Time.now.strftime("%Y/%m/%d %H:%M")
json.image   @message.image.url
# json.(@message, :content, :image)
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id