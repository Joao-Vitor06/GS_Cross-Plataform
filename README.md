# Central de Monitoramento de Missões Espaciais

*Projeto desenvolvido para a Global Solution da disciplina de Cross-Platform Application Development.*

## Descrição do Projeto

O aplicativo mobile simula um painel de controle tático de uma missão espacial. Desenvolvido em **React Native** e **Expo**, o sistema foca em entregar uma interface funcional, com temática *Dark Mode Sci-Fi*, voltada para o monitoramento de telemetria em tempo real e a validação estrita de dados vitais.

---

### Status do Desenvolvimento

Abaixo está o controle das funcionalidades obrigatórias exigidas e implementadas na arquitetura do aplicativo:

- [x] Dashboards com dados de sensores (Energia, O2, Comunicação e Órbita)
- [x] Alertas automáticos para parâmetros em níveis críticos
- [x] Formulários dinâmicos com validação de entrada de dados
- [x] Navegação fluida em pilha utilizando Expo Router
- [x] Persistência local de dados com AsyncStorage
- [x] Gerenciamento de estado global com Context API
- [ ] ~~Requisitos pendentes~~ (100% Concluído)

---

### Tecnologias e Bibliotecas


| Tecnologia | Aplicação |
| :--- | :---: |
| **React Native / Expo** | Framework de desenvolvimento e compilação |
| **TypeScript** | Tipagem estática e segurança de código |
| **Context API** | Sincronização de estado global |
| **AsyncStorage** | Banco de dados local |
| **Expo Router** | Roteamento baseado em arquivos |
| **Vector Icons** | Identidade visual e iconografia |

---

## Como Rodar o Projeto

Para executar a central de monitoramento localmente, certifique-se de ter o ambiente Node.js configurado e siga os passos rigorosamente:

1. Clone este repositório para a sua máquina local.
2. Acesse a pasta raiz do aplicativo.
3. Instale as dependências.
4. Inicialize o servidor limpando o cache.

```bash
# 1. Clonar o repositório
git clone https://github.com/Joao-Vitor06/GS_Cross-Plataform.git

# 2. Entrar na pasta do projeto
cd gs_cross-plat

# 3. Instalar as dependências do Expo e React Native
npm install

# 4. Inicializar o servidor do Expo limpando o cache
npx expo start -c
```

* **Pressione `a`** no terminal para abrir via emulador Android.
* **Pressione `i`** no terminal para abrir via simulador iOS.
* **Ou escaneie o QR Code** utilizando o aplicativo físico do Expo Go no seu celular.

---

## Guia de Comandos Git Utilizados

Caso precise atualizar ou gerenciar este repositório durante o desenvolvimento, utilize os comandos Git abaixo diretamente no terminal do VS Code:

### Para enviar novas atualizações (Fluxo Diário)
Sempre que alterar arquivos ou códigos do app Expo, salve os arquivos (`Ctrl + S`) e rode:
```bash
git add .
git commit -m "Explique brevemente o que você alterou ou adicionou"
git push origin main
```

### Para limpar o cache (Se arquivos novos não estiverem subindo)
Se o Git parar de rastrear a pasta de códigos ou ignorar arquivos importantes por erro de cache, use:
```bash
git rm -r --cached .
git add -A
git commit -m "Correção e sincronização total do cache do projeto"
git push origin main
```

---

## Equipe Desenvolvedora
* **João Vitor Santana Silva Ribeiro** - RM564693
* **Letícia Gabrielle Andrade Temóteo** - RM563985
* **Stefanny Brum Dos Santos** - RM566216
