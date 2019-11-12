class UsersController < ApplicationController
  def index

    return nil if params[:keyword] == ""
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
    @user = User.find(current_user.id)
  end

  def update
    if current_user.update(user_params) #もしサインインしているユーザーがデータを更新したら
      redirect_to root_path #ルートパスへ移動する
    else #そうではなかったら
      render :edit #編集ページを再度表示させる
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
  #.requireメソッドがデータのオブジェクト名を定め、.permitメソッドで変更を加えられる（保存の処理ができる）キーを指定
end
