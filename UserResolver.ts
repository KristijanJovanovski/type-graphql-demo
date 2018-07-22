import { Resolver, ResolverInterface, Query, Arg, FieldResolver, Root, Int } from "type-graphql";
import { User } from './User';
import { Profile } from './Profile';
import { usersData, profilesData, getProfileByUserId } from './helper';


@Resolver(type => User)
export class UserResolver
    implements ResolverInterface<User>
{
    constructor(
    ) { }

    @Query(returns => User)
    async user(
        @Arg('id', type => Int, { nullable: false }) id: number
    ) {
        const user = await usersData.find(u => u.id === id)
        return user;
    }

    @Query(returns => [User])
    async users(
    ) {
        const users = await usersData;
        return users;
    }

    @FieldResolver(type => Profile)
    async profile(@Root() user: User) {
        const profile = profilesData.find(p => p.user.id === user.id);
        if (!profile) {
            // simulate another request
            return await getProfileByUserId(user.id);
        }
        return profile;
    }
}