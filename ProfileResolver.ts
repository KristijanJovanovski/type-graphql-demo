import { Resolver, ResolverInterface, Query, Arg, Int, FieldResolver, Root } from 'type-graphql';
import { Profile } from './Profile';
import { User } from './User';
import { profilesData, usersData, getUserByProfileId } from './helper';

@Resolver(type => Profile)
export class ProfileResolver
    implements ResolverInterface<Profile>
{
    constructor(
    ) { }

    @Query(returns => Profile)
    async Profile(
        @Arg('id', type => Int, { nullable: false }) id: number
    ) {
        const profile = await profilesData.find(p => p.id === id);
        return profile;
    }

    @Query(returns => [Profile])
    async Profiles() {
        const profiles = await profilesData;
        return profiles;
    }

    @FieldResolver(type => User)
    async user(@Root() profile: Profile) {
        const user = await usersData.find(u => u.profile.id === profile.id)
        if (!user) {
            // simulate another request
            return await getUserByProfileId(profile.id);
        }
        return user;
    }
}