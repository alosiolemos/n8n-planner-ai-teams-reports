# Planner → Gemini → Teams: resumos automatizados

Case de automação com **n8n, Microsoft Graph, Planner, Gemini e Microsoft Teams**, complementar ao [dashboard Power BI com interface HTML e IA](https://github.com/alosiolemos/powerbi-planner-html-ai).

O objetivo é organizar atividades, detalhes e atualizações em relatórios recorrentes, reduzindo a necessidade de reunir essas informações manualmente. Não foi quantificada uma economia de horas nesta edição.

## O fluxo

```mermaid
flowchart LR
    A["Dois agendamentos"] --> B["Autenticação Microsoft"]
    B --> C["Tarefas dos buckets"]
    C --> D["Normalização e consolidação"]
    D --> E["Detalhes / checklist / mensagens"]
    E --> F["Indicadores e contexto"]
    F --> G["Agentes com Gemini"]
    G --> H["Formatação HTML"]
    H --> I["Envio ao Teams"]
```

O diagrama resume os dois ramos do workflow; não representa uma única sequência idêntica em ambas as rotinas.

## Entregas disponibilizadas

- Template JSON com a estrutura dos **51 nós**.
- Dois agendamentos e dois agentes conectados a nós Gemini.
- Oito códigos JavaScript extraídos dos nós Code.
- Prompts e documentação das entradas/saídas.
- Marcadores consistentes para planos, buckets, aplicação e destino.
- Explicação do vínculo com o painel Power BI.

## Template para configurar

[Baixar o JSON preparado](workflows/planner-ai-teams.template.json).

**O fluxo está inativo e os dois nós de envio ao Teams estão desabilitados.** Credenciais e identificadores originais foram retirados. O JSON requer configuração e teste em uma instância n8n compatível; a importação no n8n não foi executada nesta preparação.

Não se trata de um export conectado ao ambiente original. O fluxo de origem permaneceu intocado.

## Rotinas identificadas

| Ramo | Agendamento da versão pública | Objetivo |
| --- | --- | --- |
| Acompanhamento | Segunda-feira, 07h30 | Consolidar tarefas, detalhes e mensagens e formatar acompanhamento |
| Fechamento | Sexta-feira, 19h | Calcular indicadores e preparar resumo semanal |

O template fixa America/Sao_Paulo. O export original não informava esse fuso nas configurações; a escolha pública foi explicitada para evitar depender do padrão de outra instância.

Os nomes históricos dos nós foram preservados, mas os dois nós de modelo usam **models/gemini-2.5-pro** nos parâmetros exportados. Um nome de nó contendo 2.5 não determina o modelo sozinho. A disponibilidade do modelo precisa ser validada antes de conectar.

## Documentação

- [Arquitetura e dois ramos](docs/arquitetura.md)
- [Configuração e importação](docs/configuracao.md)
- [Normalização, métricas e relatórios](docs/processamento.md)
- [Inventário de nós](docs/inventario-nos.md)
- [Preparação pública e cuidados de uso](docs/publicacao.md)
- [Verificações realizadas](docs/validacao.md)

## Código e prompts

Os arquivos em [code](code/01-node.js) são corpos de nós Code do n8n e dependem de items, $input e/ou referências a outros nós. Não são scripts de terminal independentes.

Os prompts foram separados em [prompts](prompts/01-agente.md). A resposta gerada precisa de revisão conforme a finalidade; uma hipótese de gargalo ou causa raiz não é uma conclusão comprovada.

## Complemento ao Power BI

O painel permite exploração interativa. O n8n consulta o Graph diretamente e distribui a análise, sem depender de uma leitura do dataset do Power BI no fluxo fornecido.

A integração é do processo operacional e da fonte comum. Esta preparação não executou chamadas de rede nem enviou mensagens.

Código disponibilizado sob [licença MIT](LICENSE), sem dados e marcas de terceiros.
