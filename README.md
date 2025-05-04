# SpotifyProject

Este é um projeto Angular que consome a API do Spotify. A aplicação permite buscar e visualizar artistas, álbuns e faixas, com funcionalidade de paginação.

## Pré-requisitos

Antes de começar, verifique se você tem os seguintes pré-requisitos instalados:

- [Node.js](https://nodejs.org/) (versão recomendada: LTS)
- [Angular CLI](https://angular.io/cli) (versão recomendada: 16.x)
- Acesso à [API do Spotify](https://developer.spotify.com/dashboard/applications) com `Client ID` e `Client Secret`.

## Passo a Passo para Instalação

1. **Clone o repositório**:

   No terminal, execute o comando abaixo para clonar o repositório:
   
   git clone https://github.com/VitoriaMinotti/SpotifyProject.git
   cd SpotifyProject

2. **Instale as dependências**:

  Após clonar o repositório, instale as dependências necessárias com o comando:
    
    npm install

3. **Configuração do Ambiente**:
  Adicione as variáveis de ambiente para a autenticação com o Spotify:
  
    SPOTIFY_CLIENT_ID=seu-client-id
    SPOTIFY_CLIENT_SECRET=seu-client-secret
  
  Substitua seu-client-id e seu-client-secret pelas credenciais obtidas no Spotify Developer Dashboard.

4. **Inicie o servidor de desenvolvimento**:

  No terminal, execute o comando abaixo para iniciar o servidor local:
  
    ng serve --host 127.0.0.1

5.**Acesse a aplicação**:

  Após o servidor ser iniciado, abra o navegador e acesse a aplicação através do seguinte link:
  
    http://127.0.0.1:4200
  
  Efetue o login em sua conta spotifye esta pronto para uso.

## Funcionalidades
  Busca de artistas: Procure por artistas utilizando o nome.
  Visualização de álbuns: Veja todos os álbuns de um artista específico.
  Busca de faixas: Encontre faixas por palavras-chave.
  Paginação: Navegue pelos resultados de forma paginada.

