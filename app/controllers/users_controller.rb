class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  def destroy
    user = User.find_by(id: params[:id])
    user.destroy
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  #ユーザー削除機能追加
end
