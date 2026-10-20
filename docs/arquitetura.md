# Arquitetura e separação dos ramos

## Entrada comum

As requisições consultam tarefas dos buckets de Operações e Governança. A autenticação para tarefas e para mensagens aparece em etapas próprias; não se deve assumir que um único token serve para todos os endpoints.

## Ramo de acompanhamento

Agendamento → obtenção de token → consultas de tarefas → normalização → detalhes/checklist → mensagens → consolidação → agente de resumo → formatação HTML → Teams.

A normalização de detalhes faz o cruzamento por id da tarefa e conta itens do checklist. A consolidação final associa mensagens por parentEntityId e conserva uma seleção de comentários recentes.

## Ramo de fechamento

Agendamento → consultas → consolidação das tarefas → recorte de atividades relevantes/mensagens → indicadores semanais → agente → formatação do resumo → Teams.

A etapa Indicadores Semanais tenta ler a fonte consolidada completa antes de usar a entrada. Essa decisão busca evitar que o subconjunto selecionado para comentários seja usado como população total dos indicadores.

## Tokens e modelos

Existem etapas de client_credentials e de refresh_token no export. A versão pública mantém o desenho, mas substitui segredos e referências. O modo de acesso e as permissões de cada endpoint precisam ser configurados e validados no ambiente autorizado.

O export contém dois nós de modelo Gemini e dois agentes. Não foram identificados nós de memória dedicados. Isso não permite afirmar que o provedor ou a instância não guardem dados de execução.

## Saída

Os formatadores recebem a resposta da IA e produzem conteúdo HTML. Os nós Teams estão desabilitados no template público. Eles não foram acionados na preparação.

O fluxo não lê o Power BI: o dashboard é um projeto complementar baseado no mesmo domínio de dados.
