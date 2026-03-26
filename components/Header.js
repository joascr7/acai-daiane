export default function Header() {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      background: '#000',
      borderBottom: '1px solid #111'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 420,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px 20px',
        color: '#fff'
      }}>
        <h2>🍧 Açaí Express</h2>
        <span style={{ color: 'red' }}>Entrega rápida ⚡</span>
      </div>
    </div>
  );
}