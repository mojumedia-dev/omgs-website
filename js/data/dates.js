/* IMPORTANT DATES. Two seasons: "upcoming" (shown first) and "reference".
   Each event: date (YYYY-MM-DD, or "" if not set), end (optional YYYY-MM-DD),
   time (optional "HH:MM-HH:MM" 24h), label (shown text when date is "" or fuzzy),
   title, details, where. Events with a real date get an "Add to calendar" link. */
const OMGS_DATES = {
  upcoming: {
    name: "Spring 2027",
    note: "Dates coming soon. Registration usually opens in mid-January.",
    events: [
      { date: "", label: "Mid-January (date coming soon)", title: "Spring registration opens", details: "", where: "" },
      { date: "", label: "Coming soon", title: "Registration deadline", details: "", where: "" }
    ]
  },
  reference: {
    name: "Spring 2026 (last season, for reference)",
    events: [
      { date: "2026-01-24", title: "Online registration opens" },
      { date: "2026-02-07", title: "Registration deadline", details: "High school deadline Mar 4 with prior notice to OMGS." },
      { date: "2026-02-21", title: "Coaches selected and notified" },
      { date: "2026-03-07", title: "Skill assessments and drafts (mandatory)", details: "Rain, snow, or shine. Equipment bag check-out.", where: "Centennial Park, 13000 S 2700 W, Riverton, UT 84065" },
      { date: "2026-03-09", title: "Coaches meeting and clinic + Annual Meeting", details: "Mandatory for coaches. No children. Evening meeting.", where: "Scheels, 11400 S State St, Sandy, UT 84070" },
      { date: "2026-03-16", time: "18:00-21:00", title: "Parent meeting (mandatory for team parents, first-time parents, scorekeepers)", details: "No children." },
      { date: "", label: "Spring (dates coming soon)", title: "Free pitching clinics", details: "Pre-register with Kathy Wilfert (Clinics & Equipment). Her contact is on the About & Board page." },
      { date: "2026-04-04", time: "09:00-12:00", title: "Centennial Park clean-up day", where: "Centennial Park, 13000 S 2700 W, Riverton, UT 84065" },
      { date: "2026-04-06", title: "Season begins" },
      { date: "2026-04-18", title: "All-Star coach requests due" },
      { date: "2026-04-22", title: "All-Star coaches selected and contacted" },
      { date: "2026-04-25", title: "All-Star player nominations due; players clinics; team pictures" },
      { date: "2026-05-02", title: "All-Star tryouts", details: "8U/10U 9 AM to noon; 12U/14U/18U 12:30 to 3:30 PM", where: "Centennial Park, 13000 S 2700 W, Riverton, UT 84065" },
      { date: "2026-05-22", end: "2026-05-25", title: "Memorial Day weekend, no games" },
      { date: "", label: "June", title: "Age group tournaments and closing ceremonies" },
      { date: "2026-06-06", title: "Season ends (18U ends before graduation)" },
      { date: "2026-07-16", end: "2026-07-18", title: "OMGS All-Star Invitational Tournament" }
    ]
  }
};
