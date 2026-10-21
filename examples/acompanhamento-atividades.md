# Exemplo de acompanhamento de atividades

Transcrição fornecida da mensagem recebida no Teams. Mantive o contexto e os números históricos; este texto não foi gerado novamente nesta preparação. Referências a desempenho e datas representam o conteúdo da mensagem, sem validação independente.

[Ver a captura e os indicadores](../docs/resultados-teams.md).

---

OPERAÇÕES E GOVERNANÇA | ACOMPANHAMENTO SEMANAL  
📊 Acompanhamento semanal de atividades  
Visão consolidada dos projetos em execução, pendências e principais atualizações.  
Resumo geral  
15  
Em acompanhamento	  
8  
Em curso	  
7  
Pausadas  

Indicadores de entregas  
4  
Concluídas no mês	  
3  
Semana anterior	  
37  
Não iniciadas  
📝 Panorama das atividades  
Em evolução: O Cockpit KAM avançou com a implementação de novos indicadores financeiros, como MRR D0 e TCV, e aguarda a etapa final de validação. O dashboard de Marketing está em fase de conclusão, com as principais métricas de funil já estruturadas, restando apenas ajustes visuais e de filtros. A automação do processo de importação para CNH-CASE também progrediu com o mapeamento das regras, e a construção do novo fluxo deve começar em breve.  
Operações: As melhorias planejadas para o POP, que incluem a criação de tickets de origem interna, notificações automáticas no Teams e a inclusão de uma tag para identificar tickets duplicados, foram temporariamente pausadas para priorizar as demandas de Governança. A retomada dessas atividades está prevista para a próxima semana.  
Acompanhamento: Duas atividades aguardam retorno para prosseguir. A automação da visibilidade da operação de Telefonia depende de um alinhamento com a área para definição dos indicadores, enquanto o projeto de automação do Faturamento de clientes está pausado até outubro, aguardando a consolidação de dados pela equipe Financeira.  


🏛️ Atividades de Governança  
📌 [MARKETING] - Dashboard RD - Leads - Visão integrada de funil e performance + Análise dos motivos de ganho e perda  
Status: 🔵 Iniciadas  
Cob: 44% - 4/9 Atividades  
Resumo do andamento:  
A engenharia de dados foi concluída, resultando em uma otimização significativa que reduziu o tempo de atualização do painel de 15 minutos para 8 segundos. O dashboard está em fase final de construção, já contemplando os principais indicadores de contatos, conversões e levantadas de mão. Os próximos passos estão focados em finalizar os gráficos de canais, refinar os comparativos e aplicar os últimos ajustes de layout para a validação final.  
Atividades em curso:  
Automatizar a atualização das integrações e do dashboard.  
Cruzar e enriquecer os registros entre RD Station e Pipedrive.  
Construir as visões de geração, funil, conversão e ganho/perda.  
Apresentar e validar ao solicitante  
Integrar contatos, leads e negócios do Pipedrive.  
Objetivo da entrega:  
Consolidar indicadores de Marketing (RD Station, Pipedrive) em um dashboard para fornecer uma visão integrada do funil de vendas.  

📌 [CS] - CNH - CASE | Evolução do Processo de Importação Manual de Bases  
Status: 🔵 Iniciadas  
Cob: 20% - 1/5 Atividades  
Resumo do andamento:  
Foi concluído o mapeamento inicial do processo de importação, que atualmente possui uma automação parcial e leva cerca de uma hora para ser executado. A próxima etapa, que consiste em detalhar todas as regras para a construção da automação completa, teve seu prazo estendido para 13/10 devido à priorização de outra demanda. O objetivo é reduzir o tempo do processo para 10 a 15 minutos.  
Atividades em curso:  
- Validar o novo processo com CS  
Testar com clientes que utilizam importação manual.  
Tratar erros e inconsistências dos arquivos.  
Criar automação para importação dos dados  
Objetivo da entrega:  
Reduzir o impacto das importações manuais, criando um processo intermediário mais simples, seguro e padronizado.  

📌 [OPERAÇÕES] - Automação da Visibilidade da Operação de Telefonia  
Status: 🟠 Aguardando Retorno  
Cob: 0% - 0/8 Atividades  
Resumo do andamento:  
A atividade foi iniciada com o levantamento inicial sobre a API da plataforma iBridge. No momento, o projeto aguarda um alinhamento com a equipe de Operações para mapear os indicadores de produtividade necessários e obter os acessos para extração dos dados, passos essenciais para dar continuidade à automação.  
Atividades em curso:  
Mapear agentes, ramais e identificadores.  
Validar os dados disponíveis na INDECX.  
Publicar e monitorar a automação.  
Levantar documentação e API do iBridge.  
Consolidar os indicadores de produtividade.  
Desenvolver a extração automática dos dados.  
Mapear os indicadores operacionais necessários.  
Definir o formato de visualização e entrega.  
Objetivo da entrega:  
Disponibilizar uma visão automatizada da produtividade dos agentes, eliminando a consolidação manual dos indicadores da telefonia.  

