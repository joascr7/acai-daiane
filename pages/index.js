import Link from 'next/link';
import Header from '../components/Header';

export default function Home() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>
      <Header />

      <div style={{
        padding: 30,
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 32 }}>🍧 O melhor açaí da região</h1>

        <p style={{ color: '#aaa' }}>
          Monte seu açaí do jeito que quiser
        </p>

        <Link href="/acai">
          <button style={{
            marginTop: 20,
            padding: 15,
            borderRadius: 12,
            border: 'none',
            background: 'red',
            color: '#fff',
            fontSize: 16
          }}>
            🚀 Pedir agora
          </button>
        </Link>
      </div>
    </div>
  );
}