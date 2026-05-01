import { Menu } from "lucide-react";

export default function Header({
  lojaAberta,
  logout,
  isMobile,
  setSidebarAberta
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: isMobile ? 14 : 18,
        marginBottom: 14,
        border: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12
      }}
    >
      {/* ESQUERDA */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        
        {/* BOTÃO MENU (SÓ MOBILE) */}
        {isMobile && (
          <button
            onClick={() => setSidebarAberta(true)}
            style={{
              background: "#020617",
              color: "#fff",
              border: "none",
              padding: 8,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Menu size={18} />
          </button>
        )}

        {/* TEXTO */}
        <div>
          <div
            style={{
              fontSize: 11,
              color: "#6b7280",
              fontWeight: 700,
              textTransform: "uppercase"
            }}
          >
            Painel da loja
          </div>

          <div
            style={{
              fontSize: isMobile ? 20 : 24,
              fontWeight: 900,
              color: "#111"
            }}
          >
            Loja Admin
          </div>
        </div>
      </div>

      {/* DIREITA */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* STATUS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: lojaAberta ? "#ecfdf3" : "#fff1f2",
            color: lojaAberta ? "#15803d" : "#b91c1c",
            padding: "6px 10px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 800
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: lojaAberta ? "#16a34a" : "#dc2626"
            }}
          />
          {lojaAberta ? "Aberto" : "Fechado"}
        </div>

        {/* BOTÃO SAIR */}
        <button
          onClick={logout}
          style={{
            height: 36,
            padding: "0 12px",
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            background: "#111",
            color: "#fff",
            fontWeight: 700,
            fontSize: 12,
            cursor: "pointer"
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}