# Beginner's Guide - How to Test the Classification Wizard

## Step 1: Check You Have Everything

Run this command to see all your files:

```bash
ls -la
```

You should see:
- ✅ `main.go` - The source code
- ✅ `classification-wizard` - Ready-to-run program
- ✅ `README.md` - Documentation

## Step 2: Run the Wizard (Choose One Method)

### Method A: Use the Pre-Built Executable (Easiest!)

```bash
./classification-wizard
```

### Method B: Run with Go

```bash
go run main.go
```

## Step 3: Try These Test Scenarios

### Test Scenario 1: Brand New Worker (First Day)

**The Situation:**
- A person who has NEVER worked in construction before
- Starting their first day on a building site
- No qualifications

**How to Answer the Questions:**

1. **Worker Type?** → Type `1` and press Enter
   - (1 = General building and construction)

2. **New to industry?** → Type `Y` and press Enter
   - (Y = Yes, they're new)

3. **Months experience?** → Type `0` and press Enter
   - (0 = Starting today)

**Expected Result:**
- Classification: **CW/ECW 1 (Level a)**
- Rate: **$967.50/week** or **$25.46/hour**
- Plus $64.10/week industry allowance
- **Total: $1,031.60/week**

---

### Test Scenario 2: Qualified Carpenter

**The Situation:**
- Completed carpentry apprenticeship
- Has trade certificate
- 5 years experience

**How to Answer:**

1. **Worker Type?** → Type `1` and press Enter
2. **New to industry?** → Type `N` and press Enter (N = No, experienced)
3. **Qualifications?** → Type `3` and press Enter
   - (3 = Completed trade apprenticeship)

**Expected Result:**
- Classification: **CW/ECW 3**
- Rate: **$1,068.40/week** or **$28.12/hour**
- Plus $64.10/week industry allowance
- **Total: $1,132.50/week**

---

### Test Scenario 3: Experienced Laborer (No Formal Quals)

**The Situation:**
- Worked construction for 2 years
- No formal qualifications
- Completed 16 training modules

**How to Answer:**

1. **Worker Type?** → Type `1` and press Enter
2. **New to industry?** → Type `N` and press Enter
3. **Qualifications?** → Type `1` and press Enter
   - (1 = No formal construction qualifications)
4. **Completed Skills Test?** → Type `Y` and press Enter
   - (Y = Yes, completed 16 modules)

**Expected Result:**
- Classification: **CW/ECW 1 (Level d)**
- Rate: **$967.50/week** or **$25.46/hour**
- Plus industry allowance

---

### Test Scenario 4: Advanced Electrician

**The Situation:**
- Trade qualified electrician
- Plus 6 additional post-trade modules
- Works on complex systems

**How to Answer:**

1. **Worker Type?** → Type `3` and press Enter
   - (3 = Engineering construction)
2. **New to industry?** → Type `N` and press Enter
3. **Qualifications?** → Type `5` and press Enter
   - (5 = Trade PLUS 6 additional modules)

**Expected Result:**
- Classification: **CW/ECW 5**
- Rate: **$1,118.40/week** or **$29.43/hour**
- Plus industry allowance

---

## Step 4: Try It Yourself!

Now run the wizard yourself and make up your own scenario:

```bash
./classification-wizard
```

Just answer the questions as they appear!

## What the Wizard Tells You

After answering the questions, you'll see:

1. **Classification Level** - e.g., CW/ECW 3
2. **Description** - What this level means
3. **Minimum Rates** - Weekly and hourly pay
4. **Key Duties** - What work they should do
5. **Next Steps** - How to progress to higher level
6. **Important Notes** - Industry allowances and verification

## Understanding the Output

### Minimum Rates
The rates shown are BASE rates. You MUST add industry allowance:

**Example for Level 3 Tradesperson:**
- Base weekly rate: $1,068.40
- Industry allowance: $64.10
- **TOTAL MINIMUM: $1,132.50/week**

### Classification Levels Quick Reference

| Level | Who | Base Weekly Rate |
|-------|-----|------------------|
| 1(a) | New worker - day 1 | $967.50 |
| 1(b) | New worker - 3 months | $967.50 |
| 1(c) | New worker - 12 months | $967.50 |
| 1(d) | Basic skills/training | $967.50 |
| 2 | Intermediate worker | $1,016.30 |
| 3 | Tradesperson | $1,068.40 |
| 4 | Advanced tradesperson | $1,098.40 |
| 5 | Special class I | $1,118.40 |
| 6 | Special class II | $1,143.30 |

**Remember:** Add $64.10/week industry allowance to all rates!

## Common Questions

### Q: Can I run this multiple times?
**A:** Yes! Run it as many times as you want to test different scenarios.

### Q: Does it save my answers?
**A:** No, it's just a tool to help you determine classification. You need to record the results yourself.

### Q: What if I make a mistake?
**A:** Just start over! Press `Ctrl+C` to exit and run it again.

### Q: How do I see the code?
**A:** Use this command:
```bash
cat main.go
```

### Q: Can I modify the code?
**A:** Yes! Edit `main.go` with any text editor:
```bash
nano main.go
# or
vim main.go
```

Then rebuild:
```bash
go build -o classification-wizard main.go
```

## Quick Test Command

To run all test scenarios at once:

```bash
./test-wizard.sh
```

This will automatically test:
1. New worker scenario
2. Qualified carpenter scenario

## Need Help?

1. **Read the detailed guide:**
   ```bash
   cat CLASSIFICATION_GUIDE.md
   ```

2. **Read the README:**
   ```bash
   cat README.md
   ```

3. **Check the award document:**
   ```bash
   cat awards.fairwork.gov.au_MA000020.html.2025-10-22T03_25_39.376Z.md
   ```

## Next Steps

1. ✅ Try running the wizard with the test scenarios above
2. ✅ Create your own scenarios based on your actual workers
3. ✅ Read CLASSIFICATION_GUIDE.md for detailed explanations
4. ✅ Keep the results to properly classify and pay your workers

---

**You're all set!** Just run `./classification-wizard` and follow the prompts. 🚀
