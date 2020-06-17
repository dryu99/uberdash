import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import customerService from '../../services/customers';
import OrderSubmit from './OrderSubmit';
import Button from 'react-bootstrap/Button';

function MenuItemList({currentUser, restaurantAddress}) {
    const [currentMenuItemView, setCurrentMenuItemView] = useState(null);
    const [checked, setChecked] = useState(null);
    const [currentViewOrderSubmit, setCurrentViewOrderSubmit] = useState(null);
    const [orderedItems, setOrderedItems] = useState([]);

    async function viewMenuItems() {
        try {
            const menuItems = await customerService.getMenuItems(restaurantAddress);
            setCurrentMenuItemView(menuItems);
            const selectedItems = [];
            for (let i = 0; i < menuItems.length; i++) {
                const itemName = menuItems[i].MENUITEM_NAME;
                const itemObject = {};
                itemObject.itemName = itemName;
                itemObject.itemState = false;
                selectedItems[i] = itemObject;
            }
            setChecked(selectedItems);
        } catch (error) {
            alert('Could not find menu items!');
            console.log(error);
        }
    }

    function updateOrderedItems(itemName, isOrdered) {
        const array1 = orderedItems;
        for ( let i = 0; i < orderedItems.length; i++) {
            if (orderedItems[i] === itemName) {
                orderedItems.splice(i, 1);
            }
        }
        if (isOrdered) {
            array1.push(itemName);
        }
        setOrderedItems(array1);
    }

    function orderSubmitComponentView() {
        setCurrentViewOrderSubmit(orderedItems);
    }

    useEffect(() => {
        viewMenuItems();
    }, []);

    return (
    <div>
        {currentViewOrderSubmit ?
        <OrderSubmit currentUser={currentUser} restaurantAddress={restaurantAddress} orderedItems={orderedItems}></OrderSubmit>
        :
        <div>
        Select Menu Item(s)
        { currentMenuItemView && checked ?
        <div>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>
                    <input type="checkbox">
                    </input>
                </th>
                <th>Item</th>
                <th>Cost ($CDN)</th>
                <th>Description</th>
                <th>Average Prep Time (Minutes)</th>
                </tr>
            </thead>
            <tbody>
                {currentMenuItemView.map(menuItem => (
                    <tr key={menuItem.MENUITEM_NAME}>
                    <th>
                        <input
                        type="checkbox" 
                        checked={checked[menuItem.MENUITEM_NAME]}
                        onChange={event => {
                            let isChecked = event.target.checked;
                            const itemName = menuItem.MENUITEM_NAME;
                            updateOrderedItems(itemName, isChecked);
                            setChecked(checked.map(item => {
                                if (item.itemName == itemName) {
                                    item.itemState = checked;
                                }
                                return item;
                            }));
                        }}
                        value={menuItem.MENUITEM_NAME}
                        >
                        </input>
                    </th>
                    <td>{menuItem.MENUITEM_NAME}</td>
                    <td>{menuItem.MENUITEM_COST}</td>
                    <td>{menuItem.MENUITEM_DESCRIPTION}</td>
                    <td>{menuItem.MENUITEM_AVERAGEPREPTIME}</td>
                    </tr>
                ))}
            </tbody>
            </Table>
            <Button onClick={orderSubmitComponentView} variant="outline-dark" size="sm">Checkout</Button>
        </div>
        :
            null
        }
        </div>
        }
    </div>
    );
}

export default MenuItemList;