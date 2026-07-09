import { useState, useEffect } from 'react';
import axios from 'axios';

function Catalog() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // this line Stores items selected by the user
    const [selectedItems, setSelectedItems] = useState([]);
    
    // this line Stores the info of the client contact
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [notes, setNotes] = useState('');
    
    // 📣 Submission Status State
    const [submitMessage, setSubmitMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/items')
            .then(response => {
                setItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching menu items:", error);
                setLoading(false);
            });
    }, []);

    // this line is for adding items to Selection Bag
    const handleAddToBag = (item) => {
        // Prevent duplicate entries in the same order
        if (selectedItems.some(bagItem => bagItem.id === item.id)) {
            alert(`${item.title} is already in your selection list!`);
            return;
        }
        setSelectedItems([...selectedItems, item]);
    };
    // removing
    const handleRemoveFromBag = (id) => {
        setSelectedItems(selectedItems.filter(item => item.id !== id));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (selectedItems.length === 0) {
            setSubmitMessage("Your selection bag is empty! Please select at least one item.");
            return;
        }

        const orderPayload = {
            clientName,
            clientPhone,
            clientEmail,
            notes,
            selectedItems: JSON.stringify(selectedItems) 
        };

        axios.post('http://localhost:5000/api/requests', orderPayload)
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    setSubmitMessage(`${response.data.message || 'Inquiry submitted successfully!'}`);
                    
                    // Clear out form fields on success
                    setSelectedItems([]);
                    setClientName('');
                    setClientPhone('');
                    setClientEmail('');
                    setNotes('');
                }
            })
            .catch(error => {
                console.error("Error processing inquiry checkout:", error);
                setSubmitMessage("Failed to process inquiry. Make sure the server is online.");
            });
    };

    if (loading) return <h3 style={{ textAlign: 'center', marginTop: '40px' }}>☕ Grinding fresh coffee beans... Loading Menu...</h3>;

    return (
        // i got this part from ai and here is the first prompt:
        //Can you provide a clean React template that handles both product catalog rendering and selection list management in a single view? 
        // I want the top half to map over database records to generate menu cards with clean inline styling. 
        // I want the bottom half to serve as a 'Virtual Cart' that displays live selections from state. 
        // Provide the precise JSX mapping syntax for items.map and selectedItems.map, 
        // complete with click handler assignments (handleAddToBag and handleRemoveFromBag) so I can connect them to my global component state
        <div>
            <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #34495e', paddingBottom: '10px' }}>
                📋 Menu & Products
            </h2>
            
            {/* Catalog Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', marginTop: '20px' }}>
                {items.map(item => (
                    <div key={item.id} style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', backgroundColor: '#ffffff' }}>
                        <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                        <h3 style={{ margin: '14px 0 6px 0', color: '#2c3e50' }}>{item.title}</h3>
                        <span style={{ backgroundColor: '#e8f8f5', color: '#117a65', fontSize: '12px', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' }}>{item.category}</span>
                        <p style={{ color: '#7f8c8d', fontSize: '14px', lineHeight: '1.4', height: '60px', overflow: 'hidden', marginTop: '10px' }}>{item.description}</p>
                        <div style={{ fontWeight: 'bold', color: '#e67e22', fontSize: '18px', margin: '12px 0' }}>${parseFloat(item.price).toFixed(2)}</div>
                        <div style={{ fontSize: '12px', backgroundColor: '#f8f9f9', padding: '8px', borderRadius: '6px', color: '#5d6d7e', fontStyle: 'italic', marginBottom: '15px' }}>✨ {item.features}</div>
                        
                        <button 
                            onClick={() => handleAddToBag(item)}
                            style={{ width: '100%', padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
                        >
                            ➕ Add to Selection
                        </button>
                    </div>
                ))}
            </div>

            {/* 🛒 SECTION: Shopping Bag Selection List & Checkout Form */}
            <div style={{ marginTop: '50px', padding: '25px', border: '1px solid #bdc3c7', borderRadius: '12px', backgroundColor: '#fdfefe', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <h2 style={{ color: '#6e2c00', margin: '0 0 20px 0', borderBottom: '2px solid #e59866', paddingBottom: '10px' }}>
                    🛒 Your Selected Items ({selectedItems.length})
                </h2>

                {/* Display items in the bag */}
                {selectedItems.length === 0 ? (
                    <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>No menu items selected yet. Click "Add to Selection" above to start building your order list!</p>
                ) : (
                    <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
                        {selectedItems.map(item => (
                            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #f2f4f4', backgroundColor: '#fbfcfc', marginBottom: '8px', borderRadius: '6px' }}>
                                <div>
                                    <strong style={{ color: '#2c3e50' }}>{item.title}</strong> - <span style={{ color: '#e67e22' }}>${parseFloat(item.price).toFixed(2)}</span>
                                </div>
                                <button 
                                    onClick={() => handleRemoveFromBag(item.id)}
                                    style={{ padding: '4px 10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Dynamic Order Intake Form */}
                <form onSubmit={handleFormSubmit} style={{ marginTop: '30px', display: 'grid', gap: '15px' }}>
                    <h3>📋 Enter Contact Details to Complete Inquiry</h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#34495e' }}>Full Name *</label>
                            <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="John Doe" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#34495e' }}>Phone Number *</label>
                            <input type="tel" required value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="09123456789" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#34495e' }}>Email Address</label>
                        <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="john@example.com" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#34495e' }}>Special Requests / Notes</label>
                        <textarea rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add specific pickup instructions or roastery preferences here..." style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }}></textarea>
                    </div>

                    <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s', marginTop: '10px' }}>
                        🚀 Submit Inquiry Order
                    </button>
                </form>

                {submitMessage && (
                    <div style={{ marginTop: '20px', padding: '12px', borderRadius: '6px', backgroundColor: submitMessage.includes('❌') ? '#f2d7d5' : '#d4efdf', color: submitMessage.includes('❌') ? '#78281f' : '#145a32', fontWeight: 'bold', textAlign: 'center' }}>
                        {submitMessage}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Catalog;