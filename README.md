🧾 Vendor Bill Automation System (GPT + OCR + NetSuite)

An end-to-end, cloud-native automation pipeline that processes vendor invoices using AI and posts them to Oracle NetSuite — fully orchestrated via n8n, deployed in Docker on Google Cloud.

📌 This system parses emails, reads invoices via OCR, uses GPT to extract structured data, validates vendor POs, and posts vendor bills — autonomously.

🚀 What This Solves

Manually processing vendor invoices is:

🕐 Time-consuming

😵‍💫 Prone to error

🧾 Inconsistent across vendors

This system:

Monitors an inbox for incoming invoices

Uses Google OCR + GPT to extract structured data

Posts valid bills directly into Oracle NetSuite

Flags errors, invalid POs, and sends daily email reports

Logs everything to Google Sheets for transparency

🧠 Architecture
Layer	Tech
Workflow Engine	n8n (Dockerized)
PDF OCR	Google Cloud Vision
Data Extraction	OpenAI GPT
ERP Integration	Oracle NetSuite REST API
Inbox Monitor	Microsoft Graph API (Outlook)
Reporting / Logs	Google Sheets API
Infra	GCP VM, Docker, Nginx, Certbot
🗂️ Folder Overview
vendor-bill-automation/
├── workflows/              # n8n JSON exports
├── docker/                 # Docker + Nginx configs
├── config/                 # .env examples, secrets (excluded)
├── certbot/                # SSL (auto-renewal setup)
├── docs/                   # Architecture & setup guides
└── scripts/                # Optional CLI tools (for setup)

🛠️ How to Deploy It
1. Provision GCP VM

OS: Ubuntu 20.04+

Open ports: 80, 443, 5678

Install Docker stack:

sudo apt update && sudo apt install docker.io docker-compose -y

2. Clone & Configure
git clone https://github.com/your-username/vendor-bill-automation.git
cd vendor-bill-automation
cp config/.env.example .env  # Edit with your real values

3. Start It Up
docker-compose -f docker/docker-compose.yml up -d

4. Access n8n

Visit: https://yourdomain.com
Login: admin / your_password
Then import workflows from the /workflows folder.

🔁 Included Workflows
Workflow Name	Purpose
vendorbill-creation.json	Main automation: inbox → GPT → NetSuite
vendorbill-release.json	Auto-releases invoices placed on hold
truth-sheet-builder.json	Parses NetSuite reports into Sheets
invalid-po-report.json	Daily email report for unmatched POs
⚙️ Environment Setup

Defined in .env.example, covering:

Postgres DB settings

n8n credentials

Microsoft Graph / GCP / OpenAI / NetSuite API keys

⚠️ Do not commit your real .env file

📬 Integration Notes

Microsoft 365: App registration + OAuth2 for inbox

Google Cloud: Enable Sheets, Vision, GCS, create service account

NetSuite: Token-based auth or OAuth setup required

GPT: Uses OpenAI API with a system prompt for invoice parsing

🔐 Security & Recovery

Your setup can be restored in 5 steps:

Spin up a new VM

Reinstall Docker + pull this repo

Recreate .env and mount /n8n-data if you saved backups

Run Docker

Re-import workflows

You’re live again.

📦 Example Git Commands (initial push)
cd vendor-bill-automation
git init
git remote add origin https://github.com/YOUR-USERNAME/vendor-bill-automation.git
git add .
git commit -m "Initial commit: vendor invoice automation POC"
git push -u origin main

🙋‍♂️ Author

Built by: Nicolas D.
GitHub: @ndominguez2019

Available for feedback, freelance, or full-time roles.

💬 Final Notes

This is an open-source proof-of-concept to show how far automation can go when you blend cloud infra + AI + ERP APIs.
It’s modular, extensible, and designed to be cloned, forked, and improved.

🌟 If you’d use this in production or want to collaborate — let’s talk.
