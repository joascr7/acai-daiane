import DashboardResumo from "./DashboardResumo";
import DashboardCards from "./DashboardCards";
import DashboardStats from "./DashboardStats";
import DashboardGrafico from "./DashboardGrafico";

export default function DashboardOverview({
  pedidos,
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
        isMobile={isMobile}
        pedidosEmAndamento={pedidosEmAndamento}
        produtosAtivos={produtosAtivos}
        cupons={cupons}
        lojaAberta={lojaAberta}
      />

      <DashboardGrafico
  pedidos={pedidos}
  formatarReal={formatarReal}
/>
    </>
  );
}