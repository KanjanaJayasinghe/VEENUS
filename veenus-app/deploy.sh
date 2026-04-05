 #!/bin/bash
# ─── VEENUS-APP Deploy Script ───
# Builds and deploys to Hostinger VPS
# Usage: ./deploy.sh [--skip-build]

set -e

# ─── Config ───
VPS_USER="root"
VPS_HOST="178.16.137.4"
VPS_PATH="/var/www/html/veenuskleding.com"
BUILD_DIR="out"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   VEENUS-APP Deploy to Hostinger VPS ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
echo ""

# ─── Confirm Deployment ───
echo -e "${YELLOW}Target: ${VPS_USER}@${VPS_HOST}:${VPS_PATH}${NC}"
echo -e "${YELLOW}Domain: veenuskleding.com${NC}"
echo ""
read -p "Deploy veenus-app to production? (y/N): " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo -e "${RED}Deployment cancelled.${NC}"
    exit 0
fi

# ─── Build (unless --skip-build) ───
if [[ "$1" != "--skip-build" ]]; then
    echo ""
    echo -e "${CYAN}[1/3] Building...${NC}"
    npm run build
    echo -e "${GREEN}✓ Build complete${NC}"
else
    echo ""
    echo -e "${YELLOW}[1/3] Skipping build (--skip-build)${NC}"
fi

# ─── Check build output ───
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}Error: Build output directory '${BUILD_DIR}' not found.${NC}"
    exit 1
fi

# ─── Deploy via rsync ───
echo -e "${CYAN}[2/3] Deploying to VPS...${NC}"
rsync -avz --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    "${BUILD_DIR}/" "${VPS_USER}@${VPS_HOST}:${VPS_PATH}/"

echo -e "${GREEN}✓ Files synced${NC}"

# ─── Set permissions ───
echo -e "${CYAN}[3/3] Setting permissions...${NC}"
ssh "${VPS_USER}@${VPS_HOST}" "chown -R www-data:www-data ${VPS_PATH} && chmod -R 755 ${VPS_PATH}"
echo -e "${GREEN}✓ Permissions set${NC}"

echo ""
echo -e "${GREEN}╔══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Deployment complete!                ║${NC}"
echo -e "${GREEN}║   https://veenuskleding.com           ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════╝${NC}"
