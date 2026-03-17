export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="logo-text">TRICK STORE</span>
          <p>A melhor experiência de Free Fire. Entrega semi-automática e segura.</p>
        </div>
        

        <div className="footer-group">
          <h4>Nossas Redes</h4>
          {/* Troque o # pelo link do seu Instagram, Discord e TikTok */}
          <a href="https://discord.gg/TZYmunkHkc" target="_blank" rel="noreferrer">Discord Oficial</a>
          <a href="https://instagram.com/SEUPERFIL" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://tiktok.com/@SEUPERFIL" target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Trick Store. Todos os direitos reservados.</p>
      </div>
    </footer>
  );

}
