package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type ClassificationResult struct {
	Level       string
	Description string
	MinWeekly   float64
	MinHourly   float64
	KeyDuties   []string
	NextSteps   string
}

func main() {
	fmt.Println("═══════════════════════════════════════════════════════════════════")
	fmt.Println("   CW/ECW Worker Classification Wizard")
	fmt.Println("   Building and Construction General On-site Award [MA000020]")
	fmt.Println("═══════════════════════════════════════════════════════════════════")
	fmt.Println()
	fmt.Println("This wizard will help you determine the correct classification level")
	fmt.Println("for workers under the Building and Construction General On-site Award.")
	fmt.Println()
	fmt.Println("CW = Construction Worker (General Building & Civil Construction)")
	fmt.Println("ECW = Engineering Construction Worker")
	fmt.Println()

	reader := bufio.NewReader(os.Stdin)

	// Start classification process
	result := determineClassification(reader)

	// Display result
	displayResult(result)
}

func determineClassification(reader *bufio.Reader) ClassificationResult {
	fmt.Println("───────────────────────────────────────────────────────────────────")
	fmt.Println("STEP 1: Worker Type")
	fmt.Println("───────────────────────────────────────────────────────────────────")

	workerType := askMultipleChoice(reader,
		"What type of work will the employee primarily perform?",
		[]string{
			"General building and construction",
			"Civil construction (earthmoving, plant operation)",
			"Engineering construction (electrical, mechanical, fabrication)",
		})

	prefix := "CW"
	if workerType == 3 {
		prefix = "ECW"
	}

	fmt.Println()
	fmt.Println("───────────────────────────────────────────────────────────────────")
	fmt.Println("STEP 2: Industry Experience")
	fmt.Println("───────────────────────────────────────────────────────────────────")

	isNewEntrant := askYesNo(reader,
		"Is this person NEW to the on-site building/construction industry?\n"+
			"(No previous work in construction, no portable long service leave, no industry super)")

	if isNewEntrant {
		return handleNewEntrant(reader, prefix)
	}

	fmt.Println()
	fmt.Println("───────────────────────────────────────────────────────────────────")
	fmt.Println("STEP 3: Qualifications & Training")
	fmt.Println("───────────────────────────────────────────────────────────────────")

	qualLevel := askMultipleChoice(reader,
		"What is the highest relevant qualification/training the employee has?",
		[]string{
			"No formal construction qualifications",
			"Some structured training or modules (less than full trade)",
			"Completed trade apprenticeship or equivalent trade certificate",
			"Trade qualification PLUS 3 additional modules/post-trade training",
			"Trade qualification PLUS 6 additional modules/advanced certificate",
			"Trade qualification PLUS 9+ modules/associate diploma level",
		})

	// Handle based on qualification level
	switch qualLevel {
	case 1:
		return handleNoQualifications(reader, prefix)
	case 2:
		return handlePartialTraining(reader, prefix)
	case 3:
		return handleTrade(reader, prefix)
	case 4:
		return handlePostTrade(reader, prefix, 4)
	case 5:
		return handlePostTrade(reader, prefix, 5)
	case 6:
		return handlePostTrade(reader, prefix, 6)
	default:
		return handleNoQualifications(reader, prefix)
	}
}

