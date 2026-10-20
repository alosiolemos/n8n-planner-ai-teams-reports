// Nó n8n: Normalizar Tasks1

const raw = $input.all().flatMap(i =>
  Array.isArray(i.json.value) ? i.json.value :
  i.json.id ? [i.json] : []
);

const tasks = [...new Map(
  raw.filter(t => t.id).map(t => [t.id, t])
).values()];

const B = {
  "CONFIGURE_ID_025": ["Operações","Concluídas"],
  "CONFIGURE_ID_008": ["Operações","Em andamento"],
  "CONFIGURE_ID_006": ["Operações","Aguardando Retorno"],
  "CONFIGURE_ID_004": ["Operações","Pausadas"],
  "CONFIGURE_ID_026": ["Operações","Não iniciadas"],
  "CONFIGURE_ID_022": ["Governança","Concluídas"],
  "CONFIGURE_ID_010": ["Governança","Iniciadas"],
  "CONFIGURE_ID_012": ["Governança","Aguardando Retorno"],
  "CONFIGURE_ID_016": ["Governança","Pausadas"],
  "CONFIGURE_ID_023": ["Governança","Priorizado - Não iniciado"],
  "CONFIGURE_ID_024": ["Governança","Mapeados"],
  "CONFIGURE_ID_014": ["Governança","Treinamento da Equipe"]
};

function ymdBR(date) {
  const p = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date(date));

  const o = Object.fromEntries(p.map(x => [x.type,x.value]));
  return `${o.year}-${o.month}-${o.day}`;
}

function addDays(s,n) {
  const d = new Date(`${s}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate()+n);
  return d.toISOString().slice(0,10);
}

const fim = ymdBR(new Date());
const inicio = addDays(fim,-6);

const dentro = date =>
  date && ymdBR(date) >= inicio && ymdBR(date) <= fim;

const acompanhamento = [
  "Em andamento","Iniciadas","Aguardando Retorno"
];

return tasks.flatMap(t => {
  const [board,bucket] = B[t.bucketId] ?? ["Desconhecido","Desconhecido"];

  const criada = dentro(t.createdDateTime);
  const concluida = bucket === "Concluídas" &&
    dentro(t.completedDateTime);
  const ativa = acompanhamento.includes(bucket);

  if (!criada && !concluida && !ativa) return [];

  return [{
    json: {
      id: t.id,
      planId: t.planId,
      bucketId: t.bucketId,
      board,
      bucket,
      title: t.title,
      percentComplete: t.percentComplete,
      createdDateTime: t.createdDateTime,
      completedDateTime: t.completedDateTime ?? null,
      semana: {inicio,fim},
      referencia: {
        criada_na_semana: Boolean(criada),
        concluida_na_semana: Boolean(concluida),
        em_acompanhamento: ativa
      }
    }
  }];
});

