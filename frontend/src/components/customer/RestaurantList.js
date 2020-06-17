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
        setCurrentViewMenuItem(restaurant.ADDRESS);
    }

    return (
        <div className="m-2">
        {currentViewMenuItem ?
            <MenuItemList currentUser={currentUser} restaurantAddress={currentViewMenuItem}></MenuItemList>
            :
            <div>
            Restaurant List
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
                        <tr key={restaurant.NAME} onClick={() => menuItemComponentView(restaurant)}>
                            <td>{restaurant.NAME}</td>
                            <td>{restaurant.DESCRIPTION}</td>
                            <td>{restaurant.ADDRESS}</td>
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