func handleNewEntrant(reader *bufio.Reader, prefix string) ClassificationResult {
	fmt.Println()
	fmt.Println("New entrant classification path selected.")
	fmt.Println()

	monthsExp := askNumber(reader,
		"How many months will this employee have worked in the industry\n"+
			"at the time you're classifying them? (0-12+)",
		0, 100)

	if monthsExp == 0 {
		return ClassificationResult{
			Level:       prefix + "/ECW 1 (Level a)",
			Description: "New entrant - upon commencement in the industry",
			MinWeekly:   967.50,
			MinHourly:   25.46,
			KeyDuties: []string{
				"Basic material handling functions",
				"Operate small plant and pneumatic machinery",
				"Use basic hand tools",
				"Assist tradespersons",
				"Work under general supervision",
			},
			NextSteps: "After 3 months, the employee progresses to Level 1(b). " +
				"Provide access to structured training for progression to Level 1(d).",
		}
	} else if monthsExp < 12 {
		return ClassificationResult{
			Level:       prefix + "/ECW 1 (Level b)",
			Description: "New entrant - after 3 months in the industry",
			MinWeekly:   967.50,
			MinHourly:   25.46,
			KeyDuties: []string{
				"Basic material handling functions",
				"Operate small plant and pneumatic machinery",
				"Use range of hand tools",
				"Assist tradespersons",
				"Developing construction process knowledge",
			},
			NextSteps: "After 12 months total, the employee progresses to Level 1(c). " +
				"Continue structured training to achieve Level 1(d).",
		}
	} else {
		hasTraining := askYesNo(reader,
			"Has the employee completed structured training equivalent to\n"+
				"Construction Skills Test or 16 appropriate modules?")

		if hasTraining {
			return getLevel1d(prefix)
		}

		return ClassificationResult{
			Level:       prefix + "/ECW 1 (Level c)",
			Description: "New entrant - after 12 months in the industry",
			MinWeekly:   967.50,
			MinHourly:   25.46,
			KeyDuties: []string{
				"Material handling",
				"Operate plant and machinery",
				"Use hand tools and basic equipment",
				"Assist tradespersons",
				"Understand construction process",
			},
			NextSteps: "Complete structured training (Construction Skills Test or 16 modules) " +
				"to progress to Level 1(d).",
		}
	}
}

func handleNoQualifications(reader *bufio.Reader, prefix string) ClassificationResult {
	fmt.Println()

	hasSkillsTest := askYesNo(reader,
		"Has the employee completed a Construction Skills Test or\n"+
			"16 appropriate training modules?")

	if hasSkillsTest {
		return getLevel1d(prefix)
	}

	yearsExp := askNumber(reader,
		"How many years of industry experience does the employee have?",
		1, 50)

	if yearsExp < 1 {
		return ClassificationResult{
			Level:       prefix + "/ECW 1 (Level c)",
			Description: "Experienced worker without formal qualifications (less than 1 year)",
			MinWeekly:   967.50,
			MinHourly:   25.46,
			KeyDuties: []string{
				"Basic construction tasks",
				"Assisting tradespersons",
				"Operating basic equipment",
			},
			NextSteps: "Complete Construction Skills Test or structured training for Level 1(d).",
		}
	}

	return getLevel1d(prefix)
}

func getLevel1d(prefix string) ClassificationResult {
	return ClassificationResult{
		Level:       prefix + "/ECW 1 (Level d)",
		Description: "Worker with basic skills and training",
		MinWeekly:   967.50,
		MinHourly:   25.46,
		KeyDuties: []string{
			"Use precision measuring instruments",
			"Operate small plant and pneumatic machinery",
			"Operate mobile equipment (forklifts, overhead cranes)",
			"Sheet metal soldering and tack welding",
			"Assist tradespersons",
			"Responsible for quality of own work under general supervision",
		},
		NextSteps: "Progress to Level 2 by completing additional training (20 modules total) " +
			"and demonstrating ability to work under limited supervision.",
	}
}

func handlePartialTraining(reader *bufio.Reader, prefix string) ClassificationResult {
	fmt.Println()

	modules := askNumber(reader,
		"How many training modules has the employee completed? (approximate)",
		1, 24)

	if modules >= 20 {
		canInterpretPlans := askYesNo(reader,
			"Can the employee interpret plans and drawings?")

		worksLimitedSupervision := askYesNo(reader,
			"Will the employee work under limited supervision (not constant oversight)?")

		if canInterpretPlans && worksLimitedSupervision {
			return ClassificationResult{
				Level:       prefix + "/ECW 2",
				Description: "Worker with intermediate skills under limited supervision",
				MinWeekly:   1016.30,
				MinHourly:   26.75,
				KeyDuties: []string{
					"Interpret plans and drawings",
					"Calculate safe loads and stress factors",
					"Operate machinery requiring skill beyond Level 1",
					"Use measuring and leveling instruments",
					"Perform basic quality checks on others' work",
					"May supervise Level 1 workers",
					"Work under limited supervision",
				},
				NextSteps: "Progress to Level 3 by completing trade apprenticeship or " +
					"Engineering Construction Industry Certificate Level 3 (24 modules).",
			}
		}
	}

	return getLevel1d(prefix)
}

