# Feature Spec: Named Deployments for VibeSharing MCP

## Problem

When deploying via `import_repo`, VibeSharing creates a Vercel project with an auto-generated name (e.g., `vs-step-1-general-counsel-alerted-mljple8d`). This causes:

1. **Wrong URLs in VibeSharing** — the agent has to guess the Vercel domain and frequently gets it wrong, resulting in 404s on the prototype page
2. **Multiple broken attempts** — debugging URL mismatches wastes time and creates duplicate prototype entries
3. **Unmemorable URLs** — stakeholders sharing links have to copy/paste random strings instead of saying "go to erg-v3-teams.vercel.app"

## Solution

Add a `deploy_name` parameter to `import_repo` (and `deploy_files`) that controls the Vercel project name. The deployed URL becomes deterministic: `https://{deploy_name}.vercel.app`.

## MCP Tool Changes

### `import_repo` — new parameter

```json
{
  "deploy_name": {
    "type": "string",
    "description": "Friendly name for the Vercel project (becomes the .vercel.app subdomain). Lowercase, hyphens allowed, max 100 chars. If not provided, auto-slugified from the 'name' parameter. Example: 'erg-v3-teams' → erg-v3-teams.vercel.app"
  }
}
```

### `deploy_files` — same parameter

Same `deploy_name` parameter. If the prototype already has a Vercel project, rename it to match `deploy_name`.

## Backend Behavior

### On first deploy (new Vercel project)

1. Validate `deploy_name` availability via Vercel API (`GET /v9/projects/{deploy_name}` — 404 means available)
2. Create the Vercel project with `name: deploy_name` via `POST /v11/projects`
3. Deploy the repo/files to that project
4. Store the mapping: `prototype_id → { vercel_project_id, deploy_name }`
5. Register the prototype with URL `https://{deploy_name}.vercel.app`
6. Return the URL in the response

### On redeploy (existing Vercel project)

1. Look up stored `vercel_project_id` for this `prototype_id`
2. If `deploy_name` differs from current project name, rename via `PATCH /v9/projects/{id}` with `{"name": deploy_name}`
3. Deploy new code to the existing project
4. Update the prototype URL if the name changed

### Auto-slugification (when `deploy_name` is omitted)

Generate from the `name` parameter:
- Lowercase
- Replace spaces and special chars with hyphens
- Collapse multiple hyphens
- Trim to 100 chars
- Example: "ERG v3 Teams" → `erg-v3-teams`

### Name collision handling

If the Vercel project name is taken (by another team/account):
1. Try appending a short hash: `erg-v3-teams-a1b2`
2. Return the actual URL used in the response (so the agent always has the correct URL)
3. Include a note in the response: `"deploy_name 'erg-v3-teams' was taken, used 'erg-v3-teams-a1b2' instead"`

## Vercel API Reference

### Check availability
```
GET https://api.vercel.com/v9/projects/{deploy_name}
Authorization: Bearer {VERCEL_TOKEN}
```
- 200 = taken (project exists)
- 404 = available

### Create project with name
```
POST https://api.vercel.com/v11/projects
Authorization: Bearer {VERCEL_TOKEN}
Content-Type: application/json

{
  "name": "erg-v3-teams",
  "framework": "nextjs",
  "gitRepository": {
    "type": "github",
    "repo": "vibesharing-prototypes/174f24af-step-1-..."
  }
}
```

### Rename existing project
```
PATCH https://api.vercel.com/v9/projects/{projectId}
Authorization: Bearer {VERCEL_TOKEN}
Content-Type: application/json

{"name": "erg-v3-teams"}
```

## Data Model Changes

Add to the prototype record (or a related deploy record):

| Field | Type | Description |
|-------|------|-------------|
| `vercel_project_id` | string | Vercel's internal project ID |
| `deploy_name` | string | The current Vercel project name / subdomain |
| `vercel_url` | string | Full URL: `https://{deploy_name}.vercel.app` |

This mapping enables:
- Redeploying to the same Vercel project without creating duplicates
- Renaming the project on subsequent deploys
- Always returning the correct URL

## MCP Response Changes

The response from `import_repo` / `deploy_files` should always include:

```json
{
  "status": "success",
  "prototype_id": "82f9616e-...",
  "deploy_name": "erg-v3-teams",
  "live_url": "https://erg-v3-teams.vercel.app",
  "vibesharing_url": "https://vibesharing.app/dashboard/projects/82f9616e-...",
  "message": "Deployed and registered successfully."
}
```

## Example Agent Interaction

**User says:**
> "deploy to vibesharing as erg-v3-teams in the All Hero Use Cases collection"

**Agent calls:**
```json
{
  "tool": "import_repo",
  "arguments": {
    "repo_url": "https://github.com/vibesharing-prototypes/174f24af-step-1-...",
    "deploy_name": "erg-v3-teams",
    "name": "ERG v3 Teams",
    "collection_id": "bacc3877-a34e-475e-9832-5f0119828e53",
    "description": "Full ERG workflow inside Microsoft Teams..."
  }
}
```

**MCP returns:**
```json
{
  "status": "success",
  "deploy_name": "erg-v3-teams",
  "live_url": "https://erg-v3-teams.vercel.app",
  "vibesharing_url": "https://vibesharing.app/dashboard/projects/82f9616e-..."
}
```

**Agent responds to user:**
> Deployed. Live at https://erg-v3-teams.vercel.app — registered in VibeSharing at https://vibesharing.app/dashboard/projects/82f9616e-...

No guessing. No 404s. No duplicate entries.

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| `deploy_name` already taken by another account | Append short hash, return actual name used |
| `deploy_name` taken by same account (same prototype) | Redeploy to existing project |
| `deploy_name` taken by same account (different prototype) | Error: "deploy_name 'x' is already used by prototype 'Y'. Choose a different name." |
| `deploy_name` contains invalid chars | Sanitize silently (uppercase → lower, spaces → hyphens, strip special chars) |
| `deploy_name` omitted, `name` omitted | Fall back to repo name slug |
| Rename fails (Vercel API error) | Deploy anyway with old name, warn in response |

## Migration

For existing prototypes that were deployed before this feature:
- On next redeploy, if `deploy_name` is provided, rename the Vercel project
- Backfill `vercel_project_id` from the Vercel API by matching the repo URL
