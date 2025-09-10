#!/usr/bin/env node

import { execSync } from "child_process";
import readline from "readline";

// Cores para terminal
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, description) {
  try {
    log(`\n🔄 ${description}...`, "blue");
    const output = execSync(command, { encoding: "utf8", stdio: "pipe" });
    log(`✅ ${description} concluído`, "green");
    return output;
  } catch (error) {
    log(`❌ Erro em: ${description}`, "red");
    log(error.message, "red");
    throw error;
  }
}

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  log("\n🚀 AnimeHub - Commit Helper Interativo", "cyan");
  log("=====================================", "cyan");

  try {
    // Verificar branch atual
    const currentBranch = execSync("git branch --show-current", {
      encoding: "utf8",
    }).trim();
    log(`📍 Branch atual: ${currentBranch}`, "yellow");

    // Verificar se há mudanças
    try {
      execSync("git diff --quiet && git diff --cached --quiet");
      log("⚠️  Não há mudanças para commit", "yellow");
      process.exit(0);
    } catch {
      // Há mudanças para commit
    }

    // Mostrar status
    log("\n📋 Arquivos modificados:", "blue");
    const status = execCommand("git status --short", "Verificando status");
    console.log(status);

    // Tipos de commit disponíveis
    const commitTypes = [
      { key: "1", type: "feat", desc: "✨ Nova funcionalidade" },
      { key: "2", type: "fix", desc: "🐛 Correção de bug" },
      { key: "3", type: "docs", desc: "📝 Documentação" },
      { key: "4", type: "style", desc: "💄 Estilo/formatação" },
      { key: "5", type: "refactor", desc: "♻️  Refatoração" },
      { key: "6", type: "test", desc: "🧪 Testes" },
      { key: "7", type: "chore", desc: "🔧 Manutenção" },
      { key: "8", type: "perf", desc: "⚡ Performance" },
    ];

    log("\n📝 Escolha o tipo de commit:", "blue");
    commitTypes.forEach(({ key, type, desc }) => {
      log(`${key}. ${desc} (${type})`, "cyan");
    });

    const typeChoice = await askQuestion("\nDigite o número do tipo (1-8): ");
    const selectedType = commitTypes.find((t) => t.key === typeChoice);

    if (!selectedType) {
      log("❌ Opção inválida", "red");
      process.exit(1);
    }

    // Pedir descrição do commit
    const description = await askQuestion("\n💬 Descrição do commit: ");

    if (!description.trim()) {
      log("❌ Descrição é obrigatória", "red");
      process.exit(1);
    }

    // Montar mensagem de commit
    const commitMessage = `${selectedType.type}: ${description.trim()}`;
    log(`\n📝 Mensagem final: ${commitMessage}`, "yellow");

    // Confirmar antes de executar
    const confirm = await askQuestion("\n❓ Confirma o commit? (s/N): ");

    if (confirm.toLowerCase() !== "s" && confirm.toLowerCase() !== "sim") {
      log("❌ Operação cancelada", "yellow");
      process.exit(0);
    }

    // Executar comandos git
    execCommand("git add .", "Adicionando arquivos");
    execCommand(`git commit -m "${commitMessage}"`, "Fazendo commit");

    // Perguntar sobre push
    const shouldPush = await askQuestion(
      "\n🌐 Fazer push para GitHub? (S/n): "
    );

    if (
      shouldPush.toLowerCase() !== "n" &&
      shouldPush.toLowerCase() !== "não"
    ) {
      execCommand(`git push origin ${currentBranch}`, "Enviando para GitHub");
      log(
        `\n🎉 Commit enviado com sucesso para origin/${currentBranch}!`,
        "green"
      );
    } else {
      log("\n✅ Commit local realizado (sem push)", "yellow");
    }
  } catch (error) {
    log("\n💥 Erro durante o processo:", "red");
    log(error.message, "red");
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Executar apenas se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
