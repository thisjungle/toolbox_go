# SIMPLE TEST - Copy and Paste These Commands

## Test 1: Run the Wizard Interactively

```bash
./classification-wizard
```

Then type these answers when prompted:
1. Type `1` then press Enter (for general building work)
2. Type `Y` then press Enter (new worker)
3. Type `0` then press Enter (0 months experience)

You should see: **CW/ECW 1 (Level a)** with rate **$967.50/week**

---

## Test 2: Test a Qualified Carpenter

```bash
./classification-wizard
```

Then type:
1. Type `1` then press Enter
2. Type `N` then press Enter (NOT new - has experience)
3. Type `3` then press Enter (has trade qualification)

You should see: **CW/ECW 3** with rate **$1,068.40/week**

---

## Test 3: Run Automated Tests

```bash
./test-wizard.sh
```

This runs multiple scenarios automatically!

---

## View the Source Code

```bash
cat main.go
```

or open it in an editor:

```bash
nano main.go
```

---

## All Files You Have

| File | What it is |
|------|------------|
| `main.go` | The Go source code (this is the actual program) |
| `classification-wizard` | Compiled executable (ready to run) |
| `BEGINNER_GUIDE.md` | Detailed step-by-step tutorial |
| `CLASSIFICATION_GUIDE.md` | Classification reference |
| `README.md` | Full documentation |
| `test-wizard.sh` | Automated test script |
| `SIMPLE_TEST.md` | This file - quick tests |

---

## Commands Cheat Sheet

```bash
# Run the wizard
./classification-wizard

# Run automated tests
./test-wizard.sh

# View the code
cat main.go

# Edit the code
nano main.go

# Rebuild after editing
go build -o classification-wizard main.go

# See all files
ls -la

# Read beginner guide
cat BEGINNER_GUIDE.md
```

---

## What the Program Does

It asks you questions like:
- What type of construction work?
- Is the worker new or experienced?
- What qualifications do they have?

Then it tells you:
- What classification level (CW/ECW 1, 2, 3, etc.)
- What minimum wage to pay
- What duties they should perform
- How they can progress to the next level

---

## Try It Now!

Just run this:

```bash
./classification-wizard
```

And answer the questions!

That's it! 🎉
