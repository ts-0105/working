class RoomsController < ApplicationController
  def index
    @rooms = Room.all.includes(:users)
  end
    
  def new
    @room = Room.new
    @users = User.where.not(id: current_user.id)
  end

def create
    @room = Room.new(room_params)

    if params[:include_self] == '1'
      @room.users << current_user unless @room.users.include?(current_user)
    end

    if @room.save
      redirect_to root_path, notice: 'ルームを作成しました'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    room = Room.find(params[:id])
    room.destroy
    redirect_to root_path, notice: 'ルームを削除しました'
  end

  private

  def room_params
    params.require(:room).permit(:name, user_ids: [])
  end
end