func handleTrade(reader *bufio.Reader, prefix string) ClassificationResult {
	fmt.Println()
	fmt.Println("Trade-qualified worker identified.")
	fmt.Println()

	return ClassificationResult{
		Level:       prefix + "/ECW 3",
		Description: "Tradesperson - completed apprenticeship or equivalent",
		MinWeekly:   1068.40,
		MinHourly:   28.12,
		KeyDuties: []string{
			"Trade skills associated with certificated trades",
			"Understand and apply quality control techniques",
			"Exercise discretion within scope of trade",
			"Inspect products/materials for conformity",
			"Assist in on-the-job training of others",
			"May supervise Level 1 and 2 workers",
			"Work under limited supervision",
		},
		NextSteps: "Progress to Level 4 by completing 3 additional modules beyond trade training, " +
			"plus demonstrating advanced trade skills and ability to plan construction sequencing.",
	}
}

func handlePostTrade(reader *bufio.Reader, prefix string, targetLevel int) ClassificationResult {
	fmt.Println()
	fmt.Println("Post-trade qualified worker identified.")
	fmt.Println()

	results := map[int]ClassificationResult{
		4: {
			Level:       prefix + "/ECW 4",
			Description: "Engineering Construction Tradesperson Level II / Technician Level I",
			MinWeekly:   1098.40,
			MinHourly:   28.91,
			KeyDuties: []string{
				"Exercise precision trade skills at higher level than Level 3",
				"Operate and maintain plant and machinery",
				"Plan construction sequencing",
				"Work under limited supervision",
				"Provide guidance and assistance to work team",
				"Implement quality control techniques",
			},
			NextSteps: "Progress to Level 5 by completing 6 modules total beyond trade (3 more), " +
				"plus demonstrating complex equipment operation and advanced planning skills.",
		},
		5: {
			Level:       prefix + "/ECW 5",
			Description: "Special Class Engineering Construction Tradesperson Level I / Technician Level II",
			MinWeekly:   1118.40,
			MinHourly:   29.43,
			KeyDuties: []string{
				"Exercise precision trade skills at higher level than Level 4",
				"Operate and maintain complex plant and machinery",
				"Plan complex construction sequencing",
				"Work on complex hydraulic/pneumatic systems",
				"Work on complex electrical/electronic circuitry",
				"Provide trades guidance and training assistance",
			},
			NextSteps: "Progress to Level 6 by completing 9 modules total beyond trade (3 more), " +
				"plus demonstrating high precision skills on complex systems.",
		},
		6: {
			Level:       prefix + "/ECW 6",
			Description: "Special Class Engineering Construction Tradesperson Level II / Technician Level III",
			MinWeekly:   1143.30,
			MinHourly:   30.09,
			KeyDuties: []string{
				"Operate plant and equipment at higher skill level than Level 5",
				"Exercise high precision trade skills",
				"Plan complex construction sequencing",
				"Work on complex mechanical, hydraulic, pneumatic systems",
				"Work on complex electrical/electronic control systems",
				"Apply advanced CNC techniques",
				"Provide training in conjunction with supervisors",
			},
			NextSteps: "Progress to Level 7 by completing additional advanced training modules " +
				"and demonstrating mastery of complex systems integration.",
		},
	}

	result, exists := results[targetLevel]
	if !exists {
		return handleTrade(reader, prefix)
	}

	return result
}

func askYesNo(reader *bufio.Reader, question string) bool {
	for {
		fmt.Printf("\n%s\n", question)
		fmt.Print("(Y/N): ")

		response, _ := reader.ReadString('\n')
		response = strings.TrimSpace(strings.ToLower(response))

		if response == "y" || response == "yes" {
			return true
		} else if response == "n" || response == "no" {
			return false
		}

		fmt.Println("Please enter Y or N.")
	}
}

func askMultipleChoice(reader *bufio.Reader, question string, options []string) int {
	for {
		fmt.Printf("\n%s\n\n", question)
		for i, option := range options {
			fmt.Printf("  %d. %s\n", i+1, option)
		}
		fmt.Printf("\nEnter choice (1-%d): ", len(options))

		response, _ := reader.ReadString('\n')
		response = strings.TrimSpace(response)

		choice, err := strconv.Atoi(response)
		if err == nil && choice >= 1 && choice <= len(options) {
			return choice
		}

		fmt.Printf("Please enter a number between 1 and %d.\n", len(options))
	}
}

