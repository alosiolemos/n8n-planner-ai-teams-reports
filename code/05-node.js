// Nó n8n: Indicadores Semanais

// ======================================================
// INDICADORES SEMANAIS + RESUMO DAS ATIVIDADES
// Timezone: America/Sao_Paulo
// ======================================================

// 1. BUSCAR TODAS AS TAREFAS
// Fonte original, antes do filtro para comentários.

const FONTES = [
  "Merge - Todos os Projetos",
  "Merge - Todos os Projetos1"
];

function lerNode(nome) {
  try {
    return $(nome).all().map(i => i.json);
  } catch (e) {
    return [];
  }
}

function extrairTarefas(itens) {
  return itens.flatMap(j => {
    if (Array.isArray(j.value)) {
      return j.value.filter(t => t.id && t.bucketId);
    }
    if (j.id && j.bucketId) return [j];
    return [];
  });
}

let raw = [];

for (const nome of FONTES) {
  raw = extrairTarefas(lerNode(nome));
  if (raw.length) break;
}

// Permite executar também quando as tarefas
// estiverem diretamente na entrada.
if (!raw.length) {
  raw = extrairTarefas($input.all().map(i => i.json));
}

if (!raw.length) {
  throw new Error(
    "Fonte de tarefas não encontrada. " +
    "Configure FONTES com o nome do node " +
    "que reúne os 12 buckets do Planner."
  );
}

// Remover duplicidades
const tasks = [
  ...new Map(raw.map(t => [t.id, t])).values()
];

// 2. MAPA DOS BUCKETS

const B = {
  "CONFIGURE_ID_025":
    ["Operações", "Concluídas"],
  "CONFIGURE_ID_008":
    ["Operações", "Em andamento"],
  "CONFIGURE_ID_006":
    ["Operações", "Aguardando Retorno"],
  "CONFIGURE_ID_004":
    ["Operações", "Pausadas"],
  "CONFIGURE_ID_026":
    ["Operações", "Não iniciadas"],

  "CONFIGURE_ID_022":
    ["Governança", "Concluídas"],
  "CONFIGURE_ID_010":
    ["Governança", "Iniciadas"],
  "CONFIGURE_ID_012":
    ["Governança", "Aguardando Retorno"],
  "CONFIGURE_ID_016":
    ["Governança", "Pausadas"],
  "CONFIGURE_ID_023":
    ["Governança", "Priorizado - Não iniciado"],
  "CONFIGURE_ID_024":
    ["Governança", "Mapeados"],
  "CONFIGURE_ID_014":
    ["Governança", "Treinamento da Equipe"]
};

const meta = t =>
  B[t.bucketId] ?? ["Desconhecido", "Desconhecido"];

// 3. DATAS

function ymdBR(valor = new Date()) {
  if (!valor) return null;

  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date(valor));

  const p = Object.fromEntries(
    partes.map(x => [x.type, x.value])
  );

  return `${p.year}-${p.month}-${p.day}`;
}

