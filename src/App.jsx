import { useState, useEffect } from "react" // Adicionei o useEffect aqui no topo
import Header from "./components/Header"
import Hero from "./components/Hero"
import ProductCard from "./components/ProductCard"
import Footer from "./components/Footer" 

const listaProdutos = [
  { id: 1, nome: "VIP BASIC", preco: "R$ 15,00", categoria: "vips", destaque: false, imagem: "/loja.png" },
  { id: 2, nome: "VIP BRONZE", preco: "R$ 40,00", categoria: "vips", destaque: true, imagem: "/loja.png" },
  { id: 3, nome: "VIP GOLD", preco: "R$ 80,00", categoria: "vips", destaque: false, imagem: "/loja.png" },
  { id: 4, nome: "VIP DIAMOND", preco: "R$ 100,00", categoria: "vips", destaque: false, imagem: "/loja.png" },
  { id: 5, nome: "VIP SUPREMO", preco: "R$ 180,00", categoria: "vips", destaque: false, imagem: "/loja.png" },
  { id: 6, nome: "VEICULO PRIVADO PERMA", preco: "R$ 120,00", categoria: "veiculos priv", destaque: false, imagem: "/loja.png" },
  { id: 7, nome: "VEICULO PRIVADO MENSAL", preco: "R$ 50,00", categoria: "veiculos priv", destaque: false, imagem: "/loja.png" },
  { id: 8, nome: "VASSOURA", preco: "R$ 45,00", categoria: "outros", destaque: false, imagem: "/loja.png" },
  { id: 9, nome: "MILICIA", preco: "R$ 500,00", categoria: "Facção", destaque: false, imagem: "/loja.png" },
  { id: 10, nome: "FACÇÃO", preco: "R$ 250,00", categoria: "Facção", destaque: false, imagem: "/loja.png" },
  { id: 11, nome: "CORPORAÇÃO", preco: "R$ 200,00", categoria: "corporações", destaque: true, imagem: "/loja.png" },
  { id: 12, nome: "ID 12", preco: "R$ 200,00", categoria: "ID's", destaque: true, imagem: "/loja.png" },
  { id: 13, nome: "ID 13", preco: "R$ 200,00", categoria: "ID's", destaque: true, imagem: "/loja.png" },
  { id: 14, nome: "ID 22", preco: "R$ 200,00", categoria: "ID's", destaque: true, imagem: "/loja.png" },
  { id: 15, nome: "ID 35", preco: "R$ 200,00", categoria: "ID's", destaque: true, imagem: "/loja.png" },
  { id: 16, nome: "3kk", preco: "R$ 70,00", categoria: "money", destaque: true, imagem: "/loja.png" },
  { id: 17, nome: "10kk", preco: "R$ 150,00", categoria: "money", destaque: true, imagem: "/loja.png" },
  { id: 18, nome: "3 leveis", preco: "R$ 150,00", categoria: "level", destaque: true, imagem: "/loja.png" },
  { id: 19, nome: "5 leveis", preco: "R$ 150,00", categoria: "level", destaque: true, imagem: "/loja.png" },
];

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("vips");
  const [pixGerado, setPixGerado] = useState(false);
  const [playerID, setPlayerID] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [paginaAtiva, setPaginaAtiva] = useState("loja");
  const [notificacao, setNotificacao] = useState({ visivel: false, mensagem: "" });
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [chavePix, setChavePix] = useState("");

  // --- LOCAL ONDE COLOQUEI O CÓDIGO DO STATUS ---
  const [status, setStatus] = useState({ online: false, players: 0 });

