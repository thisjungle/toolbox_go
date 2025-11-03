# CW/ECW Worker Classification Wizard

A comprehensive command-line tool to help business owners and HR professionals correctly determine worker classification levels under the **Building and Construction General On-site Award [MA000020]**.

## Overview

This wizard guides you through the classification process for:
- **CW (Construction Workers)** - General building and civil construction
- **ECW (Engineering Construction Workers)** - Engineering construction sectors

The tool is based on the official Fair Work Australia Modern Award MA000020 and implements the classification principles from Schedule A of the award.

## Features

- ✅ **Step-by-step guidance** through the classification process
- ✅ **Intelligent decision tree** based on award requirements
- ✅ **Handles all 8 classification levels** (plus Level 1 sub-levels a-d)
- ✅ **Considers multiple factors**: experience, qualifications, supervision, tasks
- ✅ **Provides current minimum rates** (as of July 1, 2025)
- ✅ **Explains progression pathways** to higher levels
- ✅ **Includes important reminders** about allowances and verification
- ✅ **Based on official award document** with accurate classification criteria

## Quick Start

### Prerequisites
- Go 1.21 or higher

### Installation

```bash
git clone https://github.com/thisjungle/toolbox_go.git
cd toolbox_go
```

### Run the Wizard

```bash
go run main.go
```

Or compile and run:

```bash
go build -o classification-wizard
./classification-wizard
```

## How It Works

The wizard asks a series of questions to determine the correct classification:

### Step 1: Worker Type
Determines if the worker is CW (construction) or ECW (engineering construction)

### Step 2: Industry Experience
Identifies if the worker is:
- New to the construction industry (new entrant pathway)
- Experienced in construction

### Step 3: Qualifications & Training
Assesses:
- Formal qualifications (trade certificates, apprenticeships)
- Training modules completed
- Recognition of Prior Learning (RPL)
- Work experience with competency testing

### Step 4: Skills & Duties
Evaluates:
- Supervision level required
- Ability to interpret plans
- Equipment operation skills
- Quality control capabilities
- Training/supervisory responsibilities

### Result
Provides:
- **Classification level** (e.g., CW/ECW 3)
- **Description** of the level
- **Minimum rates** (weekly and hourly)
- **Key duties** expected at this level
- **Progression pathway** to next level
- **Important reminders** about allowances and verification

## Classification Levels Quick Reference

| Level | Description | Min Weekly* | Min Hourly* |
|-------|-------------|-------------|-------------|
| Level 1(a) | New entrant - start | $967.50 | $25.46 |
| Level 1(b) | New entrant - 3 months | $967.50 | $25.46 |
| Level 1(c) | New entrant - 12 months | $967.50 | $25.46 |
| Level 1(d) | Basic skills/training | $967.50 | $25.46 |
| Level 2 | Intermediate - limited supervision | $1,016.30 | $26.75 |
| Level 3 | Tradesperson | $1,068.40 | $28.12 |
| Level 4 | Advanced tradesperson | $1,098.40 | $28.91 |
| Level 5 | Special class I | $1,118.40 | $29.43 |
| Level 6 | Special class II | $1,143.30 | $30.09 |

*Rates as of July 1, 2025, **excluding** industry allowances

## Important: Industry Allowances MUST Be Added

The rates above do NOT include mandatory industry allowances:

- General building/civil/engineering construction: **+$64.10/week**
- Residential building construction: **+$51.28/week**

**Example**: A Level 3 tradesperson in general building is paid:
- Base: $1,068.40/week
- Industry allowance: $64.10/week
- **Total minimum**: $1,132.50/week

## Documentation

### Comprehensive Guides
- **[CLASSIFICATION_GUIDE.md](CLASSIFICATION_GUIDE.md)** - Detailed explanation of all classification levels, requirements, and principles
- **[awards.fairwork.gov.au_MA000020...md](awards.fairwork.gov.au_MA000020.html.2025-10-22T03_25_39.376Z.md)** - Full award document (reference)

### Key Sections in the Guide
- Classification levels 1-8 explained
- Classification principles (how to determine)
- New entrant pathway
- Supervision levels (general vs limited)
- Skills streams (construction, civil, engineering)
- Common mistakes to avoid
- Reclassification process

## Example Usage

