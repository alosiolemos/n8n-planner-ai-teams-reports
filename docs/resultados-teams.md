# Resultado dos relatórios no Microsoft Teams

Construí a entrega para que a equipe recebesse tanto uma leitura rápida dos indicadores quanto um panorama textual dos projetos. O workflow consulta e organiza dados do Planner, usa Gemini para produzir a síntese e aplica os formatadores HTML antes do envio ao Teams.

As imagens e os textos desta página foram fornecidos como exemplos de mensagens já recebidas. Não executei novamente a automação para produzi-los.

## 1. Acompanhamento de atividades

![Mensagem de acompanhamento no Teams](../assets/screenshots/teams-acompanhamento-atividades.png)

A captura está identificada como **12/10, 07:31**. O relatório começa com:

| Resumo geral | Quantidade |
| --- | --- |
| Em acompanhamento | 15 |
| Em curso | 8 |
| Pausadas | 7 |

| Indicadores de entregas | Quantidade |
| --- | --- |
| Concluídas no mês | 4 |
| Semana anterior | 3 |
| Não iniciadas | 37 |

Em seguida, apresenta o panorama das atividades e o detalhamento por frente. O [texto completo desse exemplo](../examples/acompanhamento-atividades.md) inclui andamento, checklist, objetivo e atividades pausadas; esses blocos não aparecem integralmente na captura.

“Em acompanhamento” não representa toda a base do Planner. Nesse exemplo, corresponde à visão apresentada no topo do relatório, distinta das atividades não iniciadas e das entregas de outros períodos.

## 2. Fechamento semanal

![Mensagem de fechamento semanal no Teams](../assets/screenshots/teams-fechamento-semanal.png)

O período atual é **03/10/2026 a 09/10/2026**; o anterior é **26/09/2026 a 02/10/2026**.

| Indicador | Semana atual | Semana anterior |
| --- | --- | --- |
| Solicitações recebidas | 3 | 12 |
| Solicitações concluídas | 2 | 8 |

| Acompanhamento atual | Quantidade |
| --- | --- |
| Em andamento | 7 |
| Aguardando retorno | 2 |
| Total em acompanhamento | 9 |

| Visão mensal — recebidas | Quantidade |
| --- | --- |
| Outubro/2026 | 7 |
| Setembro/2026 | 47 |

A comparação mensal está na fotografia da execução: outubro ainda estava em andamento. Não representa dois meses completos.

### Exemplo textual enviado

**Olá, pessoal!**

Segue o fechamento semanal das solicitações de Operações e Governança.

#### 📊 Resumo da semana

**📅 PERÍODO ATUAL — 03/10/2026 a 09/10/2026**

📥 Solicitações recebidas: **3**  
✅ Solicitações concluídas: **2**

**📅 PERÍODO ANTERIOR — 26/09/2026 a 02/10/2026**

📥 Solicitações recebidas: **12**  
✅ Solicitações concluídas: **8**

**🟡 ACOMPANHAMENTO ATUAL**

▶️ Em andamento: **7**  
🟠 Aguardando retorno: **2**

**📆 VISÃO MENSAL**

📥 Solicitações recebidas em outubro: **7**  
📥 Solicitações recebidas em setembro: **47**

---

#### 📌 Resumo

Nesta semana, foram recebidas 3 novas solicitações e 2 foram concluídas. A movimentação foi menor em comparação com o período anterior, que registrou 12 novas solicitações e 8 conclusões. Atualmente, 9 solicitações seguem em acompanhamento.

---

O texto acima reproduz o resumo fornecido para o case. A captura do Teams mostra também um bloco de entregas, evolução e acompanhamento; não é uma reprodução visual literal dessa versão textual.

## 3. Cálculo, síntese e apresentação

- **Indicadores:** o processamento JavaScript organiza e calcula os dados conforme as regras dos períodos e status documentadas em [processamento](processamento.md).
- **Síntese com IA:** Gemini recebe o contexto e gera a narrativa das atividades. A mensagem deve ser revisada conforme sua finalidade; interpretações não comprovam causas ou desempenho.
- **Apresentação HTML:** os formatadores estruturam cabeçalhos, tabelas e conteúdo para o Teams. A aparência pode variar entre clientes do Teams.
- **Entrega:** os dois ramos possuem nós próprios de envio. Os exemplos são evidências históricas; o template público continua inativo e com os envios desabilitados.

Os números dos dois formatos pertencem a execuções e regras distintas. Não substituem uma auditoria dos dados do Planner. As menções a tempos de atualização e previsão de entrega no texto histórico retratam o conteúdo daquela mensagem, não benchmarks verificados nesta publicação.

[Voltar ao projeto](../README.md)
