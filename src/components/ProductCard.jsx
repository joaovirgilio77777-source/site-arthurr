export default function ProductCard({ nome, preco, destaque, imagem, onComprar }) {
  return (
    <div className={`product product-card ${destaque ? "destaque" : ""}`}>
      {/* Use a propriedade imagem que vem da lista, ou um caminho direto da public */}
      <img src={imagem || "/vip.png"} alt={nome} />
      <h3>{nome}</h3>
      <p style={{fontSize: '13px', color: '#888'}}>Benefícios Exclusivos</p>
      <div className="price">{preco}</div>
      <button onClick={() => onComprar({ nome, preco })}>Comprar</button>
    </div>
  )
}