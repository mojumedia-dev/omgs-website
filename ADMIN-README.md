# OMGS Website: How to Update (no HTML needed)

All everyday edits happen in small text files in `js/`. Open the file in any text editor,
change the text between the quotes, save, and re-upload that one file. Keep the quotes and commas.

| What | File | How |
|---|---|---|
| Registration + Log In links | `js/config.js` | Change `REGISTRATION_URL` and `LOGIN_URL`. Moving to PlayMetrics = paste the new links here (also update `RU`/`LOGIN` in gen_newsite.py so fallback links match). |
| Announcement banner (top of every page) | `js/data/site.js` | Edit `text`, `linkText`, `linkUrl`. `enabled: false` hides it. Change `id` each time you post a new message so people who closed the old one see it. |
| Field status | `js/data/field-status.js` | Set each field's `status` to `"Open"`, `"Closed"` or `"Pending"`. **Always update `updated`** (e.g. `"Apr 6, 2027 3:15 PM"`). Optional `note` shows above the list. |
| Important dates / Calendar of Events | `js/data/dates.js` | `upcoming` = next season, `reference` = last season. Each event: `date: "2027-01-16"` (year-month-day) or `date: ""` plus `label: "Mid-January (TBD)"` when not set. Optional `end`, `time: "09:00-12:00"`, `details`, `where`. Events with a real date get an automatic "Add to calendar" link. Home shows the first 4 reference events. |
| Home stat strip (4 numbers) | `js/data/site.js` (`OMGS_STATS`) | Five boxes: 500+ players, 40+ teams, ages 3-18, 10 games guaranteed, 20+ cities (all confirmed by Adam). |
| News | `js/data/news.js` | Add an item at the top: `{ date: "...", title: "...", text: "..." },`. Empty list `[]` hides News. |
| Sponsors | `js/data/sponsors.js` | Add `{ name: "...", logo: "img/sponsors/file.png", url: "https://..." },`. Logo and url are optional. Put logo files in `img/sponsors/`. Also update `SPONSORS` in gen_newsite.py (no-JavaScript fallback). |

Bigger edits (page text, board list, FAQ, rules) live in `/workspace/omgs/gen_newsite.py`.
Edit it and run `python3 gen_newsite.py` to rebuild the HTML pages and the search index (`js/search-index.js`).
Don't hand-edit the HTML files and also re-run the script, or your HTML edits are overwritten.

Preview locally: `cd newsite && python3 -m http.server 8765`, then open http://localhost:8765.
Logos: `img/omgs-logo-white.svg` (dark areas) and `img/omgs-logo-color.svg` (light areas, favicon) are the approved vectors. PNG versions are kept in `img/` as backups. `img/play-like-a-girl.svg` is the values logo.

Hosting: any static host works (GitHub Pages, Netlify, Cloudflare Pages, plain web hosting). Upload the whole `newsite` folder.

## Still pending (shown to the public as "Coming soon" or left out)

Fill these in as they are decided, then remove them from this list.

**2027 season**
- All Spring 2027 dates (registration open/deadline, drafts, meetings, season start/end, All-Star dates). Edit `js/data/dates.js` (`upcoming`). Registration usually opens mid-January.
- Fall 2026 key dates (none published).
- 2027 registration fees and the 2027 registration deadline. (OMGS does not charge late fees.)
- Refund policy (not published anywhere).
- Updated 2027 Coaches Handbook (2026 version says double elimination; tournaments are now single elimination, and it lists old names such as Kaye Craghead as President).

**Links / sign-ups**
- Coach application link (handbook says applications are online).
- Umpire crew info/sign-up.
- Where game schedules are posted; standings link.
- Sponsorship levels and sponsor contact (button emails contact@ for now).

**Facts to double-check**
- OMGS has no phone number; the site uses contact@omgsoftball.org only (the old PDFs list 801-810-5569, ignore it).
- T-Ball/6U ages 3 to 5 (confirmed). The Division Finder uses the age-chart cutoff (Sep to Dec births grouped with the next year), so T-Ball = chart age 3 to 5. Confirm this matches how OMGS places T-Ball players.
- Treasurer: shown as "Shannon" (shannon@omgsoftball.org). The live Board page also lists Shannon Capson as 18U Coordinator with the same email, so both roles are shown as Shannon. Confirm surname/email for Treasurer. Justin Swain (former Treasurer on live site) was removed per Adam.
- 2026 reference conflicts (wording softened on the site): coaches meeting start 6:00 vs 6:30 PM; parent meeting Mon Mar 16 (Scheels Sandy) vs Tue Mar 17 (Sandra Lloyd Community Center); All-Star coach selection Apr 21 vs 22; coach requests Apr 18 vs 19.
- Field status: first real update (set `updated` in `js/data/field-status.js`).
- Facebook/Instagram handles (omgsleague) come from the live site links; confirm the accounts are active.

**All-Stars (allstars.html)**
- 2027 All-Star dates and tournament list. (All-Star fee confirmed: $360.)
- Which 2027 tournaments are mandatory (2026 handbook text says OMGS Invitational, D1 State, plus one coach pick; its table also marks Gerald Wright Classic as mandatory).

**Coaches & Parents (coaches.html)**
- The posted 2026 meeting slides are trimmed public copies: removed the board roster slide (outdated names), Association Business, board election, and the 2024 General Finances slide (coaches deck slides 3-6; parent deck slide 3). Full originals stay in Google Drive and in /workspace/omgs/docs/drive/.
- The All-Star Coach Standards PDF is pages 1-4 only (coach standards and game-day standard). The board applicant evaluation rubric and interview questions (pages 5-7) are internal and not posted.
- 2027 coaches handbook and 2027 meeting slides.
- Older decks may mention 2025 dates or old names; tournaments are single elimination.


## Practice sign-up button (fields.html#practice)
`js/config.js` has `PRACTICE_SIGNUP_URL: ""`. While it is blank, the Practice Slots section only says the board shares the Google Sheet with coaches. If you paste a URL there, a "Practice sign-up sheet" button appears. Do not paste the coach sign-up Google Sheet itself: it lists coach and team names, and the website is public. Use a form or a page that is safe to share.
The slot grid and practice notes live in the fields.html section of `gen_newsite.py`.
