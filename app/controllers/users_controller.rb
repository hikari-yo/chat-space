class UsersController < ApplicationController
  def edit
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
