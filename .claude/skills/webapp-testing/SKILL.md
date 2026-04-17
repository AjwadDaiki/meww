---
name: webapp-testing
description: Playwright-based skill to test web application UIs locally. Navigate, click, screenshot, and verify flows end-to-end in a real browser.
---

# webapp-testing

Test web application UIs using Playwright MCP.

## Usage

`/webapp-testing test the upload flow on localhost:3000/fr`
`/webapp-testing screenshot the checkout page at 375px width`

## Workflow

1. Ensure dev server is running (check `curl -s localhost:3000`)
2. Use Playwright MCP to:
   - Navigate to the specified URL
   - Perform the requested actions (click, type, upload, etc.)
   - Take screenshots at key steps
   - Verify expected elements are present
3. Report results with screenshots and any issues found

## Common test patterns

- **Upload flow**: Navigate to landing, drag-drop a test image, verify preview appears
- **Checkout flow**: Upload > select category > click Action > verify Stripe redirect
- **Mobile test**: Set viewport to 375x812 (iPhone), run the same flow
- **Responsive check**: Screenshot at 375px, 768px, 1024px, 1440px widths
- **i18n test**: Switch locale, verify all text changes appropriately
