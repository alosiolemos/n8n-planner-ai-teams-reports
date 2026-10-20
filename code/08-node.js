// Nó n8n: Formatar HTML Semanal

// ======================================================
// FORMATAR HTML SEMANAL — MICROSOFT TEAMS
// Indicadores originais + resumo estruturado do Gemini
// ======================================================

// 1. DADOS ORIGINAIS
const origem = $("Indicadores Semanais").first().json;
const { periodo: p, indicadores: i } = origem;

// 2. RESPOSTA DO GEMINI
const resposta = $input.first().json;

// Normaliza os diferentes formatos de retorno da IA
function obterResumo(obj) {
  let valor = obj;

  for (let tentativa = 0; tentativa < 5; tentativa++) {
    if (typeof valor === "string") {
      const texto = valor.trim()
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/, "");

      try {
        valor = JSON.parse(texto);
        continue;
      } catch {
        // Compatibilidade com o formato antigo
        return {
          entregas: "",
          em_evolucao: texto,
          acompanhamento: ""
        };
      }
    }

    if (!valor || typeof valor !== "object") break;

    // Já encontrou o objeto esperado
    if (
      "entregas" in valor ||
      "em_evolucao" in valor ||
      "acompanhamento" in valor
    ) {
      break;
    }

    const proximo =
      valor.output ??
      valor.text ??
      valor.response ??
      valor.resumo_atividades ??
      valor.data ??
      valor.result;

    if (proximo === undefined || proximo === valor) break;

    valor = proximo;
  }

  if (!valor || typeof valor !== "object") {
    return {
      entregas: "",
      em_evolucao: "",
      acompanhamento: ""
    };
  }

  function textoCampo(v) {
    return typeof v === "string" ? v.trim() : "";
  }

  return {
    entregas: textoCampo(valor.entregas),
    em_evolucao: textoCampo(valor.em_evolucao),
    acompanhamento: textoCampo(valor.acompanhamento)
  };
}

const resumo = obterResumo(resposta);

// 3. SEGURANÇA E FORMATAÇÃO
function esc(v) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function dataBR(v) {
  if (!v) return "";

  const [ano, mes, dia] = String(v)
    .slice(0, 10)
    .split("-");

  return `${dia}/${mes}/${ano}`;
}

function periodoCurto(obj) {
  return `${dataBR(obj.inicio).slice(0, 5)} a ${dataBR(obj.fim)}`;
}

function mesBR(v) {
  const [ano, mes] = String(v).split("-").map(Number);

  const nome = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    timeZone: "UTC"
  }).format(new Date(Date.UTC(ano, mes - 1, 1)));

  return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function mesAno(v) {
  return `${mesBR(v)}/${String(v).slice(0, 4)}`;
}

function numero(v) {
  return Number(v ?? 0).toLocaleString("pt-BR");
}

// 4. INDICADORES
const recebidas = numero(i.solicitacoes_ultimos_7_dias);
const concluidas = numero(i.entregues_ultimos_7_dias);
const acompanhamento = numero(i.em_curso);

const recebidasAnterior =
  numero(i.solicitacoes_7_dias_anteriores);

const concluidasAnterior =
  numero(i.entregues_7_dias_anteriores);

const emAndamento = numero(i.em_andamento);
const aguardando = numero(i.aguardando_retorno);

const mesAtual = numero(i.solicitacoes_mes_atual);
const mesAnterior = numero(i.solicitacoes_mes_anterior);

// 5. RESUMO DAS ATIVIDADES
// Cada categoria é renderizada separadamente.
// Nunca converter o objeto inteiro em texto.

function linhaResumo(rotulo, texto) {
  if (!texto) return "";

  return `<p><strong>${rotulo}:</strong> ${esc(texto)}</p>`;
}

const resumoHtml = [
  linhaResumo("Entregas", resumo.entregas),
  linhaResumo("Em evolução", resumo.em_evolucao),
  linhaResumo("Acompanhamento", resumo.acompanhamento)
].filter(Boolean).join("\n");

const resumoFinal = resumoHtml ||
  `<p>Não há atualizações detalhadas suficientes
  para compor o resumo das atividades.</p>`;

// 6. HTML — LAYOUT EXECUTIVO TEAMS

const html = `
<div>
  <p>
    <small>
      <strong>
        OPERAÇÕES E GOVERNANÇA | ${dataBR(p.referencia)}
      </strong>
    </small>
  </p>

  <h2>📊 Fechamento semanal de solicitações</h2>

  <p>
    Visão consolidada das entradas, entregas
    e atividades em acompanhamento.
  </p>

  <hr>

  <p>
    <strong>
      Semana atual · ${periodoCurto(p.ultimos_7_dias)}
    </strong>
  </p>

  <table>
    <tr>
      <td align="center" width="33%">
        <h2>${recebidas}</h2>
        <small>Recebidas</small>
      </td>

      <td align="center" width="33%">
        <h2>${concluidas}</h2>
        <small>Concluídas</small>
      </td>

      <td align="center" width="34%">
        <h2>${acompanhamento}</h2>
        <small>Em acompanhamento</small>
      </td>
    </tr>
  </table>

  <p><strong>Comparativo semanal</strong></p>

  <table>
    <tr>
      <th align="left">Indicador</th>
      <th align="center">Semana atual</th>
      <th align="center">Semana anterior</th>
    </tr>

    <tr>
      <td>📥 Recebidas</td>
      <td align="center">
        <strong>${recebidas}</strong>
      </td>
      <td align="center">${recebidasAnterior}</td>
    </tr>

    <tr>
      <td>✅ Concluídas</td>
      <td align="center">
        <strong>${concluidas}</strong>
      </td>
      <td align="center">${concluidasAnterior}</td>
    </tr>
  </table>

  <p>
    <small>
      Semana anterior: ${periodoCurto(p.periodo_anterior)}.
    </small>
  </p>

  <hr>

  <p><strong>📆 Visão mensal</strong></p>

  <table>
    <tr>
      <td align="center" width="50%">
        <h2>${mesAtual}</h2>
        <small>${esc(mesAno(p.mes_atual))}</small>
      </td>

      <td align="center" width="50%">
        <h2>${mesAnterior}</h2>
        <small>${esc(mesAno(p.mes_anterior))}</small>
      </td>
    </tr>
  </table>

  <hr>

  <p><strong>📝 Resumo das atividades</strong></p>

  ${resumoFinal}

  <hr>

  <p>
    <small>
      Em andamento: ${emAndamento}
      · Aguardando retorno: ${aguardando}
    </small>
  </p>
</div>
`.trim();

// 7. SAÍDA
return [{
  json: {
    html,
    contentType: "html",
    referencia: p.referencia,
    resumo_atividades: resumo
  }
}];

