import 'reflect-metadata';

import { GraphQLServer, Options } from 'graphql-yoga';
import { UserResolver } from "./UserResolver";
import { ProfileResolver } from "./ProfileResolver";
import { buildSchema } from 'type-graphql';



const PORT = process.env.PORT || 4000;
export async function startGraphqlServer() {
    // Building schema here...
    const schema = await buildSchema({
        resolvers: [UserResolver, ProfileResolver]
    });

    // Create GraphQL server
    const server = new GraphQLServer({
        schema,
        context: request => ({
            request: request.request,
            user: {}
        })
    });

    // Configure server options
    const serverOptions: Options = {
        port: PORT,
        endpoint: "/graphql",
        playground: "/playground",
    };
    // Start the server
    server.start(serverOptions, ({ port, playground }) => {
        console.log(
            `Server is running, GraphQL Playground available at http://localhost:${port}${playground}`,
        );
    });
}
startGraphqlServer()