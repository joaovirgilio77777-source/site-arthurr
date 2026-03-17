export default function Header(props) {
  return (
    <header className="topbar">
      {/* Logo original mantida */}
      <div 
        className="logo-area" 
        onClick={props.onIrParaInicio} 
        style={{ cursor: 'pointer' }}
      >
        <img src="/logo.png" className="logo-img" alt="Logo Florida" />
        <span className="logo-text">TRICK STORE</span>
      </div>
        
        <div style={{ width: '1px', height: '15px', background: 'rgba(255,255,255,0.1)' }}></div>
        
        <div style={{ color: '#9b5cff' }}>
          {props.serverStatus?.players || 0} <span style={{ color: '#aaa', fontWeight: 'normal' }}>JOGADORES</span>
        </div>

        <div style={{ width: '1px', height: '15px', background: 'rgba(255,255,255,0.1)' }}></div>

        <div style={{ color: '#aaa', fontSize: '10px' }}>
          IP: <span style={{ color: '#eee' }}>189.127.164.145</span>
        </div>
      </div>

      <div className="top-actions" style={{ marginLeft: 'auto' }}>
        <button 
          className="cart-btn" 
          onClick={props.onAbrirCarrinho} 
          style={{ cursor: 'pointer', background: 'transparent', border: 'none', color: 'white' }}
        >
          🛒 Carrinho ({props.quantidadeItens || 0})
        </button>
      </div>
    </header>
  );
}
