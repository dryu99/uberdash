import React, { useState, createRef, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import customerService from '../../services/customers';

function OrderSubmit({currentUser, restaurantAddress, orderedItems}) {
    const [orderAddress, setOrderAddress] = useState(null);
    const [orderInfo, setOrderInfo] = useState([]);
    const textInput = createRef();

    async function submitOrder() {
        try {
            const isOrdered = await customerService.createOrder(currentUser.PHONENUMBER, textInput.current.value, restaurantAddress, orderInfo);
            if (isOrdered) {
                alert('Order Submitted!')
            } else {
                alert('Could not submit order!');
            }
        } catch (error) {
            alert('Could not submit order!');
            console.log(error);
        }
    }

    function submitOrderHandler() {
        if (orderAddress && orderInfo.length == orderedItems.length) {
            submitOrder();
        } else {
            alert('Please enter a valid address and quantity of items!')
        }
    }

    useEffect(() => {
        const array = [];
        for (let i = 0; i < orderedItems.length; i++) {
            const itemName = orderedItems[i];
            const itemObject = {};
            itemObject.itemName = itemName;
            itemObject.quantity = '';
            array.push(itemObject);
        }
        setOrderInfo(array);
    }, []);

    return (
        <form className="m-2">
        Checkout
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Items Selected</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orderedItems.map(order => (
                        <tr key={order}>
                            <td>{order}</td>
                            <th>
                                <input 
                                type="text"
                                onChange={e => {
                                    const re = /^[0-9\b]+$/;
                                    if (e.target.value === '' || re.test(e.target.value)) {
                                        setOrderInfo(orderInfo.map(info => {
                                            if (info.itemName == order) {
                                                info.quantity = e.target.value;
                                            }
                                            return info;
                                        }));
                                    } else {
                                        e.target.value = '';
                                        alert('Please enter a valid amount!')
                                    }
                                }}>
                                </input>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <InputGroup className="mb-2">
                <InputGroup.Prepend>
                    <Button 
                        onClick={() => {
                            if (textInput.current.value === '') {
                                alert('Please enter a valid address!');
                            } else {
                                setOrderAddress(textInput.current.value);
                            }
                        }} 
                        variant="outline-dark" 
                        size="sm">
                            Order Address
                    </Button>
                </InputGroup.Prepend>
                <FormControl 
                    ref={textInput} 
                    type="text"
                    placeholder="Enter Order Address Here"
                />
            </InputGroup>
            { orderAddress ?
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{orderAddress}</td>
                        </tr>
                    </tbody>
                </Table>
            : null
            }
            <Button onClick={submitOrderHandler} variant="outline-dark" size="sm">Submit Order</Button>
        </form>
    );
}

export default OrderSubmit;