# CW/ECW Worker Classification Wizard - Next.js Version

A beautiful, interactive web app to help business owners and HR professionals correctly determine worker classification levels under the **Building and Construction General On-site Award [MA000020]**.

## 🎯 What This Does

This wizard guides you through classifying construction workers (CW) and engineering construction workers (ECW) with an easy-to-use web interface.

## ✨ Features

- ✅ **Beautiful Web Interface** - Modern, responsive design using Tailwind CSS
- ✅ **Step-by-Step Wizard** - Clear, guided process
- ✅ **Interactive Form** - Real-time feedback and validation
- ✅ **All Classification Levels** - Handles Levels 1-6 (including 1a, 1b, 1c, 1d)
- ✅ **Instant Results** - Immediate classification with rates and duties
- ✅ **Mobile Friendly** - Works on desktop, tablet, and phone
- ✅ **No Installation Required** - Just need Node.js (which you probably already have!)

## 🚀 Quick Start for Windows

### Step 1: Check if You Have Node.js

Open PowerShell and type:

```powershell
node --version
```

If you see a version number (like `v18.x.x` or `v20.x.x`), great! **Skip to Step 3**.

If you see an error, continue to Step 2.

### Step 2: Install Node.js (if needed)

1. Go to: https://nodejs.org/
2. Download the **LTS version** (recommended for most users)
3. Run the installer (click through the wizard)
4. Close and reopen PowerShell

### Step 3: Navigate to the Project

```powershell
cd C:\Users\mick\Downloads\Chatbot\go\toolbox_go\nextjs-version
```

### Step 4: Install Dependencies

```powershell
npm install
```

This might take 1-2 minutes. It's downloading all the required packages.

### Step 5: Run the Wizard

```powershell
npm run dev
```

### Step 6: Open in Your Browser

Open your web browser and go to:

```
http://localhost:3000
```

**That's it!** The wizard is now running! 🎉

## 📋 Complete Command Summary

```powershell
# Navigate to project
cd C:\Users\mick\Downloads\Chatbot\go\toolbox_go\nextjs-version

# Install dependencies (only needed once)
npm install

# Run the development server
npm run dev

# Open browser to:
# http://localhost:3000
```

## 🎮 How to Use the Wizard

1. **Start the wizard** - Answer questions about the worker
2. **Follow the steps**:
   - Step 1: Select worker type (CW or ECW)
   - Step 2: Industry experience
   - Step 3: Qualifications and training
   - Additional questions based on your answers
3. **Get instant results**:
   - Classification level (e.g., CW/ECW 3)
   - Minimum weekly and hourly rates
   - Key duties for that level
   - Next steps for progression
   - Industry allowance reminders

## 📸 Screenshots

When you run the app, you'll see:
- Clean, professional interface
- Step-by-step wizard with clear options
- Beautiful result page with all classification details
- Important notes about industry allowances
- Easy "Start New Classification" button

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Beautiful, responsive styling
- **React Hooks** - Modern state management

## 📂 Project Structure

```
nextjs-version/
├── app/
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # App layout
│   └── globals.css        # Global styles
├── components/
│   └── ClassificationWizard.tsx  # Main wizard component
├── lib/
│   └── classificationLogic.ts    # Classification business logic
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind CSS config
└── README.md              # This file
```

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run development server (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## 🌐 Accessing from Other Devices

Want to use it on your phone or tablet?

1. Find your computer's IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (something like `192.168.1.100`)

2. Run the dev server:
   ```powershell
   npm run dev
   ```

3. On your phone/tablet, go to:
   ```
   http://YOUR-IP-ADDRESS:3000
   ```
   (Replace YOUR-IP-ADDRESS with the IP from step 1)

## 📊 Classification Levels

| Level | Description | Min Weekly* | Min Hourly* |
|-------|-------------|-------------|-------------|
| 1(a) | New entrant - start | $967.50 | $25.46 |
| 1(b) | New entrant - 3 months | $967.50 | $25.46 |
| 1(c) | New entrant - 12 months | $967.50 | $25.46 |
| 1(d) | Basic skills/training | $967.50 | $25.46 |
| 2 | Intermediate | $1,016.30 | $26.75 |
| 3 | Tradesperson | $1,068.40 | $28.12 |
| 4 | Advanced tradesperson | $1,098.40 | $28.91 |
| 5 | Special class I | $1,118.40 | $29.43 |
| 6 | Special class II | $1,143.30 | $30.09 |

*Rates as of July 1, 2025, **excluding** mandatory industry allowances

## ⚠️ Important: Industry Allowances

The rates shown do NOT include mandatory industry allowances:

- **General building/civil/engineering**: +$64.10/week
- **Residential building**: +$51.28/week

**Example:** A Level 3 tradesperson in general building:
- Base: $1,068.40/week
- Industry allowance: $64.10/week
- **Total minimum**: $1,132.50/week

## 🎨 Customization

Want to change the colors or styling?

Edit `tailwind.config.ts` to customize:
- Colors
- Fonts
- Spacing
- And more!

## 🆘 Troubleshooting

### Problem: "npm is not recognized"

**Solution:** Install Node.js from https://nodejs.org/

### Problem: Port 3000 already in use

**Solution:** Use a different port:
```powershell
npm run dev -- -p 3001
```
Then go to http://localhost:3001

### Problem: Dependencies won't install

**Solution:** Try clearing npm cache:
```powershell
npm cache clean --force
npm install
```

### Problem: Page won't load

**Solution:** Make sure the dev server is running (you should see "✓ Ready" in PowerShell)

## 📱 Mobile Responsive

The wizard works great on:
- ✅ Desktop computers
- ✅ Laptops
- ✅ Tablets
- ✅ Phones

## 🔐 Privacy

- All classification happens in your browser
- No data is sent to external servers
- No login required
- No tracking or analytics

## 📄 Legal Disclaimer

This tool provides guidance based on the Building and Construction General On-site Award [MA000020]. It is intended as an educational and reference tool only.

**This tool does NOT:**
- Constitute legal advice
- Replace professional industrial relations advice
- Override the official award text
- Account for enterprise agreements

**For specific situations, consult:**
- The full award (www.fairwork.gov.au)
- Fair Work Ombudsman
- Qualified industrial relations advisors

## 🤝 Contributing

Found a bug or want to improve the wizard? Contributions welcome!

## 📞 Support

If you need help:
1. Check this README
2. Check the troubleshooting section
3. Open an issue on GitHub

## 🎉 You're All Set!

Now run the wizard:

```powershell
npm run dev
```

Then open: http://localhost:3000

Enjoy classifying workers with a beautiful web interface! 🚀

---

**Developed for compliance with Fair Work Australia Modern Award MA000020**

**Last Updated:** October 2025 (based on award rates effective July 1, 2025)
