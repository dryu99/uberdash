import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import customerService from '../../services/customers';
import MenuItemList from './MenuItemList';

function RestaurantList({currentUser}) {
    const [currentRestaurantView, setCurrentRestaurantView] = useState(null);
    const [currentViewMenuItem, setCurrentViewMenuItem] = useState(null);

    async function viewRestaurants() {
        try {
            const restaurants = await customerService.getAllRestaurants();
            setCurrentRestaurantView(restaurants);
        } catch (error) {
            alert('Could not find restaurants!');
            console.log(error);
        }
    }

    useEffect(() => {
        viewRestaurants();
    }, []);

    function menuItemComponentView(restaurant) {
        setCurrentViewMenuItem(restaurant.RESTAURANT_ADDRESS);
    }

    return (
        <div className="m-2">
        {currentViewMenuItem ?
            <MenuItemList currentUser={currentUser} restaurantAddress={currentViewMenuItem}></MenuItemList>
            :
            <div>
            Select Restaurant
            {currentRestaurantView ?
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Restaurant</th>
                        <th>Description</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentRestaurantView.map(restaurant => (
                        <tr key={restaurant.RESTAURANT_NAME} onClick={() => menuItemComponentView(restaurant)}>
                            <td>{restaurant.RESTAURANT_NAME}</td>
                            <td>{restaurant.RESTAURANT_DESCRIPTION}</td>
                            <td>{restaurant.RESTAURANT_ADDRESS}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            : null
            }
            </div>
        }
        </div>
    );
}

export default RestaurantList;