```
$ go run main.go

═══════════════════════════════════════════════════════════════════
   CW/ECW Worker Classification Wizard
   Building and Construction General On-site Award [MA000020]
═══════════════════════════════════════════════════════════════════

This wizard will help you determine the correct classification level
for workers under the Building and Construction General On-site Award.

CW = Construction Worker (General Building & Civil Construction)
ECW = Engineering Construction Worker

───────────────────────────────────────────────────────────────────
STEP 1: Worker Type
───────────────────────────────────────────────────────────────────

What type of work will the employee primarily perform?

  1. General building and construction
  2. Civil construction (earthmoving, plant operation)
  3. Engineering construction (electrical, mechanical, fabrication)

Enter choice (1-3): _
```

## Classification Principles

According to Award Schedule A.3.1, classification must consider:

1. **Nature and skill requirements of the position** - What work will actually be performed?
2. **Skill level and certification** - What qualifications does the employee have?
3. **Experience and qualifications** - Both formal training and verified work experience
4. **Testing procedures** - Competency testing where required

**Important**: Classification is based on the work **actually performed**, not just job titles or qualifications held.

## Common Scenarios

### Scenario 1: Brand New Worker
- Never worked in construction
- No qualifications
- **Result**: CW/ECW 1(a) → progresses to 1(b) after 3 months

### Scenario 2: Experienced Laborer
- 2 years construction experience
- Completed 16 training modules
- Works under general supervision
- **Result**: CW/ECW 1(d)

### Scenario 3: Qualified Carpenter
- Completed carpentry apprenticeship
- 5 years experience
- Works independently
- **Result**: CW/ECW 3 (minimum)

### Scenario 4: Advanced Tradesperson
- Trade qualified electrician
- Plus 6 additional post-trade modules
- Works on complex systems
- **Result**: CW/ECW 5

## Additional Allowances

Beyond base rates and industry allowances, workers may be entitled to:

- **Tool allowances** - For tradespersons providing own tools ($9.50 - $39.60/week)
- **Height allowances** - Multistorey work ($0.73 - $2.14/hour depending on height)
- **Underground allowance** - $19.23/week or $4.27/day
- **Leading hand allowance** - Percentage of standard rate based on team size
- **First aid allowance** - $3.85 - $6.09/day if qualified
- **Special licenses** - E.g., electrician's license $34.19/week

See the full award or CLASSIFICATION_GUIDE.md for complete allowances list.

## Project Structure

```
toolbox_go/
├── main.go                          # Classification wizard application
├── go.mod                           # Go module definition
├── README.md                        # This file
├── CLASSIFICATION_GUIDE.md          # Comprehensive classification guide
└── awards.fairwork.gov.au_...md    # Full award document (reference)
```

## Legal Disclaimer

This tool provides guidance based on the Building and Construction General On-site Award [MA000020]. It is intended as an educational and reference tool only.

**This tool does NOT:**
- Constitute legal advice
- Replace professional industrial relations advice
- Override the official award text
- Account for enterprise agreements that may supersede the award

**For specific situations, consult:**
- The full award text (available at www.fairwork.gov.au)
- Fair Work Ombudsman
- Industry associations
- Qualified industrial relations advisors

## Award Reference

**Award Name**: Building and Construction General On-site Award [MA000020]

**Coverage**: Employers and employees in the on-site building, engineering and civil construction industry

**Key Schedules**:
- Schedule A: Classification Definitions
- Schedule B: Summary of Monetary Allowances
- Schedule C: School-based Apprentices
- Schedule D: National Training Wage

## Contributing

This project is designed to help business owners correctly classify construction workers. If you find any discrepancies with the award or have suggestions for improvement, please open an issue or submit a pull request.

## Support

For questions about:
- **The award**: Contact Fair Work Ombudsman (www.fairwork.gov.au)
- **This tool**: Open an issue on GitHub
- **Classification disputes**: Follow award dispute resolution procedures (Award Clause 39)

## Version History

- **v1.0** (2025) - Initial release with comprehensive classification wizard based on MA000020

## License

This project is provided as-is for educational and reference purposes.

The award text and classification information are sourced from Fair Work Australia and remain subject to their copyright and usage terms.

---

**Developed to support compliance with Fair Work Australia Modern Award MA000020**

**Last Updated**: October 2025 (based on award rates effective July 1, 2025)
