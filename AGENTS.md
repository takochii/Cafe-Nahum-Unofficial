# AGENTS.md

- This is a static one-page site: `index.html` holds all sections, `styles.css` holds custom visuals and animations, and `script.js` holds interactions; there is no app framework or server entrypoint.
- `package.json` still has no useful scripts: `npm test`, `npm run dev`, and `npm run build` all fail. Do not document them as working commands.
- Tailwind CSS v4 is loaded in `index.html` from the jsDelivr browser CDN with a `<style type="text/tailwindcss">` theme block; there is no local Tailwind build, config file, or CSS entrypoint.
- Google Fonts (`Fraunces` and `DM Sans`) load from a CDN; the page needs internet for the intended typography.
- Bootstrap Icons `1.11.3` loads from the jsDelivr CDN for social, arrow, and location icons; it was explicitly approved as the one external icon library. Do not add another icon package.
- Image slots are intentionally empty and marked with `data-image-slot` (polaroid, menu thumbnails, gallery tiles). The owner supplies the assets; do not add stock images or placeholder labels.
- Business details are placeholders: address, Google Maps pin, Facebook menu post, social URLs, email, and prices must be replaced before launch.
- Reviews are curated static Google-style cards, not a live Google Reviews import; live reviews require an API key or third-party service.
- The contact form uses `mailto:` to open the visitor's email app; it does not send email from the site.
- No lint, typecheck, formatter, or test commands are configured; verify visual and interactive changes manually in a browser.

# Project Rules & Workflow

## User Profile & Verification
- **Non-Coder Workflow:** I am a non-coder and will not read source code to verify your work.
- **Manual Browser Testing:** After completing any change, you must provide a clear, numbered 3-step manual test I can run directly in my web browser to verify that it works.

## Tech Stack Constraints
- **Allowed Technologies:** This project uses **only** JavaScript, HTML, CSS, and TailwindCSS.
- **No Unapproved Dependencies:** Do not introduce any new libraries, frameworks, build tools, or external services without asking me first and getting explicit approval.

## Modes of Collaboration (DIY vs. Build)
- **Explain-Only Mode (DIY):** If I ask you to "show an explanation on how to do it" (or ask how to achieve something myself), **do not edit or create any files**. Instead, explain step-by-step in plain language how I can make the change myself, including where to put the code and what to paste.
- **Build Trigger:** Wait for me to try it on my own. If I need you to take over and apply the changes for me, I will reply with **"build"** (or switch to the `build` agent and ask you to proceed).

## Approval & Planning Gate
- **Plan Before Coding:** When I ask you to make a change directly, before writing or editing code for any non-trivial change, explain in plain, non-technical language:
  1. What you understand the goal to be.
  2. Your planned approach.
- **Wait for Approval:** Stop and wait for me to reply with **"go"** before making any file changes.

## Code Explanations
- **Plain-English Comments:** Whenever you write a new function or modify an existing line of logic, include a short comment (one sentence or more) directly above it explaining in plain English what it does.


