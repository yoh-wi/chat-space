Rails.application.routes.draw do
  devise_for :users
<<<<<<< Updated upstream
  root to: "messages#index"
end
=======
  root to: 'messages#index'
  resources :users, only: [:edit, :update]
end
>>>>>>> Stashed changes
