{/*import {
  Home,
  Search,
  ClipboardList,
  ShoppingCart,
  User,
  LogOut
} from "lucide-react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { authCliente as auth } from "../services/firebaseDual";

export default function SidebarLoja({
  aba,
  setAba,
  setAbaPerfil,
  setStep,
  carrinho,
  setCarrinho,
  setPedidos,
  setPontosFidelidade,
  user,
  setUser,
  isMobile,
  menuAberto,
  setMenuAberto
}) {
  const router = useRouter();

  const itens = [
    { id: "home", label: "Início", icon: Home, step: 1 },
    { id: "busca", label: "Buscar", icon: Search, step: 10 },
    { id: "pedidos", label: "Pedidos", icon: ClipboardList, step: 5 },
    { id: "carrinho", label: "Carrinho", icon: ShoppingCart, step: 3 },
    { id: "perfil", label: "Perfil", icon: User, step: 4 }
  ];

  const handleClick = (item) => {
    if (item.id === "perfil") {
      setAba("perfil");
      setStep(4);
    } else if (item.id === "carrinho") {
      setAba("carrinho");
      setStep(3);
    } else {
      setAba(item.id);
      setStep(item.step);
    }

    if (isMobile) {
      setMenuAberto(false);
    }
  };

  const handleLogout = async (e) => {
    if (navigator.vibrate) navigator.vibrate(10);

    // ripple
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);

    try {
      await signOut(auth);
      setUser(null);
      setCarrinho([]);
      setPedidos([]);
      setPontosFidelidade(0);

      localStorage.removeItem("carrinho");
      localStorage.removeItem("pedidoAtual");

      setAba("home");
      setStep(1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        ...sidebar,
        transform: isMobile
          ? menuAberto
            ? "translateX(0)"
            : "translateX(-100%)"
          : "translateX(0)"
      }}
    >
      
      <div style={logo}>Açaí da Daí</div>

     
      <div style={menu}>
        {itens.map((item) => {
          const Icon = item.icon;
          const ativo = aba === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleClick(item)}
              style={{
                ...itemStyle,
                background: ativo ? "#fdecec" : "transparent",
                color: ativo ? "#ea1d2c" : "#444"
              }}
            >
              <div style={{ position: "relative" }}>
                <Icon size={18} />

                {item.id === "carrinho" && carrinho?.length > 0 && (
                  <div style={badge}>
                    {carrinho.length}
                  </div>
                )}
              </div>

              {item.label}
            </div>
          );
        })}
      </div>

      
      <div style={freteBox}>
        <div style={{ fontWeight: 800 }}>Frete Grátis</div>
        <div style={{ fontSize: 13 }}>
          Em pedidos acima de <b>R$ 30,00</b>
        </div>
        <div style={{ fontSize: 12, marginTop: 4 }}>
          Válido até 7km
        </div>
      </div>

      
<div style={boxAuth}>
  {user ? (
    <button
      onClick={handleLogout}
      style={btnLogout}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <LogOut size={16} />
      Sair
    </button>
  ) : (
    <button
      onClick={() => (window.location.href = "/login")}
      style={btnLogin}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      Entrar
    </button>
  )}
</div>
    </div>
  );
}

const sidebar = {
  width: 260,
  height: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  background: "#fff",
  borderRight: "1px solid #eee",
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  transition: "transform 0.3s ease",
  zIndex: 50,
  overflowY: "auto"
};

const logo = {
  fontSize: 22,
  fontWeight: 900,
  color: "#ea1d2c"
};

const menu = {
  display: "flex",
  flexDirection: "column",
  gap: 6
};

const itemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14
};

const badge = {
  position: "absolute",
  top: -6,
  right: -8,
  background: "#ea1d2c",
  color: "#fff",
  borderRadius: "50%",
  fontSize: 10,
  width: 16,
  height: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700
};

const freteBox = {
  marginTop: 10,
  background: "#ea1d2c",
  color: "#fff",
  borderRadius: 14,
  padding: 14,
  fontSize: 14
};

const boxAuth = {
  marginTop: "auto",
  paddingTop: 10
};

const btnLogout = {
  width: "100%",
  height: 46,
  borderRadius: 14,
  background: "#fff",
  color: "#ea1d2c",
  border: "1px solid #eee",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  transition: "all 0.15s ease",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};

const btnLogin = {
  width: "100%",
  height: 46,
  borderRadius: 14,
  background: "#ea1d2c",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 800,
  fontSize: 14,
  transition: "all 0.15s ease",
  boxShadow: "0 6px 18px rgba(234,29,44,0.25)"
};*/}