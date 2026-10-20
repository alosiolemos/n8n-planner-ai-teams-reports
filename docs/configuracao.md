# Importação e configuração

## Primeiro: importar sem ativar

No editor do n8n, use o menu do workflow e Import from File para selecionar [planner-ai-teams.template.json](../workflows/planner-ai-teams.template.json). Consulte a [documentação oficial](https://docs.n8n.io/workflows/export-import/).

Mantenha o workflow inativo e os dois envios Teams desabilitados durante a configuração.

A estrutura JSON e seus vínculos foram conferidos localmente; não houve importação numa instância n8n.

## O que configurar

| Item | Onde observar |
| --- | --- |
| Aplicação / tenant Microsoft | Nós de autenticação e URLs de login |
| Segredos e refresh token | Campos CONFIGURE_*_PRIVATELY; usar credenciais protegidas no ambiente |
| Planos e buckets | URLs de tarefas e mapas nos nós Code |
| Credencial Gemini | Dois nós de modelo, sem referências de credencial no template |
| Destino e OAuth Teams | Dois nós de envio, desabilitados |
| Fuso e horários | Settings e dois Schedule Trigger |

Os marcadores CONFIGURE_ID são consistentes: o mesmo valor fictício representa a mesma referência nas URLs e nos mapas. Veja [a lista de marcadores](parametros-a-configurar.json).

Não são variáveis de ambiente substituídas automaticamente. Troque cada marcador pela configuração equivalente no seu ambiente privado, revisando simultaneamente a URL e o mapa correspondente.

## Credenciais

As referências a credenciais da instância original foram removidas. Os campos de autenticação que existiam diretamente em parâmetros também foram substituídos.

Evite salvar segredos em novos exports. Configure a autenticação nas credenciais apropriadas do n8n quando possível e revise o JSON antes de publicar qualquer adaptação.

A documentação de [tarefas por bucket do Microsoft Graph](https://learn.microsoft.com/en-us/graph/api/plannerbucket-list-tasks?view=graph-rest-1.0) descreve o endpoint e suas permissões. Mensagens, detalhes e envio ao Teams podem exigir permissões diferentes; valide cada chamada.

## Teste em etapas

1. Confira uma consulta de tarefas em ambiente de teste.
2. Valide os nomes de boards/buckets após a normalização.
3. Confira detalhes e checklists pelo mesmo id.
4. Verifique períodos, totais e comentários associados.
5. Valide a saída da IA e a formatação HTML.
6. Só habilite os envios ao configurar um destino de teste e decidir executar a entrega.

Ativar o workflow configura execução recorrente. Este repositório não ativa nada na sua instância.

## Compatibilidade

As versões dos tipos dos nós foram preservadas. Verifique se sua versão do n8n oferece esses tipos e opções, além do modelo Gemini selecionado. O template não instala nós nem garante disponibilidade de APIs.