function addDays(data, dias) {
  const d = new Date(`${data}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
}

const hoje = ymdBR();
const inicioAtual = addDays(hoje, -6);
const fimAtual = hoje;

const inicioAnterior = addDays(hoje, -13);
const fimAnterior = addDays(hoje, -7);

const inicioMesAtual = `${hoje.slice(0, 7)}-01`;
const inicioMesAnterior =
  addDays(inicioMesAtual, -1).slice(0, 7) + "-01";

function noPeriodo(data, inicio, fim) {
  if (!data) return false;
  const d = ymdBR(data);
  return d >= inicio && d <= fim;
}

function contarStatus(statuses) {
  return tasks.filter(t =>
    statuses.includes(meta(t)[1])
  ).length;
}

// 4. INDICADORES

const concluidas = tasks.filter(t =>
  meta(t)[1] === "Concluídas"
);

const recebidasAtual = tasks.filter(t =>
  noPeriodo(t.createdDateTime, inicioAtual, fimAtual)
);

const recebidasAnterior = tasks.filter(t =>
  noPeriodo(t.createdDateTime, inicioAnterior, fimAnterior)
);

const concluidasAtual = concluidas.filter(t =>
  noPeriodo(t.completedDateTime, inicioAtual, fimAtual)
);

const concluidasAnterior = concluidas.filter(t =>
  noPeriodo(t.completedDateTime, inicioAnterior, fimAnterior)
);

const emAndamento = contarStatus([
  "Em andamento",
  "Iniciadas"
]);

const aguardandoRetorno = contarStatus([
  "Aguardando Retorno"
]);

const pausadas = contarStatus(["Pausadas"]);

const naoIniciadas = contarStatus([
  "Não iniciadas",
  "Priorizado - Não iniciado",
  "Mapeados"
]);

const mesAtual = tasks.filter(t =>
  noPeriodo(t.createdDateTime, inicioMesAtual, hoje)
).length;

const mesAnterior = tasks.filter(t =>
  noPeriodo(
    t.createdDateTime,
    inicioMesAnterior,
    addDays(inicioMesAtual, -1)
  )
).length;

// 5. COMENTÁRIOS
// Mensagens vinculadas por parentEntityId.

const mensagensPorTask = new Map();

const respostas = lerNode("Obter Mensagens1");

for (const resposta of respostas) {
  const mensagens = Array.isArray(resposta.value)
    ? resposta.value
    : resposta.parentEntityId
      ? [resposta]
      : [];

  for (const m of mensagens) {
    if (!m.parentEntityId || m.deletedDateTime) continue;

    // Somente comentários da semana atual
    if (!noPeriodo(
      m.createdDateTime,
      inicioAtual,
      fimAtual
    )) continue;

    const id = m.parentEntityId;
    const lista = mensagensPorTask.get(id) ?? [];

    lista.push(m);
    mensagensPorTask.set(id, lista);
  }
}

function limparTexto(valor) {
  return String(valor ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizarAtividade(t) {
  const [board, status] = meta(t);

  const comentarios = (mensagensPorTask.get(t.id) ?? [])
    .sort((a, b) =>
      new Date(b.createdDateTime) -
      new Date(a.createdDateTime)
    )
    .slice(0, 3)
    .map(m => ({
      data: m.createdDateTime,
      texto: limparTexto(
        m.body?.content ?? m.content
      ).slice(0, 1200)
    }))
    .filter(m => m.texto);

  return {
    id: t.id,
    titulo: t.title ?? "",
    board,
    status,
    percentual: t.percentComplete ?? null,
    comentarios
  };
}

// 6. ATIVIDADES RELEVANTES

const statusAtivos = [
  "Em andamento",
  "Iniciadas",
  "Aguardando Retorno"
];

const acompanhamento = tasks
  .filter(t => statusAtivos.includes(meta(t)[1]))
  .map(normalizarAtividade);

const entregasSemana = concluidasAtual
  .map(normalizarAtividade);

// 7. SAÍDA PARA A IA

return [{
  json: {
    periodo: {
      referencia: hoje,
      ultimos_7_dias: {
        inicio: inicioAtual,
        fim: fimAtual
      },
      periodo_anterior: {
        inicio: inicioAnterior,
        fim: fimAnterior
      },
      mes_atual: inicioMesAtual.slice(0, 7),
      mes_anterior: inicioMesAnterior.slice(0, 7)
    },

    indicadores: {
      solicitacoes_ultimos_7_dias: recebidasAtual.length,
      entregues_ultimos_7_dias: concluidasAtual.length,

      solicitacoes_7_dias_anteriores: recebidasAnterior.length,
      entregues_7_dias_anteriores: concluidasAnterior.length,

      em_andamento: emAndamento,
      aguardando_retorno: aguardandoRetorno,
      em_curso: emAndamento + aguardandoRetorno,
      pausadas,
      nao_iniciadas: naoIniciadas,

      solicitacoes_mes_atual: mesAtual,
      solicitacoes_mes_anterior: mesAnterior
    },

    atividades: {
      em_acompanhamento: acompanhamento,
      concluidas_semana: entregasSemana
    }
  }
}];
