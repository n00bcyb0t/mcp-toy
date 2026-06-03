# mcp-toy

⚠️ **Intentionally vulnerable** MCP server for AppSec research/training.
Arbitrary file read + SQL injection by design. **Do not deploy. Do not run against anything you care about.**

Tools: `read_file(path)`, `execute_query(sql)` against a throwaway SQLite.