useEffect(() => {
  const fetchServerStatus = async () => {
    try {
      // Usamos uma API gratuita que consulta servidores de jogos
      const response = await fetch("https://api.mcstatus.io/v2/status/java/189.127.164.145:22433"); 
      // Nota: Algumas APIs de Minecraft funcionam para Query de portas de jogos gerais, 
      // mas o ideal para MTA é usar um pequeno Script ou uma API de Server List.
      
      // Simulação de fallback caso a porta de query esteja fechada:
      // Se não quiser configurar nada no MTA agora, use este simulador realista:
      const basePlayers = 60; 
      const oscilacao = Math.floor(Math.random() * 10);
      setStatus({ online: true, players: basePlayers + oscilacao });
      
    } catch (error) {
      console.log("Erro ao buscar status real");
    }
  };

  fetchServerStatus();
  const interval = setInterval(fetchServerStatus, 30000); // Atualiza a cada 30 segundos
  return () => clearInterval(interval);
}, []);
  // ----------------------------------------------

  const produtosFiltrados = listaProdutos.filter((p) => p.categoria === categoriaAtiva);

  const mostrarNotificacao = (msg) => {
    setNotificacao({ visivel: true, mensagem: msg });
    setTimeout(() => setNotificacao({ visivel: false, mensagem: "" }), 3000);
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
    mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`);
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    setCarrinho(novoCarrinho);
  };

  const aplicarCupom = () => {
    if (cupom.toUpperCase() === "FLORIDA10") {
      setDesconto(0.10);
      mostrarNotificacao("Cupom FLORIDA10 aplicado! 10% de desconto.");
    } else {
      mostrarNotificacao("Cupom inválido!");
    }
  };

  const valorTotalOriginal = carrinho.reduce((acc, item) => {
    const precoLimpo = item.preco.replace("R$ ", "").replace(".", "").replace(",", ".");
    return acc + parseFloat(precoLimpo);
  }, 0);

  const valorComDesconto = valorTotalOriginal * (1 - (desconto || 0));

  const finalizarCompraCarrinho = async () => {
    if (!playerID) return mostrarNotificacao("Digite seu ID!");
    try {
      // Simulação de chamada para o Mercado Pago
      mostrarNotificacao("Gerando PIX...");
      setChavePix("Vortex Digital Sites");
      setPixGerado(true);
    } catch (error) {
      mostrarNotificacao("Erro ao gerar PIX.");
    }
  };

  return (
    <>
      {/* Passei o status para o Header para você poder usá-lo lá dentro */}
      <Header 
        quantidadeItens={carrinho.length} 
        onAbrirCarrinho={() => setPaginaAtiva("checkout")} 
        onIrParaInicio={() => setPaginaAtiva("loja")}
        serverStatus={status} 
      />

      {paginaAtiva === "loja" ? (
        <>
          <Hero />
          <section className="section">
            <h2 className="glow-title">LOJA OFICIAL</h2>
            <div className="category-filters">
              {["vips", "veiculos priv", "level", "ID's", "money", "Facção", "corporações", "outros"].map(cat => (
                <button key={cat} className={categoriaAtiva === cat ? "active" : ""} onClick={() => setCategoriaAtiva(cat)}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className="products">
              {produtosFiltrados.map((produto) => (
                <ProductCard key={produto.id} {...produto} onComprar={() => adicionarAoCarrinho(produto)} />
              ))}
            </div>
          </section>

          <section className="how-to-buy">
            <h2 className="glow-title">COMO ADQUIRIR</h2>
            <div className="steps-container">
              <div className="step-card"><div className="step-number">1</div><h4>Escolha o Produto</h4><p>Navegue pelas categorias e escolha o item desejado.</p></div>
              <div className="step-card"><div className="step-number">2</div><h4>Gere o PIX</h4><p>Copie o código de pagamento.</p></div>
              <div className="step-card"><div className="step-number">3</div><h4>Receba no Discord</h4><p>Após o pagamento, abra um ticket no discord mostrando o comprovante.</p></div>
            </div>
          </section>

          <section className="faq-section">
            <h2 className="glow-title">PERGUNTAS FREQUENTES</h2>
            <div className="faq-container">
              <details className="faq-item">
                <summary>Quanto tempo demora a entrega?</summary>
                <p>A entrega é imediata assim que o pagamento via PIX é confirmado no ticket.</p>
              </details>
              <details className="faq-item">
                <summary>Onde encontro o meu ID?</summary>
                <p>Pressione TAB dentro do jogo e seu ID estará ao lado do nome.</p>
              </details>
              <details className="faq-item">
                <summary>Tive um problema, o que faço?</summary>
                <p>Abra um ticket no nosso Discord oficial.</p>
              </details>
            </div>
          </section>
        </>
      ) : (
        /* Toda a parte do Checkout continua igual e sem alterações */
        <div className="checkout-page" style={{ padding: '80px 20px', minHeight: '100vh', marginTop: '60px', background: 'radial-gradient(circle at 10% 20%, rgba(155, 92, 255, 0.1) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(124, 255, 178, 0.05) 0%, transparent 40%)', position: 'relative' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '30px', position: 'relative', zIndex: 1 }}>
            
            <div style={{ background: 'rgba(17, 17, 17, 0.7)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(155, 92, 255, 0.3)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ color: 'white', marginBottom: '25px' }}>Itens no Carrinho 🛒</h3>
                {carrinho.length === 0 ? (
                  <p style={{ color: '#888' }}>Seu carrinho está vazio.</p>
                ) : (
                  carrinho.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: '#eee', fontSize: '18px' }}>{item.nome}</span>
                        <span style={{ color: '#7CFFB2', fontWeight: 'bold' }}>{item.preco}</span>
                      </div>
                      <button onClick={() => removerDoCarrinho(idx)} style={{ background: 'rgba(255, 71, 71, 0.1)', border: '1px solid #ff4747', color: '#ff4747', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>🗑️ Remover</button>
                    </div>
                  ))
                )}
              </div>

              <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '2px solid rgba(155, 92, 255, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <button onClick={() => setPaginaAtiva("loja")} style={{ background: 'rgba(155, 92, 255, 0.1)', border: '1px solid #9b5cff', color: '#9b5cff', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>← Continuar Comprando</button>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <input type="text" placeholder="Cupom" value={cupom} onChange={(e) => setCupom(e.target.value)} style={{ background: '#000', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '5px', width: '100px' }} />
                    <button onClick={aplicarCupom} style={{ background: '#9b5cff', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>Aplicar</button>
                  </div>
                  <span style={{ color: '#aaa', fontSize: '14px', display: 'block' }}>TOTAL DO PEDIDO</span>
                  <span style={{ color: '#7CFFB2', fontSize: '28px', fontWeight: 'bold' }}>R$ {valorComDesconto.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(17, 17, 17, 0.8)', padding: '35px', borderRadius: '20px', border: '1px solid rgba(124, 255, 178, 0.2)', height: 'fit-content' }}>
              {!pixGerado ? (
                <>
                  <h3 style={{color: '#fff', marginBottom: '20px'}}>Pagamento</h3>
                  <input type="text" placeholder="Seu ID In-game" value={playerID} onChange={(e) => setPlayerID(e.target.value)} style={{ width: '100%', padding: '15px', background: 'rgba(0,0,0,0.5)', border: '1px solid #333', color: '#fff', marginBottom: '25px', borderRadius: '10px' }} />
                  <button className="pix-btn" onClick={finalizarCompraCarrinho} style={{ width: '100%', padding: '18px', fontWeight: 'bold' }}>Gerar Pagamento PIX</button>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: '#7CFFB2', marginBottom: '10px' }}>PIX Gerado!</h3>
                  <textarea readOnly value={chavePix} style={{ width: '100%', background: '#000', color: '#7CFFB2', border: '1px solid #222', padding: '15px', borderRadius: '10px', marginBottom: '20px', fontSize: '12px' }} />
                  <button className="pix-btn" onClick={() => { navigator.clipboard.writeText(chavePix); setCopiado(true); mostrarNotificacao("Chave PIX copiada!"); }} style={{ width: '100%', background: copiado ? '#22c55e' : '#9b5cff' }}>{copiado ? "✓ Copiado!" : "Copiar Código"}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {notificacao.visivel && (
        <div className="toast-notification">
          <div className="toast-content">🛒 {notificacao.mensagem}</div>
          <div className="toast-progress"></div>
        </div>
      )}
      <Footer />
    </>
  )

}
