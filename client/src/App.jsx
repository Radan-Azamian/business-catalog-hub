// becaause of the new version of react, we don't need to import React
// import React from 'react';

import Catalog from './components/Catalog';

function App() {
  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      padding: '30px', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      backgroundColor: '#fdfefe',
      minHeight: '100vh'
    }}>
      <header style={{ 
        textAlign: 'center', 
        paddingBottom: '20px', 
        marginBottom: '30px',
        borderBottom: '1px solid #eaeded' 
      }}>
        <h1 style={{ margin: '0 0 8px 0', color: '#6e2c00', fontSize: '36px' }}>
          ☕ Benito Cafe Catalog
        </h1>
        <p style={{ margin: 0, color: '#7f8c8d', fontSize: '16px' }}>
          A full-stack decoupling demo rendering records directly from a local PostgreSQL database instance.
        </p>
      </header>
      
      <main>
        <Catalog />
      </main>
      
      <footer style={{ textAlign: 'center', color: '#bdc3c7', fontSize: '12px', marginTop: '60px', borderTop: '1px solid #eaeded', paddingTop: '20px' }}>
        COM4134 Final Web Project Workspace
      </footer>
    </div>
  );
}

export default App;