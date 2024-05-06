import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { Query } from "./src/resolvers/Query";
import { Subscription } from "./src/resolvers/Subscription";
import { Mutation } from "./src/resolvers/Mutation";
const fs = require("fs");
const path = require("path");

async function main() {
    const pubSub = createPubSub();
    const yoga = createYoga({
        schema: createSchema({
            typeDefs: fs.readFileSync(
                path.join(__dirname, "src/schema/schema.graphql"), "utf-8"
            ),
            resolvers: {
                Query,
                Mutation,
                Subscription
            },
        }),
        context: {
             pubSub
        } as any,
    });
    const server = createServer(yoga);
    server.listen(4000, () => {
        console.info("TP2 is here : http://localhost:4000/graphql");
    });
}
main();