func askNumber(reader *bufio.Reader, question string, min, max int) int {
	for {
		fmt.Printf("\n%s\n", question)
		fmt.Printf("Enter number (%d-%d): ", min, max)

		response, _ := reader.ReadString('\n')
		response = strings.TrimSpace(response)

		num, err := strconv.Atoi(response)
		if err == nil && num >= min && num <= max {
			return num
		}

		fmt.Printf("Please enter a valid number between %d and %d.\n", min, max)
	}
}

func displayResult(result ClassificationResult) {
	fmt.Println()
	fmt.Println("═══════════════════════════════════════════════════════════════════")
	fmt.Println("   CLASSIFICATION RESULT")
	fmt.Println("═══════════════════════════════════════════════════════════════════")
	fmt.Println()
	fmt.Printf("CLASSIFICATION LEVEL: %s\n", result.Level)
	fmt.Println()
	fmt.Printf("DESCRIPTION: %s\n", result.Description)
	fmt.Println()
	fmt.Println("MINIMUM RATES (as of July 1, 2025):")
	fmt.Printf("  • Weekly Rate:  $%.2f per week\n", result.MinWeekly)
	fmt.Printf("  • Hourly Rate:  $%.2f per hour\n", result.MinHourly)
	fmt.Println()
	fmt.Println("KEY DUTIES AT THIS LEVEL:")
	for _, duty := range result.KeyDuties {
		fmt.Printf("  • %s\n", duty)
	}
	fmt.Println()
	fmt.Println("NEXT STEPS FOR PROGRESSION:")
	fmt.Printf("  %s\n", result.NextSteps)
	fmt.Println()
	fmt.Println("───────────────────────────────────────────────────────────────────")
	fmt.Println("IMPORTANT NOTES:")
	fmt.Println("───────────────────────────────────────────────────────────────────")
	fmt.Println()
	fmt.Println("1. INDUSTRY ALLOWANCES: Add applicable industry allowance to base rate:")
	fmt.Println("   • General building/Civil/Engineering construction: $64.10/week")
	fmt.Println("   • Residential building: $51.28/week")
	fmt.Println()
	fmt.Println("2. ADDITIONAL ALLOWANCES may apply based on:")
	fmt.Println("   • Tool allowances (for tradespersons)")
	fmt.Println("   • Height/multistorey work")
	fmt.Println("   • Underground work")
	fmt.Println("   • Special licenses or certificates")
	fmt.Println("   • Leading hand duties")
	fmt.Println()
	fmt.Println("3. CLASSIFICATION PRINCIPLES (Award Schedule A.3.1):")
	fmt.Println("   Classification must consider:")
	fmt.Println("   • Nature and skill requirements of the position")
	fmt.Println("   • Skill level and certification of employee")
	fmt.Println("   • Experience and qualifications")
	fmt.Println("   • Actual tasks to be performed (not just position title)")
	fmt.Println()
	fmt.Println("4. VERIFICATION: Ensure employee has appropriate:")
	fmt.Println("   • Training certificates or modules (where claimed)")
	fmt.Println("   • Trade qualifications (for Level 3+)")
	fmt.Println("   • Recognition of Prior Learning (RPL) if using work experience")
	fmt.Println()
	fmt.Println("5. LEGAL REQUIREMENT: The classification must match the work")
	fmt.Println("   actually performed and the employee's demonstrated skills.")
	fmt.Println()
	fmt.Println("═══════════════════════════════════════════════════════════════════")
	fmt.Println()
	fmt.Println("For detailed classification definitions, refer to:")
	fmt.Println("Building and Construction General On-site Award [MA000020]")
	fmt.Println("Schedule A - Classification Definitions")
	fmt.Println()
	fmt.Println("This tool provides guidance only. For specific situations,")
	fmt.Println("consult the full award or seek professional advice.")
	fmt.Println()
	fmt.Println("═══════════════════════════════════════════════════════════════════")
}
