# MediQuick Pharmacy (Kurunegala)

> **Live System on GitHub Pages:** [https://paminduh465-max.github.io/MediQuick/](https://paminduh465-max.github.io/MediQuick/)  
> **Repository:** [https://github.com/paminduh465-max/MediQuick](https://github.com/paminduh465-max/MediQuick)

MediQuick Pharmacy is an online pharmacy management platform designed for Kurunegala, Sri Lanka. It provides customer ordering, prescription verification complying with the National Medicines Regulatory Authority (NMRA) Act No. 5 of 2015, multi-role staff dashboards (Pharmacist, Inventory, Delivery), administrative controls, and an academic project specification report.

---

## 🚀 GitHub Pages Deployment (Fixing 404 / Blank Screen)

If `https://paminduh465-max.github.io/MediQuick/` was previously showing a 404 or blank white screen, or if GitHub Actions Run #1 failed:

### Why GitHub Actions Run #1 Failed & What Was Fixed:
1. **Missing Lockfile in `setup-node` cache:** The previous workflow configured `cache: 'npm'`, which crashes with `Dependencies lock file is not found` if `package-lock.json` is not committed. We generated `package-lock.json` and removed the rigid cache constraint so the step always passes.
2. **Dual Deployment Support:** GitHub repositories default to `Deploy from a branch` rather than `GitHub Actions`. The updated workflow now automatically pushes the compiled bundle to the `gh-pages` branch **and** attempts direct GitHub Pages deployment, ensuring successful hosting regardless of repository settings.
3. **Workflow Permissions:** Added `contents: write`, `pages: write`, and `id-token: write` permissions required for Pages deployment and branch publishing.

### How to Deploy (Choose Either Option):

#### Option A: Automatic via GitHub Actions (Recommended)
1. In your GitHub repo (`https://github.com/paminduh465-max/MediQuick`), go to **Settings** > **Pages**.
2. Under **Build and deployment > Source**:
   - If you select **GitHub Actions**: The workflow will deploy directly.
   - If you select **Deploy from a branch**: Select branch **`gh-pages`** and folder **`/ (root)`** and click Save.
3. In your repo's **Actions** tab, click on the **Deploy to GitHub Pages** workflow and click **Run workflow** (or simply push a new commit).
4. The live site will be ready at:  
   **[https://paminduh465-max.github.io/MediQuick/](https://paminduh465-max.github.io/MediQuick/)**

#### Option B: Deploy from Command Line via npm
```bash
npm install
npm run deploy
```
This builds the application and pushes the compiled `dist/` directory to your repository's `gh-pages` branch automatically. In GitHub **Settings > Pages**, set **Source** to **Deploy from a branch** (`gh-pages` / `root`).

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
