import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";

export default function LoginEntregador({ setUser }) {

  const [modoCadastro, setModoCadastro] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: ""
  });

  const [erros, setErros] = useState({});
  const [valido, setValido] = useState({});

  // 🔥 CPF máscara
  function formatarCPF(valor) {
    valor = valor.replace(/\D/g, "").slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return valor;
  }

  function handleChange(e) {
    let { name, value } = e.target;

    if (name === "nome") value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    if (name === "cpf") value = formatarCPF(value);
    if (name === "telefone") value = value.replace(/\D/g, "").slice(0, 11);

    setForm(prev => ({ ...prev, [name]: value }));
    validarCampo(name, value);
  }

  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += cpf[i] * (10 - i);

    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto != cpf[9]) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += cpf[i] * (11 - i);

    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    return resto == cpf[10];
  }

  function validarCampo(name, value) {
    let erro = "";
    let ok = false;

    if (name === "nome" && modoCadastro) {
      ok = !!value;
      erro = ok ? "" : "Informe seu nome";
    }

    if (name === "cpf" && modoCadastro) {
      ok = validarCPF(value);
      erro = ok ? "" : "CPF inválido";
    }

    if (name === "email") {
      ok = value.includes("@");
      erro = ok ? "" : "Email inválido";
    }

    if (name === "senha") {
      ok = value.length >= 6;
      erro = ok ? "" : "Mínimo 6 caracteres";
    }

    setErros(prev => ({ ...prev, [name]: erro }));
    setValido(prev => ({ ...prev, [name]: ok }));
  }

  // 🔐 LOGIN (API)
  async function logar() {

    if (Object.values(erros).some(e => e)) {
      alert("Corrija os campos");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          senha: form.senha
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.erro);
        setLoading(false);
        return;
      }

      localStorage.setItem("entregador", JSON.stringify(data));
      setUser(data);

    } catch (e) {
      alert("Erro ao logar");
    }

    setLoading(false);
  }

  // 🔐 CADASTRO (API)
  async function cadastrar() {

    if (!validarCPF(form.cpf)) {
      alert("CPF inválido");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.erro);
        setLoading(false);
        return;
      }

      alert("Conta criada com sucesso");
      setModoCadastro(false);

    } catch (e) {
      alert("Erro ao cadastrar");
    }

    setLoading(false);
  }

  return (
    <div style={container}>
      <div style={card}>

        <h2 style={titulo}>
          {modoCadastro ? "Criar conta" : "Login Entregador"}
        </h2>

        {modoCadastro && (
          <>
            <Input name="nome" value={form.nome} onChange={handleChange} erro={erros.nome} valido={valido.nome} placeholder="Nome completo"/>
            <Input name="cpf" value={form.cpf} onChange={handleChange} erro={erros.cpf} valido={valido.cpf} placeholder="CPF"/>
            <Input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone"/>
          </>
        )}

        <Input name="email" value={form.email} onChange={handleChange} erro={erros.email} valido={valido.email} placeholder="Email"/>

        {/* 🔥 SENHA FIXA */}
        <div style={senhaBox}>
          <input
            type={mostrarSenha ? "text" : "password"}
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            style={senhaInput}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {valido.senha && <Check size={16} color="#00c853" />}
            <button onClick={() => setMostrarSenha(!mostrarSenha)} style={eyeBtn}>
              {mostrarSenha ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          </div>
        </div>

        {erros.senha && <Erro texto={erros.senha}/>}

        <button
          onClick={modoCadastro ? cadastrar : logar}
          style={botao}
        >
          {loading ? "Carregando..." : modoCadastro ? "Cadastrar" : "Entrar"}
        </button>

        <p onClick={() => setModoCadastro(!modoCadastro)} style={link}>
          {modoCadastro ? "Já tenho conta" : "Criar conta"}
        </p>

      </div>
    </div>
  );
}

/* COMPONENTES */

function Input({ name, placeholder, value, onChange, erro, valido }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={inputBox}>
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={input}
        />
        {valido && <Check size={16} color="#00c853" />}
      </div>
      {erro && <Erro texto={erro} />}
    </div>
  );
}

function Erro({ texto }) {
  return <div style={{ fontSize: 12, color: "#ff2a2a" }}>{texto}</div>;
}

/* ESTILO */

const container = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f5f5f5"
};

const card = {
  width: "90%",
  maxWidth: 360,
  background: "#fff",
  borderRadius: 20,
  padding: 25,
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
};

const titulo = {
  textAlign: "center",
  marginBottom: 20,
  color: "#ff2a2a",
  fontWeight: "800"
};

const inputBox = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #ddd",
  borderRadius: 12,
  padding: "0 10px"
};

const input = {
  flex: 1,
  padding: 14,
  border: "none",
  outline: "none",
  color: "#111"
};

const senhaBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #ddd",
  borderRadius: 12,
  padding: "0 10px",
  marginBottom: 5,
  background: "#fff"
};

const senhaInput = {
  flex: 1,
  padding: 14,
  border: "none",
  outline: "none",
  color: "#111"
};

const eyeBtn = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center"
};

const botao = {
  width: "100%",
  padding: 14,
  borderRadius: 12,
  border: "none",
  background: "#ff2a2a",
  color: "#fff",
  fontWeight: "700",
  marginTop: 10
};

const link = {
  marginTop: 15,
  textAlign: "center",
  fontSize: 13,
  color: "#777",
  cursor: "pointer"
};