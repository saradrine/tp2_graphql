export const Subscription = {
    cvEvent: {
        subscribe: (parent:any, args:any, { db, pubSub }: any) => pubSub.subscribe("cvEvent"),
        resolve: (payload: any) => {
            return payload;
        },
    },
};

// pubSub.publish("cvEvent", { cvEvent: "A new CV has been added!" });
