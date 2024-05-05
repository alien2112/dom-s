import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/cart-context';
import fakeUsers from './fakeusers';
import fakeOrders from './fakeorder';

const Admin = () => {
    const { setMenuItems, menuItems } = useContext(CartContext);
    const [users, setUsers] = useState(fakeUsers);
    const [orders, setOrders] = useState(fakeOrders);
    const [newUser, setNewUser] = useState({ username: '', email: '', role: '' });
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [ordersTodayCount, setOrdersTodayCount] = useState(0); // State to hold count of orders today

    const handleAddUser = () => {
        if (newUser.username && newUser.email &&newUser.role) {
            setUsers([...users, newUser]);
            setNewUser({ username: '', email: '', role: '' });
            
        } else {
            alert('Please enter username and email');
        }
    };

    const handleRemoveUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleCancelOrder = (id) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            id: menuItems.length + 1,
            name,
            description,
            price: parseFloat(price),
        };
        setMenuItems([...menuItems, newItem]);
        setName('');
        setDescription('');
        setPrice('');
    };

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("current_menu")).length < menuItems.length) {
            localStorage.setItem("current_menu", JSON.stringify(menuItems));
        }
        setMenuItems(JSON.parse(localStorage.getItem("current_menu")));

        // Calculate count of orders today
        const today = new Date().toLocaleDateString();
        const ordersToday = orders.filter(order => new Date(order.date).toLocaleDateString() === today);
        setOrdersTodayCount(ordersToday.length);
    }, [menuItems, orders]);
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Users</h2>
                    <div>
                        <h3 className="text-sm font-semibold mb-2">Add New User</h3>
                        <div className="flex mb-2">
                            <input
                                type="text"
                                placeholder="Username"
                                value={newUser.username}
                                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                className="border border-gray-300 rounded-md mr-2"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                className="border border-gray-300 rounded-md mr-2"
                            />
                            <input
                                type="role"
                                placeholder="role"
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                className="border border-gray-300 rounded-md mr-2"
                            />
                            <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add User</button>
                        </div>
                        <div>
                            {users.map(user => (
                                <div key={user.id} className="bg-gray-200 p-3 rounded-md mb-2 flex justify-between items-center">
                                    <div>
                                        <p><strong>Username:</strong> {user.username}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <p><strong>Role:</strong> {user.role}</p>
                                    </div>
                                    {!user.role.includes('admin') && (
                                        <button onClick={() => handleRemoveUser(user.id)} className="text-red-500">Remove</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Orders</h2>
                    <p className="text-sm mb-4">Orders Today: {ordersTodayCount}</p>
                    <div>
                        {orders.map(order => (
                            <div key={order.id} className="bg-gray-200 p-3 rounded-md mb-2">
                                <p><strong>Customer:</strong> {order.customer}</p>
                                <p><strong>Products:</strong> {order.products.join(', ')}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                                {order.status!="delivered" &&<button onClick={() => handleCancelOrder(order.id)} className="text-red-500">Cancel</button>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 p-4 mt-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Add New Item</h2>
                <form onSubmit={handleSubmit} className="max-w-md">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="2" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} min="0" step="0.01" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Item</button>
                </form>
            </div>
        </div>
    );
}

export default Admin;
