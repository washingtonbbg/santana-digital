# Sant'Ana Digital

**Memorial Cultural da Festa de Sant'Ana da Família Barros**  
Várzea Grande — Mato Grosso (MT)

---

## Identificação do projeto

| Campo | Informação |
|-------|------------|
| **Título** | Sant'Ana Digital — Memorial Cultural |
| **Modalidade** | Projeto de Extensão Universitária |
| **Curso** | CST em Análise e Desenvolvimento de Sistemas (ADS) |
| **Área de atuação** | Tecnologia da Informação aplicada à preservação cultural |
| **Local de referência** | Várzea Grande-MT |
| **Tipo de solução** | Sistema web estático (memorial digital / catálogo cultural) |

---

## Apresentação

O **Sant'Ana Digital** é um sistema web desenvolvido no âmbito de um **Projeto de Extensão** do curso de **Análise e Desenvolvimento de Sistemas**, com o propósito de **preservar, organizar e divulgar a memória cultural** da **Festa de Sant'Ana da Família Barros**, tradição religiosa, familiar e comunitária realizada em **Várzea Grande-MT**.

A proposta parte do reconhecimento de que manifestações culturais locais, transmitidas oralmente entre gerações, correm o risco de se perderem quando não são devidamente registradas. O memorial digital reúne, em um único ambiente acessível, informações históricas, linha do tempo, registros visuais, depoimentos, programação da festa e um espaço simbólico de cápsula do tempo, contribuindo para a valorização do patrimônio cultural imaterial da família e da comunidade.

---

## Justificativa

A Festa de Sant'Ana da Família Barros representa mais do que uma celebração religiosa: é uma **manifestação de identidade cultural**, de convivência intergeracional e de preservação de costumes familiares. Ao longo dos anos, memórias, fotografias, relatos e documentos foram acumulados de forma dispersa — em álbuns, conversas e registros pessoais — dificultando o acesso e a continuidade dessa história para as novas gerações.

Diante desse contexto, faz-se necessário um instrumento que:

- Organize e centralize informações sobre a tradição;
- Facilite a consulta por familiares, pesquisadores e comunidade;
- Estimule o registro de novas memórias;
- Demonstre como a tecnologia pode apoiar a preservação cultural local.

O presente projeto responde a essa demanda, articulando **formação acadêmica em ADS** com **impacto social** por meio da extensão universitária.

---

## Objetivos

### Objetivo geral

Desenvolver um memorial digital para **preservar e divulgar a memória cultural** da Festa de Sant'Ana da Família Barros, em Várzea Grande-MT, utilizando recursos de desenvolvimento web front-end.

### Objetivos específicos

- Registrar marcos históricos da tradição por meio de linha do tempo interativa;
- Disponibilizar galeria de memórias e depoimentos da comunidade;
- Apresentar a programação e os momentos centrais da festa;
- Oferecer a Cápsula do Tempo Digital como espaço simbólico de registro para futuras gerações;
- Implementar busca simples para facilitar a navegação no conteúdo;
- Garantir acesso responsivo em dispositivos móveis, tablets e computadores;
- Relacionar a iniciativa à preservação do patrimônio cultural, em consonância com a **ODS 11, Meta 11.4**.

---

## Contexto cultural

A Festa de Sant'Ana da Família Barros é uma tradição **cultural, religiosa e familiar** que atravessa gerações em Várzea Grande-MT. Marcada pela devoção à padroeira, pela reunião de parentes e amigos, pela memória oral e pela continuidade de costumes, a celebração expressa pertencimento, fé e cuidado com o legado dos antepassados.

Entre os marcos mais significativos da tradição destacam-se:

- O início da celebração familiar em honra a Sant'Ana (1911);
- A comemoração do centenário da festa e a criação de uma cápsula do tempo (2011);
- A abertura simbólica da cápsula após 14 anos (2025);
- A proposta de manter viva a tradição com novos registros para o futuro.

O Sant'Ana Digital nasce como resposta acadêmica e comunitária à necessidade de **salvaguardar essa memória** de forma organizada e acessível.

---

## Público-alvo

- Descendentes e integrantes da Família Barros;
- Organizadores e participantes da festa;
- Comunidade de Várzea Grande-MT;
- Pesquisadores e estudantes interessados em patrimônio cultural local;
- Público geral interessado em tradições familiares e manifestações culturais.

---

## Metodologia de desenvolvimento

O sistema foi construído com abordagem de **desenvolvimento web front-end**, priorizando simplicidade, leveza e facilidade de manutenção, sem dependência de frameworks ou infraestrutura de backend. A metodologia incluiu:

1. **Levantamento de conteúdo** — história, marcos temporais, programação e relatos;
2. **Modelagem da informação** — organização em seções temáticas e arquivos JSON;
3. **Prototipação da interface** — layout responsivo com identidade visual acolhedora;
4. **Implementação** — HTML semântico, CSS responsivo e JavaScript para interatividade;
5. **Validação** — testes de responsividade, acessibilidade básica e funcionamento local;
6. **Publicação** — preparação para hospedagem estática no GitHub Pages.

---

## Tecnologias utilizadas

| Tecnologia | Aplicação no projeto |
|------------|----------------------|
| **HTML5** | Estrutura semântica e acessível das seções |
| **CSS3** | Layout responsivo, identidade visual e animações |
| **JavaScript (ES6+)** | Carregamento de dados, busca, formulário e localStorage |
| **JSON** | Armazenamento externo de linha do tempo, depoimentos e galeria |
| **GitHub Pages** | Hospedagem estática do memorial digital |

Não há dependência de npm, frameworks JavaScript ou banco de dados. O projeto foi pensado para funcionar de forma autônoma e de fácil reprodução em ambiente acadêmico.

