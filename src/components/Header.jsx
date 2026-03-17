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
