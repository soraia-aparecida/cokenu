export class Follwer {
    constructor(
        private follower_id: string,
        private followed_id: string
    ) { }

    public getFollower(): string {
        return this.follower_id
    }

    public getFollowed(): string {
        return this.followed_id
    }

}