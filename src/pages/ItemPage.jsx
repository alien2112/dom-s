import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../context/cart-context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [randomItems, setRandomItems] = useState([]);
    const { findproductbyId, addToCart } = useContext(CartContext);

    useEffect(() => {
        const product = findproductbyId(id);
        setItem(product);

        const fetchRandomItems = () => {
            const totalProducts = 20; // Assuming you have 19 products in total
            const excludedIds = [id]; // Exclude the main item
            const randomItems = [];

            for (let i = 0; i < 3; i++) {
                let randomProductId;
                do {
                    randomProductId = Math.floor(Math.random() * totalProducts) + 1; // Add 1 to avoid generating ID 0
                    if(randomProductId==id){
                        randomProductId++;
                    }
                } while (excludedIds.includes(randomProductId));

                const randomProduct = findproductbyId(randomProductId);
                if (randomProduct) {
                    randomItems.push(randomProduct);
                    excludedIds.push(randomProductId);
                }
            }
            
            setRandomItems(randomItems);
        };

        fetchRandomItems();
    }, [id, findproductbyId]);

    const handleAddToCart = () => {
        addToCart(item);
        toast.success('Item has been added to the cart');
    };

    if (!item) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
            <div className="flex justify-center">
                <img
                    src={item.image}
                    alt={item.title}
                    className="border border-gray-300 rounded-lg shadow-lg"
                    style={{ maxWidth: '400px' }}
                />
            </div>
            <div className="text-lg text-gray-700 mb-4 mt-4">
                <p>{item.description}</p>
                <p className="text-xl font-semibold text-blue-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex justify-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
            {randomItems.length > 0 && (
                <div>
    <h3 className="text-2xl font-bold mb-4">Associated Items</h3>
    <div className="grid grid-cols-3 gap-8">
        {randomItems.map((randomItem) => (
            <div key={randomItem.id} className="text-center">
                <Link to={`/item/${randomItem.id}`}>
                    <div className="max-w-xs mx-auto">
                        <img
                            src={randomItem.image || ''}
                            alt={randomItem.title || 'No Title'}
                            className="border border-gray-300 rounded-lg shadow-lg cursor-pointer w-25 h-25"
                        />
                    </div>
                    <p className="mt-2 text-lg font-semibold">{randomItem.title || 'No Title'}</p>
                    <p className="text-gray-700">${randomItem.price ? randomItem.price.toFixed(2) : 'N/A'}</p>
                </Link>
            </div>
        ))}
    </div>
</div>


            )}
            <ToastContainer />
        </div>
    );
};

export default ItemPage;
