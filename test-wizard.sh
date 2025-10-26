#!/bin/bash

# Test Scenario 1: New Entrant - Just Starting
echo "═══════════════════════════════════════════════════════════"
echo "TEST SCENARIO 1: New Worker (First Day)"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Inputs:"
echo "1. Worker Type: 1 (General building)"
echo "2. New to industry: Y"
echo "3. Months experience: 0"
echo ""

printf "1\nY\n0\n" | ./classification-wizard

echo ""
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "TEST SCENARIO 2: Qualified Carpenter"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Inputs:"
echo "1. Worker Type: 1 (General building)"
echo "2. New to industry: N"
echo "3. Qualifications: 3 (Completed trade apprenticeship)"
echo ""

printf "1\nN\n3\n" | ./classification-wizard
