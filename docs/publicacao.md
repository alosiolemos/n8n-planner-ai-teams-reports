# O que foi alterado para publicação

- Mantidos os 51 nós e suas conexões.
- Removidas referências de credenciais, IDs de webhook, metadados de instância e referência de workflow de erro.
- Substituídos segredos, tokens e identificadores internos por marcadores.
- Preservadas correspondências entre IDs usados em URLs e mapas.
- Novos identificadores técnicos locais dos nós, sem reutilizar os originais.
- Workflow inativo, sem dados fixados e com ambos os envios Teams desabilitados.
- Fuso público definido como America/Sao_Paulo.
- Identidade e endereços de e-mail adaptados quando presentes no texto.
- Export original mantido sem alterações.

A estrutura pode ser importada como template JSON, mas requer configuração e verificação de compatibilidade. Não foi testada numa instância n8n.

A checagem de publicação comparou os artefatos a valores sensíveis identificados em memória. O relatório não guarda esses valores. Isso não equivale a uma auditoria integral do código.

O estado active do export não foi interpretado como comprovação de execução atual em produção.
