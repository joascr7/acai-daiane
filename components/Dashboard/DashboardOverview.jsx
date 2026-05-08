import DashboardResumo from "./DashboardResumo";
import DashboardCards from "./DashboardCards";
import DashboardStats from "./DashboardStats";
import DashboardGrafico from "./DashboardGrafico";


export default function DashboardOverview({
  pedidos,
  usuarios,
  isMobile,
  totalFaturado,
  totalGastos,
  lucroTotal,
  margemLucro,
  pedidosEmAndamento,
  produtosAtivos,
  cupons,
  lojaAberta,
  limparFormularioGasto,
  setMostrarModalGasto,
  vendasManuais,
  formatarReal
}) {
  return (
    <>
      <DashboardResumo
        isMobile={isMobile}
        
        limparFormularioGasto={limparFormularioGasto}
        setMostrarModalGasto={setMostrarModalGasto}
      />

      <DashboardCards
        isMobile={isMobile}
        totalFaturado={totalFaturado}
        totalGastos={totalGastos}
        lucroTotal={lucroTotal}
        margemLucro={margemLucro}
        formatarReal={formatarReal}
      />

      <DashboardStats
  pedidosEmAndamento={pedidosEmAndamento}
  produtosAtivos={produtosAtivos}
  cupons={cupons}
  lojaAberta={lojaAberta}
  usuarios={usuarios}
  pedidos={pedidos}
  vendasManuais={vendasManuais}
  formatarReal={formatarReal}
  isMobile={isMobile}
/>

      <DashboardGrafico
  pedidos={pedidos}
  vendasManuais={vendasManuais} // 🔥 ESSENCIAL
  formatarReal={formatarReal}
/>
    </>
  );
}