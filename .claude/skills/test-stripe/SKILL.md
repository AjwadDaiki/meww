---
name: test-stripe
description: Simulate Stripe webhook events locally to test payment flow and webhook handler. Uses Stripe CLI.
---

# test-stripe

Test the Stripe webhook handler without real payments.

## Prerequisites

- Stripe CLI installed (`brew install stripe/stripe-cli/stripe`)
- Logged in (`stripe login`)
- Local dev server running on port 3000

## Workflow

1. If stripe listen is not running, start it:
   `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
2. In a second terminal, trigger the event:
   - `checkout.session.completed` for testing payment
   - `checkout.session.expired` for testing expiry
   - `charge.refunded` for testing refund flow
3. Verify in MongoDB (via mongodb MCP) that the order status transitioned correctly.
4. Verify a BullMQ job was enqueued (check Redis via redis-cli or a query).
5. Report what happened to the user.

## Example

`/test-stripe checkout.session.completed with amount 99 EUR and category midnight-porch-musician`

Triggers the event via Stripe CLI, polls MongoDB to confirm order.status='paid',
checks Redis queue for generate-video job, reports back.
