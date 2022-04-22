import { PersistentUnorderedMap, math } from "near-sdk-as";

export const gifs = new PersistentUnorderedMap<u32, Gif>("todos");

@nearBindgen
export class Gif {
    id: u32;
    gif: string;
    vote: u32;

    constructor(gifLink: string) {
        this.id = math.hash32<string>(gifLink);
        this.gif = gifLink;
        this.vote = 0;
    }

    static insert(gifLink: string): Gif {
        const gif = new Gif(gifLink);
        gifs.set(gif.id, gif);
        return gif;
    }
}
