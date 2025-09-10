# Script PowerShell para automatizar commits no AnimeHub
# Uso: .\auto-commit.ps1 "mensagem do commit"

param(
    [Parameter(Mandatory=$true)]
    [string]$CommitMessage
)

# Cores para output
$Green = "Green"
$Blue = "Cyan"
$Red = "Red"
$Yellow = "Yellow"

Write-Host "🚀 AnimeHub - Auto Commit Script" -ForegroundColor $Blue
Write-Host "==================================" -ForegroundColor $Blue

$Branch = git branch --show-current
Write-Host "📍 Branch atual: $Branch" -ForegroundColor $Yellow
Write-Host "💬 Mensagem: $CommitMessage" -ForegroundColor $Yellow
Write-Host ""

# Verificar se há mudanças para commit
$hasChanges = -not (git diff --quiet; $LASTEXITCODE -eq 0) -or -not (git diff --cached --quiet; $LASTEXITCODE -eq 0)

if (-not $hasChanges) {
    Write-Host "⚠️  Não há mudanças para commit" -ForegroundColor $Yellow
    exit 0
}

# Mostrar status antes do commit
Write-Host "📋 Status atual:" -ForegroundColor $Blue
git status --short
Write-Host ""

# Adicionar todos os arquivos
Write-Host "📦 Adicionando arquivos..." -ForegroundColor $Blue
git add .

# Fazer commit
Write-Host "💾 Fazendo commit..." -ForegroundColor $Blue
git commit -m $CommitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit realizado com sucesso" -ForegroundColor $Green
} else {
    Write-Host "❌ Erro no commit" -ForegroundColor $Red
    exit 1
}

# Push para remote
Write-Host "🌐 Enviando para GitHub..." -ForegroundColor $Blue
git push origin $Branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 Push realizado com sucesso!" -ForegroundColor $Green
    Write-Host "📍 Commit enviado para: origin/$Branch" -ForegroundColor $Green
} else {
    Write-Host "❌ Erro no push" -ForegroundColor $Red
    exit 1
}

Write-Host ""
Write-Host "✨ Processo concluído com sucesso!" -ForegroundColor $Green