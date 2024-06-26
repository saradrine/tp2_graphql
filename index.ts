import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { Query } from "./src/resolvers/Query";
import { Subscription } from "./src/resolvers/Subscription";
import { db } from "./src/database";
import {Mutation} from "./src/resolvers/Mutation";
import { CV } from "./src/resolvers/Cv";

const fs = require("fs");
const path = require("path");

function main() {
    const pubSub = createPubSub();
    const yoga = createYoga({
        schema: createSchema({
            typeDefs: fs.readFileSync(
                path.join(__dirname, "src/schema/schema.graphql"), "utf-8"
            ),
            resolvers: {
                CV,
                Query,
                Subscription,
                Mutation
            },
        }),
        context: {
            db, pubSub
        } as any,
    });
    const server = createServer(yoga);
    server.listen(4000, () => {
        console.info("TP2 is here : http://localhost:4000/graphql");
    });
}
main();