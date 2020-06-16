<?php 
    class MenuItem {
        // DB Stuff 
        private $conn;
        private $table = 'MenuItemsMadeAt';

        // MenuItem Properties 
        public $item_name;
        public $restaurant_address;
        public $menuitem_cost;
        public $menuitem_description;
        public $menuitem_averagepreptime;

        // Constructor with DB 
        public function __construct($db) {
            $this->conn = $db;
        }

        // Get MenuItems from current Restaurant
        public function getItems($restaurant_address) {
            $query = 'SELECT * FROM MenuItemsMadeAt m WHERE m.Restaurant_Address = ' . $restaurant_address . 'ORDER BY ITEM_NAME ASC';


        }

        // Create a new MenuItem 
        public function create() {
            // Create Query 
            $query = 'INSERT INTO MenuItemsMadeAt 
                        VALUES (:MenuItem_Name, :Restaurant_Address, :MenuItem_Cost, :MenuItem_Description, :MenuItem_AveragePrepTime)';

            // Clean Data 
            $this->item_name = htmlspecialchars(strip_tags($this->item_name));
            $this->restaurant_address = htmlspecialchars(strip_tags($this->restaurant_address));
            $this->menuitem_cost = htmlspecialchars(strip_tags($this->menuitem_cost));
            $this->menuitem_description = htmlspecialchars(strip_tags($this->menuitem_description));
            $this->menuitem_averagepreptime = htmlspecialchars(strip_tags($this->menuitem_averagepreptime));

            // Bind Data 
            $bindvars = [[':MenuItem_Name', $this->item_name], 
                        [':Restaurant_Address', $this->restaurant_address],
                        [':MenuItem_Cost', $this->menuitem_cost],
                        [':MenuItem_Description', $this->menuitem_description],
                        [':MenuItem_AveragePrepTime', $this->menuitem_averagepreptime]];
            
            // Execute Query
            return $this->conn->execute($query, $bindvars);
        }

    }
?>