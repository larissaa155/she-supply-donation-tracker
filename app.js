// She Supply Donation Tracker - A React App for managing donation items
const { useState } = React;

function DonationTracker() {
    // State to manage the list of donation items
    const [items, setItems] = useState([
        { id: 1, name: "Baby Diapers", category: "Hygiene" },
        { id: 2, name: "Toothpaste", category: "Hygiene" },
        { id: 3, name: "Canned Food", category: "Food" }
    ]);
    
    // State for the new item input fields
    const [newItem, setNewItem] = useState({ name: "", category: "Hygiene" });

    // Function to add a new donation item
    const addItem = () => {
        if (newItem.name.trim() === "") return;
        
        const newItemObj = {
            id: Date.now(), // Simple ID generation
            name: newItem.name,
            category: newItem.category
        };
        
        setItems([...items, newItemObj]);
        setNewItem({ name: "", category: "Hygiene" }); // Reset form
    };

    // Function to remove a donation item
    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addItem();
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 p-6 text-white">
                    <h1 className="text-3xl font-bold">She Supply Donation Tracker</h1>
                    <p className="mt-2 opacity-90">Manage incoming donation items for those in need</p>
                </div>

                {/* Add New Item Form */}
                <form onSubmit={handleSubmit} className="p-6 border-b border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <input
                                type="text"
                                name="name"
                                value={newItem.name}
                                onChange={handleInputChange}
                                placeholder="Enter donation item (e.g., Baby Formula)"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                name="category"
                                value={newItem.category}
                                onChange={handleInputChange}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="Hygiene">Hygiene</option>
                                <option value="Food">Food</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Baby Care">Baby Care</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                </form>

                {/* Donation Items List */}
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Donation Needs</h2>
                    
                    {items.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No donation items listed. Add some above!</p>
                    ) : (
                        <div className="space-y-3">
                            {items.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div>
                                        <span className="font-medium text-gray-800">{item.name}</span>
                                        <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                            {item.category}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition duration-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Summary */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Total Items: <span className="font-semibold">{items.length}</span> | 
                            Categories: <span className="font-semibold">{[...new Set(items.map(item => item.category))].length}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Render the app to the DOM
ReactDOM.render(<DonationTracker />, document.getElementById('root'));