// Nó n8n: Normalizar Tasks
// ======================================================
// NORMALIZAÇÃO DAS TASKS - PLANNER
// Entrada: respostas dos vários HTTP Requests após o Merge
// Saída: 1 item por Task
// ======================================================

const PLANOS = {
  "CONFIGURE_ID_020": "Governança",
  "CONFIGURE_ID_021": "Operações"
};

const BUCKETS = {

  // GOVERNANÇA
  "CONFIGURE_ID_022": "Concluídas",
  "CONFIGURE_ID_016": "Pausadas",
  "CONFIGURE_ID_014": "Treinamento da Equipe",
  "CONFIGURE_ID_012": "Aguardando Retorno",
  "CONFIGURE_ID_010": "Iniciadas",
  "CONFIGURE_ID_023": "Priorizado - Não iniciado",
  "CONFIGURE_ID_024": "Mapeados",

  // OPERAÇÕES
  "CONFIGURE_ID_004": "Pausadas",
  "CONFIGURE_ID_006": "Aguardando Retorno",
  "CONFIGURE_ID_025": "Concluídas",
  "CONFIGURE_ID_008": "Em andamento",
  "CONFIGURE_ID_026": "Não iniciadas"
};

const resultado = [];

for (const item of items) {

  // Cada HTTP Request entrega as tasks dentro de value[]
  const tasks = item.json.value ?? [];

  for (const task of tasks) {

    resultado.push({
      json: {

        // Identificação
        id: task.id,
        planId: task.planId,
        bucketId: task.bucketId,

        // Identificação amigável
        board: PLANOS[task.planId] ?? "Desconhecido",
        bucket: BUCKETS[task.bucketId] ?? "Desconhecido",

        // Dados da atividade
        title: task.title,
        orderHint: task.orderHint,
        assigneePriority: task.assigneePriority,

        // Progresso
        percentComplete: task.percentComplete,

        // Datas
        startDateTime: task.startDateTime,
        createdDateTime: task.createdDateTime,
        dueDateTime: task.dueDateTime

      }
    });
  }
}

return resultado;
