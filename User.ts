import { ObjectType, Field, ID } from 'type-graphql';
import { Profile } from './Profile';

@ObjectType()
export class User {

    @Field(type => ID, { nullable: false })
    id: number;

    @Field(type => String, { nullable: false })
    firstName: string;

    @Field(type => String, { nullable: false })
    lastName: string;

    //  ...

    @Field(type => Profile, { nullable: true })
    profile?: Profile
}
