---
name: mcp-builder
description: Create custom MCP (Model Context Protocol) servers for project-specific needs. Guides through building, testing, and registering new MCP servers.
---

# mcp-builder

Build custom MCP servers for MeowReel.

## Usage

`/mcp-builder create a stats MCP that exposes daily order count and revenue`

## Workflow

1. Ask the user what data or actions the MCP should expose
2. Create the MCP server in `packages/mcp-<name>/`
3. Implement the tools/resources using `@modelcontextprotocol/sdk`
4. Add to `.mcp.json` for project scope or instruct local scope setup
5. Test the MCP server by querying it
6. Commit with `/commit`

## Best practices

- Keep MCPs read-only unless write access is explicitly needed
- Never expose secrets through MCP responses
- Add rate limiting if the MCP queries external services
- Document available tools in the server's description
