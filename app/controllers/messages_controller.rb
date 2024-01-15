class MessagesController < ApplicationController
  def index
    @message = Message.new
    @room = Room.find(params[:room_id])
    @rooms = Room.all.includes(:users)
    @messages = @room.messages.order("created_at DESC").includes(:user)
  end

  def create
    @room = Room.find(params[:room_id])
    @message = @room.messages.new(message_params)
    @user = @message.user
    if @message.save
      #非同期通信の為の編集
      if @message.image.attached?
        image_url = Rails.application.routes.url_helpers.rails_representation_url(@message.image.variant(resize: "500x500").processed, only_path: true)
        render json:{ 
          message: @message,
          user: @user,
          imageURL: image_url
        }
      else
        render json:{ 
          message: @message,
          user: @user,
      }
      end
    else
      @messages = @room.messages.includes(:user)
      render :index, status: :unprocessable_entity
    end
  end

  def destroy
    message = Message.find(params[:id])
    message.destroy
    redirect_to root_path
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end
end
