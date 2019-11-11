# json.カラム インスタンス変数.カラム
# json.カラム インスタンス変数.カラム

# json.array! @messages do |message|
#   json.content message.content
#   json.image message.image.url
#   json.date message.created_at.strftime("%Y/%m/%d/ %H:%M")
#   json.user_name message.user.name
#   json.id message.id
#  end

json.id      @message.id
json.content @message.content
json.date    @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name
json.image   @message.image.url
