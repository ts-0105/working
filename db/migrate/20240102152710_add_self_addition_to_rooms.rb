class AddSelfAdditionToRooms < ActiveRecord::Migration[7.0]
  def change
    add_column :rooms, :include_self, :boolean
  end
end
