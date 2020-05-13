Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users, only: [:edit, :update]
  resources :groups, except: [:show, :destroy] do
    resources :message, only: [:index, :create]
  end
end
