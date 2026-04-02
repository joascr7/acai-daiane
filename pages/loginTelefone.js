export default function LoginTelefone() {
  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff",
      padding: 20
    }}>

      <div style={{
        width: "100%",
        maxWidth: 400,
        textAlign: "center"
      }}>

        <h2 style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 10
        }}>
          Login por telefone
        </h2>

        <p style={{
          color: "#666",
          fontSize: 15,
          marginBottom: 25
        }}>
          Em breve disponível 🚀
        </p>

        <button
          onClick={() => window.location.href = "/login"}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 14,
            border: "none",
            background: "#ea1d2c",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          Voltar para login
        </button>

      </div>
    </div>
  );
}