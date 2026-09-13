# MediQuick Pharmacy (Kurunegala)

> **Live System on GitHub Pages:** [https://paminduh465-max.github.io/MediQuick/](https://paminduh465-max.github.io/MediQuick/)  
> **Repository:** [https://github.com/paminduh465-max/MediQuick](https://github.com/paminduh465-max/MediQuick)

MediQuick Pharmacy is an online pharmacy management platform designed for Kurunegala, Sri Lanka. It provides customer ordering, prescription verification complying with the National Medicines Regulatory Authority (NMRA) Act No. 5 of 2015, multi-role staff dashboards (Pharmacist, Inventory, Delivery), administrative controls, and an academic project specification report.

---

## 🚀 GitHub Pages Deployment (Fixing 404 / Blank Screen)

If `https://paminduh465-max.github.io/MediQuick/` was previously showing a 404 or blank white screen, this was caused by:
1. **Missing Base Path**: Vite default output was resolving assets from `/assets/` instead of `/MediQuick/assets/` (fixed by adding `base: './'` in `vite.config.ts`).
2. **Missing Build/Publish Workflow**: GitHub Pages serves files only when a build workflow is configured or when the compiled `dist/` directory is published.

### Option 1: Automatic Deployment via GitHub Actions (Recommended)
This repository includes `.github/workflows/deploy.yml` which automatically builds and deploys on every push:
1. Go to your repository on GitHub: `https://github.com/paminduh465-max/MediQuick`
2. Click **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. Push any commit to `main` (or trigger the workflow from the **Actions** tab).
5. The live site will deploy automatically at:  
   **[https://paminduh465-max.github.io/MediQuick/](https://paminduh465-max.github.io/MediQuick/)**

### Option 2: Deploy via CLI using gh-pages
You can also deploy directly using npm:
```bash
npm install
npm run deploy
```
This runs `npm run build` and automatically pushes the contents of `dist/` to the `gh-pages` branch on GitHub. Then in GitHub **Settings > Pages**, set **Source** to **Deploy from a branch** and select `gh-pages` / `root`.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📋 Features & System Architecture

- **Customer Storefront:** Full pharmaceutical catalog with generic search, dosage calculators, and instant cart.
- **Prescription Gate:** Upload and verification workflow for Schedule IV restricted drugs.
- **Pharmacist Verification Desk:** Digital review, drug-interaction notes, and SLMC sign-off.
- **Order Fulfillment & Logistics:** Real-time status pipeline tailored to Kurunegala Municipal limits.
- **Inventory & Batch Tracking:** Expiry warning indicators and batch recall tracking.
- **Administrative Governance:** Audit logs, revenue analytics, and staff roster management.
- **Project Report:** Complete system documentation, site map, and technical architecture.

---

## ⚖️ Compliance & Licensing
Regulated under the NMRA Act No. 5 of 2015 (Sri Lanka).  
Supervised by registered Pharmacist Kasun Senanayake, B.Pharm (SLMC Reg: P8821).
