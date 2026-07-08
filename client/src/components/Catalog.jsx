import { useState, useEffect} from 'react'
import axios from 'axios';

function Catalog() {
    const [items,setItems] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/items').then(response =>{
            setItems(response.data);
            setLoading(false); 
        }).catch(error => {
            console.error('Error fetching menu items:', error);
            setLoading(false);
        });
    },[]);

    if (loading) return <h3 style ={{textAlign:'center', marginTop: '40px'}}>Grinding fresh cofee beans... Loading Menu...</h3>;

    return (
        <div>
            <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #34495e', paddingBottom: '10px' }}>
                📋 Menu & Products
            </h2>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '25px', 
                marginTop: '20px' 
            }}>
                {items.map(item => (
                    <div key={item.id} style={{ 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '12px', 
                        padding: '16px', 
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        backgroundColor: '#ffffff'
                    }}>
                        <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} 
                        />
                        <h3 style={{ margin: '14px 0 6px 0', color: '#2c3e50' }}>{item.title}</h3>
                        <span style={{ 
                            backgroundColor: '#e8f8f5', 
                            color: '#117a65', 
                            fontSize: '12px', 
                            padding: '3px 8px', 
                            borderRadius: '12px',
                            fontWeight: 'bold'
                        }}>
                            {item.category}
                        </span>
                        <p style={{ color: '#7f8c8d', fontSize: '14px', lineHeight: '1.4', height: '60px', overflow: 'hidden', marginTop: '10px' }}>
                            {item.description}
                        </p>
                        <div style={{ fontWeight: 'bold', color: '#e67e22', fontSize: '18px', margin: '12px 0' }}>
                            ${parseFloat(item.price).toFixed(2)}
                        </div>
                        <div style={{ 
                            fontSize: '12px', 
                            backgroundColor: '#f8f9f9', 
                            padding: '8px', 
                            borderRadius: '6px', 
                            color: '#5d6d7e',
                            fontStyle: 'italic'
                        }}>
                            ✨ {item.features}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Catalog;
    