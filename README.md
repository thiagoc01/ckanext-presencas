
# ckanext-presencas

Extensão utilizada para o CKAN do Projeto Presenças. Ela adiciona alguns filtros como cidade, estado, cidade de atuação e outros no campo de procura dos datasets. Além disso, adiciona um filtro especial de range para a data de início dos artistas que representam os datasets.


## Requerimentos

- cssutils
- dateutil

Compatibilidade com versões do CKAN:

| Versão    | Compatível?   |
| --------------- | ------------- |
| 2.6 e anterior | não testado    |
| 2.7             | não testado   |
| 2.8             | não testado   |
| 2.10             | testado   |


## Installation

1. Ative o venv do CKAN:

    . /usr/lib/ckan/default/bin/activate

2. Clone o código-fonte:

```bash
git clone https://github.com/thiagoc01/ckanext-presencas.git
cd ckanext-presencas
pip install -e .
pip install -r requirements.txt
```

3. Adicione `presencas` em `ckan.plugins` no seu arquivo de configuração do CKAN.

4. Reinicie o CKAN.

## Licença

[AGPL](https://www.gnu.org/licenses/agpl-3.0.en.html)
