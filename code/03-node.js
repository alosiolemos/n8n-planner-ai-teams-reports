// Nó n8n: Normalização Final
// ======================================================
// CONSOLIDAÇÃO FINAL
// 1 ITEM COM TODAS AS ATIVIDADES
// ======================================================

// Tasks já consolidadas
const tasks = $('Normalizar Detalhes').all();

// Respostas do Obter Mensagens
const respostas = $input.all();

// --------------------------------------
// LIMPA HTML
// --------------------------------------
function limparHtml(html = '') {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// --------------------------------------
// INDEXA MENSAGENS POR TASK
// --------------------------------------
const mensagensPorTask = new Map();

for (const item of respostas) {

  const json = item.json ?? {};

  if (!Array.isArray(json.value)) continue;

  for (const msg of json.value) {

    const taskId = msg.parentEntityId;

    if (!taskId || msg.deletedDateTime) continue;

    const mensagem = limparHtml(msg.content ?? '');

    if (!mensagem) continue;

    if (!mensagensPorTask.has(taskId)) {
      mensagensPorTask.set(taskId, []);
    }

    mensagensPorTask.get(taskId).push({
      data: msg.createdDateTime,
      mensagem
    });
  }
}

// --------------------------------------
// CONSOLIDA AS ATIVIDADES
// --------------------------------------
const atividades = tasks.map(item => {

  const task = item.json;

  let comentarios =
    mensagensPorTask.get(task.id) ?? [];

  comentarios.sort(
    (a, b) =>
      new Date(b.data) - new Date(a.data)
  );

  // Somente os 3 comentários mais recentes
  comentarios = comentarios.slice(0, 3);

  // Ex.: 0/8, 2/4, 3/12
  const progressoChecklist =
    `${task.checklistConcluido ?? 0}/${task.checklistTotal ?? 0}`;

  return {
    ...task,

    progressoChecklist,

    comentariosTotal: comentarios.length,
    comentarios
  };
});

// --------------------------------------
// SOMENTE 1 ITEM DE SAÍDA
// --------------------------------------
return [
  {
    json: {
      totalAtividades: atividades.length,
      atividades
    }
  }
];
