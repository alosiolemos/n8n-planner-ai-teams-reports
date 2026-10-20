// Nó n8n: Normalizar Detalhes
// ======================================================
// CONSOLIDAR TASK + DETAILS + CHECKLIST
// ======================================================

// Details retornados pelo HTTP atual
const detailsItems = $input.all();

// Tasks originais normalizadas
const tasksOriginais = $('Normalizar Tasks').all();

// Cria índice por ID para cruzamento rápido
const tasksPorId = new Map(
  tasksOriginais.map(item => [
    item.json.id,
    item.json
  ])
);

return detailsItems.map(item => {

  const details = item.json;

  // Localiza a task original pelo mesmo ID
  const task = tasksPorId.get(details.id);

  if (!task) {
    throw new Error(
      `Task original não encontrada para o ID: ${details.id}`
    );
  }

  // Transforma checklist em array
  const checklist = Object.values(details.checklist ?? {})
    .map(check => ({
      title: check.title ?? "",
      isChecked: check.isChecked
        ? "Concluído"
        : "Não concluído"
    }));

  // Contadores
  const checklistTotal = checklist.length;

  const checklistConcluido = checklist.filter(
    check => check.isChecked === "Concluído"
  ).length;

  const checklistPendente =
    checklistTotal - checklistConcluido;

  // Resultado consolidado
  return {
    json: {
      ...task,

      // Converte percentual para status
      percentComplete:
        task.percentComplete === 0
          ? "Não iniciado"
          : task.percentComplete === 50
            ? "Em andamento"
            : task.percentComplete === 100
              ? "Concluída"
              : "Não identificado",

      description: details.description ?? "",

      checklistTotal,
      checklistConcluido,
      checklistPendente,

      checklist
    }
  };

});
