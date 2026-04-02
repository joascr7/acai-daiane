import { useRouter } from "next/router";

export default function Entrada() {

  const router = useRouter();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      flexDirection: "column"
    }}>

      {/* 🔥 IMAGEM TOPO */}
      <div style={{
        flex: 1,
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} />

      {/* 🔥 CARD */}
      <div style={{
        background: "#fff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        boxShadow: "0 -5px 20px rgba(0,0,0,0.1)"
      }}>

        {/* BOTÃO PRINCIPAL */}
        <button
          onClick={() => router.push("/login")}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 12,
            border: "none",
            background: "#ea1d2c",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 10
          }}
        >
          Já tenho uma conta
        </button>

        {/* BOTÃO SECUNDÁRIO */}
        <button
          onClick={() => router.push("/login?cadastro=1")}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 12,
            border: "2px solid #ea1d2c",
            background: "#fff",
            color: "#ea1d2c",
            fontWeight: "bold",
            fontSize: 16
          }}
        >
          Criar nova conta
        </button>

        {/* SOCIAL */}
        <p style={{
          textAlign: "center",
          marginTop: 20,
          color: "#777"
        }}>
          Acessar com
        </p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 10
        }}>
          <div style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#f2f2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22
          }}>
            🍎
          </div>

          <div style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#f2f2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22
          }}>
            f
          </div>
        </div>

      </div>
    </div>
  );
}