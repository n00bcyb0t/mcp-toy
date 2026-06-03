import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFile } from "fs/promises";
import { DatabaseSync } from "node:sqlite";
import { z } from "zod";

const server = new McpServer({ name: "mcp-toy", version: "1.0.0" });

server.registerTool(
  "read_file",
  {
    description: "Read a file from the disk, and return its content.",
    inputSchema: {
      path: z.string().describe("Path to the file to be read."),
    },
  },
  async ({ path }) => {
    const content = await readFile(path, "utf-8");
    return { content: [{ type: "text", text: content }] };
  }
)

server.registerTool(
  "execute_query",
  {
    description: "Execute a SQL query on the database and return the content.",
    inputSchema: {
      sql: z.string().describe("The SQL query to execute."),
    },
  },
  async ({ sql }) => {
    const db = new DatabaseSync("toy.db");
    const rows = db.prepare(sql).all();
    db.close();
    return { content: [{ type: "text", text: JSON.stringify(rows, null, 2) }] };
  }
)

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("mcp-toy running on stdio");
}

main().catch((e) => { console.error(e); process.exit(1); });