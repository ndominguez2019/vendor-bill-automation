# 🧾 Vendor Bill Automation System

This is a production-grade automation system for processing vendor invoices, parsing data using GPT and OCR, and posting structured vendor bills into Oracle NetSuite — all orchestrated through n8n workflows, Dockerized on a GCP VM.

---

## 🚀 Overview

This project enables:
- Fetching invoices from Microsoft 365 inbox
- Parsing PDFs using Google Vision OCR + OpenAI GPT
- Validating & posting Vendor Bills to NetSuite
- Scheduled monitoring of on-hold invoices
- Logging and tracking via Google Sheets
- Daily reports for invalid POs and automation QA

---

## 🛠️ Tech Stack

- **n8n** – workflow automation engine
- **Docker Compose** – container orchestration
- **PostgreSQL** – data store for n8n
- **Nginx + Certbot** – reverse proxy + SSL
- **Google Cloud Platform (GCS, Vision, Sheets)**
- **Microsoft Graph API** – email + messaging
- **Oracle NetSuite REST API** – bill posting
- **OpenAI GPT** – invoice data extraction

---

## 📁 Folder Structure

```
vendor-bill-automation/
├── docker/                 # Docker & reverse proxy config
│   └── nginx/
│       └── n8n.conf
├── workflows/              # n8n workflow JSON exports
├── config/                 # Environment variables
│   └── .env.example
├── certbot/                # SSL info (no live certs here)
├── docs/                   # Project setup & architecture docs
├── scripts/                # (Optional) automation scripts
└── .gitignore
```

---

## ⚙️ Setup Instructions

### 1. VM Setup (Google Cloud)
Provision a VM with:
- Ubuntu 20.04+ (recommended)
- Docker + Docker Compose
- Firewall allowing ports 80, 443, 5678

Install:
```bash
sudo apt update && sudo apt install docker.io docker-compose -y
```

### 2. Clone the Repo
```bash
git clone https://github.com/your-org/vendor-bill-automation.git
cd vendor-bill-automation
cp config/.env.example .env  # then edit with real secrets
```

### 3. Run Docker
```bash
docker-compose -f docker/docker-compose.yml up -d
```

### 4. Access n8n
Go to: `https://yourdomain.com`
- Login: `admin / your_password`
- Import workflows from `/workflows`

---

## 🔁 Workflow Documentation

| Workflow Name | Description |
|---------------|-------------|
| `vendorbill-creation.json` | Main automation – fetches invoices, extracts data, posts to NetSuite |
| `vendorbill-release.json` | Monitors "on-hold" invoices and posts when ready |
| `truth-sheet-builder.json` | Ingests NetSuite report emails and syncs Google Sheets |
| `invalid-po-report.json` | Daily report for invoices with no valid PO match |

---

## 🔐 Environment Variables

Defined in `.env.example`, these cover:
- Database credentials
- n8n auth settings
- Timezone
- OAuth credential references

> ⚠️ **Never commit your real `.env` to GitHub**

---

## 📬 Email + API Integrations

- Ensure your Microsoft 365 tenant grants OAuth access to the inbox used.
- Setup GCP service accounts with:
  - Sheets API
  - Vision OCR
  - GCS bucket permissions

---

## ☁️ Disaster Recovery

1. Rebuild your VM
2. Install Docker + Docker Compose
3. Pull this repo from GitHub
4. Restore `.env` and any n8n backups (from `/n8n-data` volume)
5. Re-import workflows
6. You're live again.

---

## 💾 GitHub Push Instructions

```bash
cd /path/to/vendor-bill-automation
git init
git remote add origin https://github.com/YOUR-USERNAME/vendor-bill-automation.git
git add .
git commit -m "Initial commit: vendor bill automation system"
git push -u origin master  # or main
```

Then mark the repo as **private** unless you're ready to share it publicly.

---

## 👋 Contact

Built by: `ndominguez@assureiv.com`  
Maintainer: You 🙂

---

## ✅ You're Backed Up. You're Safe. You're Future-Proof.