---
name: generate-test-video
description: Trigger a test video generation via Replicate without going through Stripe. Useful for debugging the worker pipeline.
---

# generate-test-video

Trigger a test generation end-to-end without payment.

## Usage

`/generate-test-video with photo tests/fixtures/cat.jpg and category midnight-porch-musician`

## Workflow

1. Create a mock Order in MongoDB with status='paid' (bypass Stripe):
   - photoUrl = upload the test photo to R2 first
   - scene.categorySlug = from user input
   - stripe.customerEmail = "dev@meowreel.local"
2. Enqueue the BullMQ job `generate-video` with the order ID
3. Poll the order every 3s (max 5 min)
4. When status = 'done':
   - Show the output videoUrl
   - Download the video locally to tests/outputs/
   - Play it if FFPLAY is available, otherwise print the path
5. Measure total time and report: "Generation took Xs. Model: <model>. Size: <bytes>."

## Cleanup

After the test:
- Keep the output in /tmp for debugging
- Don't send a real email (check NODE_ENV !== 'production' before MailerLite call)
