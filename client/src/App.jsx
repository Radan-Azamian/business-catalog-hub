// becaause of the new version of react, we don't need to import React
// import React from 'react';

import Catalog from './components/Catalog';

function App() {
  return (
    <div style={{ 
      maxWidth: '1440px', 
      margin: '0 auto', 
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        paddingBottom: '30px',
        borderBottom: '1px solid #eedecc'
      }}>
      
        <h1 style={{ 
          margin: '0 0 10px 0', 
          color: '#6a4a45', 
          fontSize: '42px', 
          fontWeight: '800',
          letterSpacing: '-0.5px'
        }}>
          Benito Cafe Catalog Hub
        </h1>
        <span style={{
          backgroundColor: '#f3e6d8',
          color: '#6e473b',
          fontSize: '16px',
          fontWeight: 'bold',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          padding: '6px 16px',
          borderRadius: '20px',
          display: 'inline-block',
          marginBottom: '12px'
        }}>
          Premium Roastery Ecosystem
        </span>
      </header>
      
      <main>
        <Catalog />
      </main>
      
      <footer style={{ 
        textAlign: 'center', 
        color: '#bfae9e', 
        fontSize: '13px', 
        marginTop: '80px', 
        borderTop: '1px solid #eedecc', 
        paddingTop: '30px',
        letterSpacing: '0.5px'
      }}>
        COM4134 Final Architectural Showcase Presentation Workspace
      </footer>
    </div>
  );
}

export default App;