📌 [FINANCEIRO] - Automação do consumo e faturamento de clientes  
Status: 🟠 Aguardando Retorno  
Cob: 25% - 3/12 Atividades  
Resumo do andamento:  
O mapeamento inicial das bases de dados do Sankhya e da plataforma XM foi realizado. Contudo, o projeto encontra-se pausado até outubro, pois depende da consolidação de todos os dados contratuais dos clientes, uma etapa que está sob a responsabilidade da equipe Financeira e é fundamental para o cruzamento das informações.  
Atividades em curso:  
Cruzar dados encontrados do ID PARCEIRO (SANKHYA), COMPANI_ID XN om POP  
Validar processo e rotina.  
Criar uma base de dados consolidada para MVP 01  
Treinar equipes envolvidas  
Conectar plataformas | Sankhya, XM e POP  
Mapear toda a jornada | Detalhes, Informações, Planilhas, Cruzamentos e Extração de Dados  
Mapear contratos e regras de negócio | POP  
Validar modelo de DE: PARA e FONTE DA VERDADE  
Validar regra de negócio com CS e Financeiro  
Objetivo da entrega:  
Automatizar a apuração de consumo dos clientes e o envio das informações para o Sankhya, reduzindo o trabalho manual.  



⚙️ Atividades de Operações  
📌 [CS] - [POP] Cockpit KAM | Ajustes de Indicadores Comerciais e Propostas  
Status: 🟡 Em andamento  
Cob: 83% - 5/6 Atividades  
Resumo do andamento:  
A evolução do Cockpit KAM foi concluída, incluindo a criação de novos indicadores de receita (MRR/ARR D0, TCV, movimentações) e a implementação de regras para diferenciar reajustes contratuais de novas receitas. A atividade está na fase final de testes e aguarda a validação dos novos cálculos e do fluxo de propostas antes da entrega.  
Atividades em curso:  
Validar os indicadores e propostas no Cockpit KAM.  
Objetivo da entrega:  
Aprimorar o Cockpit KAM para permitir uma visão completa da evolução financeira da carteira de clientes.  

📌 [CS] - Central de tickets - Validação de melhorias Internas na Abertura de Tickets - POP  
Status: 🟡 Em andamento  
Cob: 0% - 0/3 Atividades  
Resumo do andamento:  
Esta atividade, que visa permitir o registro de melhorias identificadas internamente no POP, não apresentou avanços recentes. Ela foi temporariamente despriorizada para dar lugar a demandas de Governança e tem sua retomada planejada para a próxima semana.  
Atividades em curso:  
Criar o identificador “Melhoria Identificada Internamente”.  
Desenhar fluxo do formulário  
Validar o fluxo sem impacto na integração atual.  
Objetivo da entrega:  
Permitir que melhorias identificadas pelo time sejam registradas no POP de forma estruturada, sem serem confundidas com solicitações de clientes.  

📌 [CS] - POP Ajuste de Webhook para Notificações Automáticas no Microsoft Teams  
Status: 🟡 Em andamento  
Cob: 0% - 0/5 Atividades  
Resumo do andamento:  
A implementação de notificações automáticas do POP no Microsoft Teams está em espera. A atividade foi pausada para priorizar tarefas de Governança e deve ser reiniciada na semana seguinte.  
Atividades em curso:  
Selecionar o evento de nova solicitação de cliente.  
Preparar o fluxo para novos alertas futuros.  
Mapear os eventos disponíveis no webhook do POP.  
Validar o envio no canal definido.  
Integrar o webhook ao Microsoft Teams.  
Objetivo da entrega:  
Criar uma comunicação automática entre POP e Microsoft Teams para aumentar a visibilidade das novas solicitações de clientes.  

📌 [CS] - [POP] Inclusão de Tag “Duplicado” na Central de Tickets  
Status: 🟡 Em andamento  
Cob: 0% - 0/4 Atividades  
Resumo do andamento:  
A criação da tag "Duplicado" para identificar tickets repetidos no POP foi adiada. Assim como outras demandas operacionais, foi pausada para acomodar prioridades de Governança e será retomada na próxima semana.  
Atividades em curso:  
Exibir a tag nos cards e detalhes.  
Permitir aplicação manual nos tickets.  
Criar a tag “Duplicado”.  
Validar o uso da tag no fluxo de CS e Tecnologia  
Objetivo da entrega:  
Facilitar o tratamento de solicitações duplicadas sem criar novas etapas no fluxo ou impactar a integração com o Azure DevOps.  



🟣 Atividades pausadas  
⚙️ Operações  
⏸️ [CS] - POP NPS | CRIAR INTEGRAÇÃO PARA REPORT DE INDICADORES  
⏸️ [CS] POP - Gestão de Acesso – Telas de Exportação de Dados  
⏸️ [POP] Acesso de Edição/ Visualização e Upload – Jurídico e Contratos  
⏸️ [CS] Correção dos Filtros na Tela “Minhas Tarefas” | Gatantir que a listagem seja do proprietário  
⏸️ [CS] Correção/Validação da Recorrência de Projetos e Atividades após Conclusão  
⏸️ [TECNOLOGIA] - DATATRACK - Construção do Painel de visualização de informações dos clientes  
⏸️ [CS] - POP - AVALIAR MIGRAÇÃO DE CARTEIRAS QUE SÃO PROJETOS E NÃO CONTRATOS  