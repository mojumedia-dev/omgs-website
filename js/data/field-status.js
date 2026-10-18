/* FIELD STATUS. For each field set status to "Open", "Closed", or "Pending".
   ALWAYS update "updated" when you change anything (shown to parents). */
const OMGS_FIELD_STATUS = {
  updated: "",            // e.g. "Apr 6, 2027 3:15 PM". Leave "" if not yet set.
  note: "",               // optional, e.g. "Rainout. Check team email for make-ups."
  fields: [
    { name: "Centennial Park: Field A", status: "Pending" },
    { name: "Centennial Park: Field B", status: "Pending" },
    { name: "Centennial Park: Field C", status: "Pending" },
    { name: "Centennial Park: T-Ball Bowl", status: "Pending" },
    { name: "Grass Bowl: Northeast Corner", status: "Pending" },
    { name: "Grass Bowl: Northwest Corner", status: "Pending" },
    { name: "Grass Bowl: Southwest Corner", status: "Pending" },
    { name: "Grass Bowl: Southeast Corner", status: "Pending" },
    { name: "Tuscany East", status: "Pending" },
    { name: "Western Springs", status: "Pending" }
  ]
};