---

## Estrutura do repositório

```
santana-digital/
│
├── index.html              # Página principal do memorial
├── style.css               # Folha de estilos
├── script.js               # Lógica e interatividade
├── README.md               # Documentação do projeto
├── .nojekyll               # Configuração para GitHub Pages
│
├── dados/
│   ├── linha-do-tempo.json # Marcos históricos da festa
│   ├── depoimentos.json    # Relatos da comunidade
│   └── galeria.json        # Registros visuais
│
└── imagens/
    └── README.txt          # Orientações para inclusão de fotos
```

---

## Funcionalidades do sistema

| Módulo | Descrição |
|--------|-----------|
| **Hero e navegação** | Apresentação do memorial e menu responsivo com rolagem suave |
| **Sobre a tradição / História** | Contextualização cultural e origem da festa |
| **Linha do tempo** | Marcos históricos carregados de `dados/linha-do-tempo.json` |
| **Programação** | Cards com novena, missa, chá com bolo, encontro familiar e demais momentos |
| **Galeria de memórias** | Exibição responsiva com placeholders ou imagens reais |
| **Depoimentos** | Relatos carregados de `dados/depoimentos.json` |
| **Cápsula do Tempo Digital** | Formulário simbólico com persistência via `localStorage` |
| **Busca** | Pesquisa por palavras-chave em todo o conteúdo indexado |
| **Referências** | Espaço para fontes bibliográficas e documentais da pesquisa |

---

## Resultados esperados

- Disponibilização de um memorial digital acessível à família e à comunidade;
- Organização centralizada de informações antes dispersas;
- Estímulo ao registro contínuo de memórias e depoimentos;
- Demonstração prática da aplicação de ADS em projetos de impacto social;
- Contribuição para a preservação do patrimônio cultural imaterial local.

---

## Extensão universitária e ODS 11

Este projeto insere-se na política de **extensão universitária**, eixo que articula ensino, pesquisa e intervenção na realidade social. Ao aplicar competências de análise e desenvolvimento de sistemas em favor da memória cultural de Várzea Grande-MT, o Sant'Ana Digital exemplifica como a formação técnica em ADS pode gerar soluções concretas para demandas comunitárias.

A iniciativa está alinhada ao **Objetivo de Desenvolvimento Sustentável 11 (ODS 11) — Cidades e Comunidades Sustentáveis**, especialmente à **Meta 11.4**:

> *Fortalecer esforços para proteger e salvaguardar o patrimônio cultural e natural do mundo.*

---

## Como executar localmente

### Opção 1 — Abrir diretamente no navegador

1. Clone ou baixe este repositório;
2. Abra o arquivo `index.html` no navegador.

> **Observação acadêmica/técnica:** ao abrir via protocolo `file://`, o navegador pode bloquear o carregamento dos arquivos JSON (restrição CORS). Nesse caso, o sistema utiliza **dados de fallback** embutidos em `script.js`, mas recomenda-se a Opção 2 para validação completa.

### Opção 2 — Live Server (recomendado)

1. Abra a pasta do projeto no **VS Code** ou **Cursor**;
2. Instale a extensão **Live Server**;
3. Clique com o botão direito em `index.html` → **Open with Live Server**;
4. Acesse o endereço local exibido (ex.: `http://127.0.0.1:5500`).

### Opção 3 — Servidor Python

```bash
python -m http.server 8080
```

Acesse `http://localhost:8080` no navegador.

---

## Publicação no GitHub Pages

Para disponibilizar o memorial online:

1. Envie os arquivos para um repositório no GitHub;
2. Acesse **Settings** → **Pages**;
3. Em **Source**, selecione a branch `main` e a pasta `/ (root)`;
4. Aguarde a publicação (alguns minutos);
5. O site ficará acessível em: `https://seu-usuario.github.io/santana-digital/`

O arquivo `.nojekyll` na raiz garante compatibilidade com a hospedagem estática do GitHub Pages.

---

## Atualização de conteúdo

### Arquivos JSON (`dados/`)

| Arquivo | Campos editáveis |
|---------|------------------|
| `linha-do-tempo.json` | `ano`, `titulo`, `descricao` |
| `depoimentos.json` | `nome`, `vinculo`, `texto` |
| `galeria.json` | `titulo`, `descricao`, `ano`, `imagem` |

### Inclusão de imagens reais

1. Salve as fotos na pasta `imagens/`;
2. Atualize o campo `"imagem"` em `dados/galeria.json`:

```json
{
  "titulo": "Foto antiga da família",
  "descricao": "Registro histórico da Família Barros.",
  "ano": "1950",
  "imagem": "imagens/familia-antiga.jpg"
}
```

Se `"imagem"` estiver vazio, o sistema exibe um placeholder visual até que a foto seja incluída.

### Textos institucionais

Seções como *Sobre a tradição*, *História* e *Importância cultural* podem ser editadas diretamente no `index.html`.

---

## Considerações finais

O Sant'Ana Digital constitui uma **proposta viva de extensão** que une tecnologia e memória cultural. Trata-se de um ponto de partida: o memorial pode ser ampliado com novos depoimentos, fotografias, documentos e integrações futuras (como formulário online ou banco de dados), conforme a participação da família e da comunidade.

A preservação da Festa de Sant'Ana da Família Barros é responsabilidade coletiva — e a tecnologia, quando aplicada com sensibilidade cultural, pode ser uma aliada poderosa nesse processo.

---

## Créditos

**Sant'Ana Digital — Memorial Cultural**  
Projeto de Extensão — CST em Análise e Desenvolvimento de Sistemas  
Várzea Grande-MT

*Projeto acadêmico de extensão — uso educacional, comunitário e cultural.*
