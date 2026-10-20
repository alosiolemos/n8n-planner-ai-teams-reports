// Nó n8n: Formatar HTML Segunda

// ======================================================
// FORMATAR HTML SEGUNDA — MICROSOFT TEAMS
// Cabeçalho executivo + panorama + detalhamento original
// Run Once for All Items
// ======================================================

// 1. DADOS CONSOLIDADOS
const origem = $("conclusão das informações").first().json;

const atividades = Array.isArray(origem.atividades)
  ? origem.atividades
  : [];

const normalizar = v =>
  String(v ?? "").trim().toLowerCase();

const emCursoBuckets = [
  "em andamento",
  "iniciadas",
  "aguardando retorno"
];

const emCurso = atividades.filter(a =>
  emCursoBuckets.includes(normalizar(a.bucket))
).length;

const pausadas = atividades.filter(a =>
  normalizar(a.bucket) === "pausadas"
).length;

const total = Number(origem.totalAtividades ?? atividades.length);
const concluidasMes = Number(origem.concluidas_mes ?? 0);
const concluidasSemana = Number(origem.concluidas_semana_anterior ?? 0);
const naoIniciadas = Number(origem.nao_iniciadas ?? 0);

const numero = v =>
  Number(v).toLocaleString("pt-BR");

// 2. SAÍDA DO GEMINI
const resposta = $input.first().json;

function obterTexto(obj) {
  let valor = obj.output ?? obj.text ?? obj.response ?? obj;

  if (typeof valor === "object" && valor !== null) {
    valor = valor.output ??
            valor.text ??
            valor.html ??
            JSON.stringify(valor);
  }

  return String(valor ?? "")
    .trim()
    .replace(/^```(?:html)?\s*/i, "")
    .replace(/\s*```$/i, "");
}

const textoGemini = obterTexto(resposta);

// 3. EXTRAIR BLOCOS
function extrairEntre(texto, inicio, fim) {
  const posInicio = texto.indexOf(inicio);
  const posFim = texto.indexOf(fim);

  if (posInicio < 0 || posFim < 0 || posFim <= posInicio) {
    return "";
  }

  return texto
    .slice(posInicio + inicio.length, posFim)
    .trim();
}

const panorama = extrairEntre(
  textoGemini,
  "<!-- PANORAMA_INICIO -->",
  "<!-- PANORAMA_FIM -->"
);

const marcadorAtividades = "<!-- ATIVIDADES_INICIO -->";

let detalhamento = "";

if (textoGemini.includes(marcadorAtividades)) {
  detalhamento = textoGemini
    .split(marcadorAtividades)
    .slice(1)
    .join(marcadorAtividades)
    .trim();
} else {
  // Compatibilidade com saída antiga do Gemini
  const match = textoGemini.match(
    /<h2[^>]*>\s*(?:🏛️\s*)?Atividades de Governança/i
  );

  if (match) {
    detalhamento = textoGemini
      .slice(match.index)
      .trim();
  }
}

// 4. VALIDAR CONTEÚDO
if (!panorama) {
  throw new Error(
    "Gemini não retornou o bloco PANORAMA. Verifique o prompt."
  );
}

if (!detalhamento) {
  throw new Error(
    "Gemini não retornou o detalhamento das atividades."
  );
}

// 5. FORMATAÇÃO DO CABEÇALHO
const celula = (valor, titulo) => `
<td align="center">
  <h2>${numero(valor)}</h2>
  <small>${titulo}</small>
</td>`;

const html = `
<div>

  <p>
    <small>
      <strong>OPERAÇÕES E GOVERNANÇA | ACOMPANHAMENTO SEMANAL</strong>
    </small>
  </p>

  <h2>📊 Acompanhamento semanal de atividades</h2>

  <p>
    Visão consolidada dos projetos em execução,
    pendências e principais atualizações.
  </p>

  <hr>

  <p><strong>Resumo geral</strong></p>

  <table>
    <tr>
      ${celula(total, "Em acompanhamento")}
      ${celula(emCurso, "Em curso")}
      ${celula(pausadas, "Pausadas")}
    </tr>
  </table>

  <br>

  <p><strong>Indicadores de entregas</strong></p>

  <table>
    <tr>
      ${celula(concluidasMes, "Concluídas no mês")}
      ${celula(concluidasSemana, "Semana anterior")}
      ${celula(naoIniciadas, "Não iniciadas")}
    </tr>
  </table>

  <hr>

  <p><strong>📝 Panorama das atividades</strong></p>

  ${panorama}

  <br>
  <hr>
  <br>

  ${detalhamento}

</div>
`.trim();

// 6. SAÍDA PARA MICROSOFT TEAMS
return [{
  json: {
    html,
    contentType: "html",

    indicadores: {
      totalAtividades: total,
      emCurso,
      pausadas,
      concluidasMes,
      concluidasSemanaAnterior: concluidasSemana,
      naoIniciadas
    },

    panorama,
    detalhamento,
    validado: true
  }
}];

