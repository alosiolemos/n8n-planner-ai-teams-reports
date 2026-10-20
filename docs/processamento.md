# Processamento e regras dos relatórios

## Normalizar tarefas

Normalizar Tasks transforma value[] das respostas em itens, aplica mapas de planId/bucketId e conserva campos de identificação, progresso e datas.

Normalizar Tasks1 também elimina duplicidades por id e seleciona tarefas criadas/concluídas no período ou em acompanhamento. Os dois nós têm finalidades e populações diferentes.

## Detalhes e checklist

Normalizar Detalhes cruza a resposta de detalhes com a tarefa por id, expande o checklist e calcula total, concluído e pendente. Quando não encontra a tarefa original, o código lança um erro.

A classificação de percentComplete considera os valores de origem esperados. Não se deve inferir que percentuais arbitrários foram classificados corretamente.

## Comentários

A consolidação usa parentEntityId para associar mensagens à tarefa. Conserva até três comentários após a ordenação. O campo comentariosTotal representa essa seleção limitada, não necessariamente todo o histórico de comentários.

A limpeza de HTML para texto não equivale a uma sanitização completa de conteúdo para renderização em qualquer contexto.

## Períodos

Contagem dos cards calcula entregas do mês e da semana anterior completa, além de não iniciadas.

Indicadores Semanais usa uma janela de sete dias até a referência e compara com os sete dias anteriores. Também compara entradas do mês corrente até a data de referência com o mês anterior completo. Essa comparação mensal não tem períodos de exposição iguais.

O status por bucket, as datas de criação e as datas de conclusão têm papéis diferentes. Conferir um total exige saber qual população e qual data a medida utiliza.

## IA e HTML

O agente de acompanhamento pede blocos de panorama e detalhamento. Formatar HTML Segunda exige os marcadores de bloco esperados; se estiverem ausentes, lança erro.

Formatar HTML Semanal interpreta formatos de retorno, separa entregas, em evolução e acompanhamento, e escapa o texto dessas seções antes de produzir HTML.

O formatador de segunda conserva HTML retornado pelo agente; isso não oferece a mesma proteção do escape textual do formatador semanal. Revise/sanitize conteúdo antes de uso com entradas não confiáveis. Instruções no prompt não garantem conformidade da saída.

## Métricas e decisões

O fluxo oferece entradas, entregas, em andamento, aguardando retorno, pausadas e não iniciadas, com atividades de acompanhamento. A IA escreve a narrativa; as contagens são preparadas por código.

As interpretações geradas devem ser distinguidas dos indicadores determinísticos. Não foi atribuído um ganho de produtividade quantificado ao workflow.
