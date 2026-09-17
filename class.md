Hunters — id, name, email, rank
Criminals — id, name, alias, danger_level (low/medium/high), status (at_large/captured)
Bounties — id, title, description, reward, status (open/claimed/completed), criminal_id (FK → Criminals.id), posted_by (FK → Hunters.id)
Claims — id, bounty_id (FK → Bounties.id), hunter_id (FK → Hunters.id), claimed_at, outcome (in-progress/success/failed)
Why Criminals fits well:

Every Bounty now targets exactly one Criminal (1-to-many: a criminal could have multiple bounties posted on them over time, e.g. reward increases).
Gives a third independent "root" entity with its own full CRUD, alongside its own natural lifecycle (at_large → captured), separate from a bounty's own status.
Nice teaching moment: completing a claim successfully can update two records — the bounty's status AND the criminal's status — a good intro to cross-table updates.
Routes stay clean:
/criminals — full CRUD
/criminals/:id/bounties — all bounties on a given criminal