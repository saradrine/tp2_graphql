import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { Query } from "./src/resolvers/Query";
import { db } from "./src/database";
import fs from "fs";
import path from "path";

export const schema = createSchema({
    typeDefs: fs.readFileSync(
        path.join(__dirname, "src/schema/schema.graphql"), "utf-8"
    ),

    resolvers: {
        Query,

    },
});
function main() {
    const yoga = createYoga({
        schema,
        context: {
            db,
        } as any,

    });
    const server = createServer(yoga);
    server.listen(4000, () => {
        console.info("TP2 is here : http://localhost:4000/graphql");
    });
}
main();