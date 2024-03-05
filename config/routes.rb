Rails.application.routes.draw do
  devise_for :users
  root to: "rooms#index"

  resources :users, only: [:index, :show, :edit, :update, :destroy]
  resources :rooms, only: [:index, :new, :create, :destroy] do
    resources :messages, only: [:index, :create, :destroy]
  end
end
