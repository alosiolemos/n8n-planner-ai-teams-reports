// Nó n8n: Contagem dos cards
// ======================================================
// RESUMO DE CONTAGENS
// ======================================================

const tasks = $input.all().flatMap(item => item.json.value ?? []);

// Data atual - horário de Brasília
const agora = new Date(
  new Date().toLocaleString('en-US', {
    timeZone: 'America/Sao_Paulo'
  })
);

// ------------------------------------------------------
// MÊS ATUAL
// ------------------------------------------------------

const inicioMes = new Date(
  agora.getFullYear(),
  agora.getMonth(),
  1
);

const inicioProximoMes = new Date(
  agora.getFullYear(),
  agora.getMonth() + 1,
  1
);

// ------------------------------------------------------
// SEMANA ANTERIOR COMPLETA
// Segunda 00:00 até segunda seguinte 00:00
// Horário de Brasília (UTC-03:00)
// ------------------------------------------------------

const agoraBR = new Date(
  new Date().toLocaleString('en-US', {
    timeZone: 'America/Sao_Paulo'
  })
);

const hojeBR = new Date(
  agoraBR.getFullYear(),
  agoraBR.getMonth(),
  agoraBR.getDate()
);

const diaSemana = hojeBR.getDay();

const diasDesdeSegunda =
  diaSemana === 0 ? 6 : diaSemana - 1;

const segundaAtual = new Date(hojeBR);
segundaAtual.setDate(
  hojeBR.getDate() - diasDesdeSegunda
);

const segundaAnterior = new Date(segundaAtual);
segundaAnterior.setDate(
  segundaAtual.getDate() - 7
);

// Converte os limites de Brasília para UTC
const inicioSemanaAnterior = new Date(
  segundaAnterior.getTime() + (3 * 60 * 60 * 1000)
);

const inicioSemanaAtual = new Date(
  segundaAtual.getTime() + (3 * 60 * 60 * 1000)
);

// ------------------------------------------------------
// CONTAGENS
// ------------------------------------------------------

const concluidasMes = tasks.filter(task => {

  if (!task.completedDateTime) return false;

  const data = new Date(task.completedDateTime);

  return (
    data >= inicioMes &&
    data < inicioProximoMes
  );

}).length;


const concluidasSemanaAnterior = tasks.filter(task => {

  if (!task.completedDateTime) return false;

  const data = new Date(task.completedDateTime);

  return (
    data >= inicioSemanaAnterior &&
    data < inicioSemanaAtual
  );

}).length;


// Não iniciadas
// Funciona tanto com Graph bruto (0)
// quanto com sua normalização ("Não iniciado")

const naoIniciadas = tasks.filter(task =>
  task.percentComplete === 0 ||
  task.percentComplete === "Não iniciado"
).length;


// ------------------------------------------------------
// SAÍDA
// ------------------------------------------------------

return [{
  json: {
    concluidas_mes: concluidasMes,
    concluidas_semana_anterior: concluidasSemanaAnterior,
    nao_iniciadas: naoIniciadas
  }
}];
