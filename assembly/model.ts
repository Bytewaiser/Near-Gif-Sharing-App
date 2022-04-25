import { Context, PersistentUnorderedMap, math, u128, ContractPromiseBatch } from "near-sdk-as";

export const gifs = new PersistentUnorderedMap<u32, Gif>("gifs");
export const userGifCount = new PersistentUnorderedMap<string, u32>("usergifcount");

@nearBindgen
export class Gif {
    userId: string;
    gifLink: string;
    id: u32;
    vote: u32;

    constructor(gifLink: string) {
        this.userId = Context.predecessor;
        this.id = math.hash32<string>(gifLink);
        this.gifLink = gifLink;
        this.vote = 0;
    }

    static insert(gifLink: string): Gif {
        const gif = new Gif(gifLink);

        const gifCount = userGifCount.contains(gif.userId) ? userGifCount.getSome(gif.userId) : 0;
        if (gifCount == 0) userGifCount.set(gif.userId, 0);

        if (gifCount >= 1) {
            //const baseMoney = u128.from(Math.pow(10, 23).toString());
            const baseMoney = u128.from("100000000000000000000000");
            assert(Context.attachedDeposit >= baseMoney, "You can not create more than 1 gif free. 0.1 Near is needed for extra creation of gifs.");
        }

        gifs.set(gif.id, gif);
        userGifCount.set(gif.userId, userGifCount.getSome(gif.userId) + 1);

        return gif;
    }

    static findById(id: u32): Gif {
        return gifs.getSome(id);
    }

    static upVote(id: u32): string {
        const gif = Gif.findById(id);
        const baseMoney = u128.from("10000000000000000000000");

        assert(gif.userId != Context.predecessor, "You can not vote your own Gif");
        assert(Context.attachedDeposit >= baseMoney, "You need at least 0.01 Near to vote a Gif");
        const toRecipient = ContractPromiseBatch.create(gif.userId);
        toRecipient.transfer(Context.attachedDeposit);

        gif.vote += 1;
        gifs.set(id, gif);
        return `Upvoted and sent ${Context.attachedDeposit} Near from ${Context.sender} to ${gif.userId}`;
    }

    static downVote(id: u32): string {
        const gif = Gif.findById(id);
        const baseMoney = u128.from("10000000000000000000000");

        assert(gif.userId != Context.predecessor, "You can not vote your own Gif");
        assert(Context.attachedDeposit >= baseMoney, "You need at least 0.01 Near to vote a Gif");
        const toRecipient = ContractPromiseBatch.create(gif.userId);
        toRecipient.transfer(Context.attachedDeposit);

        gif.vote = <u32>Math.max(0, gif.vote - 1);
        gifs.set(id, gif);
        return `Downvoted and sent ${Context.attachedDeposit} Near from ${Context.sender} to ${gif.userId}`;
    }

    static find(offset: u32, limit: u32): Gif[] {
        return gifs.values(offset, offset + limit);
    }

    static findByIdAndUpdate(id: u32, gifLink: string): Gif {
        const gif = this.findById(id);
        assert(gif.userId == Context.predecessor, "You are not the owner of the Gif");

        gif.gifLink = gifLink;
        gif.vote = 0;
        gifs.set(id, gif);
        return gif;
    }

    static findByIdAndDelete(id: u32): string {
        const gif = this.findById(id);
        assert(gif.userId == Context.predecessor, "You are not the owner of the Gif");
        gifs.delete(id);
        return `Deleted Gif with the id: ${id}`;
    }
}
