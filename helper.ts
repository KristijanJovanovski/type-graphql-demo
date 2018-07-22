import { User } from './User';
import { Profile } from './Profile';

function generateUsers(count: number = 10): User[] {
    return Array.from(new Array(count), (_, i): User => ({
        id: i + 1,
        firstName: `firstname${i + 1}`,
        lastName: `lastname${i + 1}`
    }));
}
function generateProfiles(count: number = 10): Profile[] {
    return Array.from(new Array(count), (_, i): Profile => ({
        id: i + 1,
        avatar: `avatar${i + 1}`,
        status: `status${i + 1}`
    }));
}

const merge = () => {
    const users = generateUsers();
    const profiles = generateProfiles();

    for (let id = 0; id < users.length; id++) {
        const user = users[id];
        const profile = profiles[id];
        // making the last items not connected
        if (id < users.length - 1) {
            user.profile = profile;
            profile.user = user;
        }
    }
    return { users, profiles }
}
export const usersData = [
    ...(merge()['users'])
]
export const profilesData = [
    ...(merge()['profiles'])
]

/*  In the following methods for simplicity we are assuming that 
 *  user with id = 1 should match profile with id = 1 and so on,
 *  so we use can use the same id to query for both.
 *  In reality we query the database
 */

export const getUserByProfileId = async (profileId: number) => {
    const profile = profilesData[profileId];
    const user = usersData[profileId];
    user.profile = profile;
    profile.user = user;

    return Promise.resolve(user)
}
export const getProfileByUserId = async (userId: number) => {
    const user = usersData[userId];
    const profile = profilesData[userId];
    profile.user = user;
    user.profile = profile;

    return Promise.resolve(profile)
}
