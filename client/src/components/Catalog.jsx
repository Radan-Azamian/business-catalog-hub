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
            // i got this part from ai and here is the first prompt:
        //Can you provide a clean React template that handles both product catalog rendering and selection list management in a single view? 
        // I want the top half to map over database records to generate menu cards with clean inline styling. 
        // I want the bottom half to serve as a 'Virtual Cart' that displays live selections from state. 
        // Provide the precise JSX mapping syntax for items.map and selectedItems.map, 
        // complete with click handler assignments (handleAddToBag and handleRemoveFromBag) so I can connect them to my global component state
        const getCategoryBadgeStyle = (category) => {
        const base = { fontSize: '11px', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold', display: 'inline-block' };
        if (category === "Coffee Beans") return { ...base, backgroundColor: '#3d2e24', color: '#dfcbb5' };
        if (category === "Cold Drinks") return { ...base, backgroundColor: '#1a3338', color: '#8cdceb' };
        if (category === "Hot Drinks") return { ...base, backgroundColor: '#472a16', color: '#ffad73' };
        return { ...base, backgroundColor: '#2d1a38', color: '#dca6f2' };
    };

    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: items.length > 0 ? '2fr 1fr' : '1fr', 
            gap: '35px', 
            alignItems: 'start',
            color: '#e6dfd9' // Soft warm parchment text instead of harsh white
        }}>
            
            {/* LEFT COLUMN: The Product Cards Catalog Layout */}
            <div>
                <h2 style={{ color: '#dfcbb5', borderBottom: '1px solid #3d3128', paddingBottom: '12px', marginBottom: '25px', fontSize: '22px', fontWeight: '700' }}>
                    📋 Menu & Products
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
                    {items.map(item => (
                        <div key={item.id} style={{ 
                            border: '1px solid #2e241f', 
                            borderRadius: '14px', 
                            padding: '18px', 
                            boxShadow: '0 6px 16px rgba(0,0,0,0.2)', 
                            backgroundColor: '#231c18', // Deep chocolate/slate card color
                            display: 'flex',
                            flexDirection: 'column',
                            boxSizing: 'border-box'
                        }}>
                            <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', marginBottom: '14px', opacity: '0.9' }} />
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={getCategoryBadgeStyle(item.category)}>
                                    {item.category}
                                </span>
                                <span style={{ fontWeight: '800', color: '#f39c12', fontSize: '18px' }}>
                                    ${parseFloat(item.price).toFixed(2)}
                                </span>
                            </div>

                            <h3 style={{ margin: '0 0 8px 0', color: '#f5ebe0', fontSize: '18px', fontWeight: '600' }}>{item.title}</h3>
                            <p style={{ color: '#bfae9e', fontSize: '14px', lineHeight: '1.5', margin: '0 0 14px 0', height: '65px', overflow: 'hidden' }}>{item.description}</p>
                            
                            <div style={{ fontSize: '12px', backgroundColor: '#1b1411', padding: '10px', borderRadius: '8px', color: '#a39281', fontStyle: 'italic', borderLeft: '3px solid #f39c12', marginBottom: '15px' }}>
                                {item.features}
                            </div>
                            
                            <button 
                                onClick={() => handleAddToBag(item)}
                                style={{ width: '100%', padding: '11px', backgroundColor: '#e67e22', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', transition: 'background 0.2s', marginTop: 'auto' }}
                            >
                                Select Product
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT COLUMN: Low-Brightness Sidebar Intake System */}
            <div style={{ display: 'grid', gap: '25px', position: 'sticky', top: '20px' }}>
                
                {/* Cart Overview Card */}
                <div style={{ padding: '22px', border: '1px solid #2e241f', borderRadius: '14px', backgroundColor: '#231c18', boxShadow: '0 6px 16px rgba(0,0,0,0.2)' }}>
                    <h2 style={{ color: '#dfcbb5', margin: '0 0 16px 0', fontSize: '20px', fontWeight: '700', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #3d3128', paddingBottom: '10px' }}>
                        <span>Selected Items</span>
                        <span style={{ backgroundColor: '#e67e22', color: '#ffffff', fontSize: '13px', padding: '2px 10px', borderRadius: '12px' }}>{selectedItems.length}</span>
                    </h2>

                    {selectedItems.length === 0 ? (
                        <p style={{ color: '#9a8775', fontStyle: 'italic', margin: 0, textAlign: 'center', padding: '15px 0', fontSize: '14px' }}>
                            Your catalog selection list is empty. Choose a roast or pastry variant above to initialize your request parameters.
                        </p>
                    ) : (
                        <div style={{ display: 'grid', gap: '10px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
                            {selectedItems.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#1b1411', borderRadius: '8px', border: '1px solid #2e241f' }}>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#f5ebe0', fontSize: '14px' }}>{item.title}</div>
                                        <div style={{ color: '#f39c12', fontSize: '12px', fontWeight: '600' }}>${parseFloat(item.price).toFixed(2)}</div>
                                    </div>
                                    <button 
                                        onClick={() => handleRemoveFromBag(item.id)}
                                        style={{ padding: '6px 12px', backgroundColor: '#3a1e1a', color: '#ff7675', border: 'none', borderRadius: '#e67e22', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold'}}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Form Intake Card */}
                <div style={{ padding: '22px', border: '1px solid #2e241f', borderRadius: '14px', backgroundColor: '#231c18', boxShadow: '0 6px 16px rgba(0,0,0,0.2)' }}>
                    <h3 style={{ color: '#dfcbb5', margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', borderBottom: '1px solid #3d3128', paddingBottom: '10px' }}>Customer Information Entry</h3>
                    
                    <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '14px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#cbb6a3' }}>Full Name *</label>
                            <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Full Name" style={{ width: '100%', padding: '11px', border: '1px solid #3d3128', borderRadius: '6px', boxSizing: 'border-box', backgroundColor: '#1b1411', color: '#ffffff' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#cbb6a3' }}>Phone Number *</label>
                            <input type="tel" required value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="Phone Number" style={{ width: '100%', padding: '11px', border: '1px solid #3d3128', borderRadius: '6px', boxSizing: 'border-box', backgroundColor: '#1b1411', color: '#ffffff' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#cbb6a3' }}>Email Address</label>
                            <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="Email" style={{ width: '100%', padding: '11px', border: '1px solid #3d3128', borderRadius: '6px', boxSizing: 'border-box', backgroundColor: '#1b1411', color: '#ffffff' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#cbb6a3' }}>Special Roastery Instructions</label>
                            <textarea rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requests..." style={{ width: '100%', padding: '11px', border: '1px solid #3d3128', borderRadius: '6px', boxSizing: 'border-box', backgroundColor: '#1b1411', color: '#ffffff', fontFamily: 'inherit' }}></textarea>
                        </div>

                        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#27ae60', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(39,174,96,0.15)', marginTop: '5px' }}>
                            Submit Transaction Request
                        </button>
                    </form>

                    {submitMessage && (
                        <div style={{ marginTop: '14px', padding: '12px', borderRadius: '6px', backgroundColor: submitMessage.includes('❌') ? '#3a1a1a' : '#143321', color: submitMessage.includes('❌') ? '#ff7675' : '#2ecc71', fontWeight: 'bold', fontSize: '13px', textAlign: 'center', border: submitMessage.includes('❌') ? '1px solid #c0392b' : '1px solid #27ae60' }}>
                            {submitMessage}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Catalog;