Write-Host "🧹 Limpando caches locais do pnpm e node_modules..."
pnpm store prune
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

Write-Host "📦 Limpando cache do Node..."
Remove-Item -Recurse -Force $env:USERPROFILE\AppData\Local\pnpm-store -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $env:USERPROFILE\AppData\Roaming\npm-cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $env:USERPROFILE\AppData\Local\Temp -ErrorAction SilentlyContinue

Write-Host "🔄 Instalando dependências usando lockfile..."
corepack enable
corepack install
pnpm install --frozen-lockfile

Write-Host "[OK] Ambiente sincronizado com o CI do GitHub!"
