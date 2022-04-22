import { PersistentUnorderedMap, math } from "near-sdk-as";

export const gifs = new PersistentUnorderedMap<u32, Gif>("todos");

@nearBindgen
export class PartialGif {
    gifLink: string;
    vote: u32;
}

@nearBindgen
export class Gif {
    id: u32;
    gifLink: string;
    vote: u32;

    constructor(gifLink: string) {
        this.id = math.hash32<string>(gifLink);
        this.gifLink = gifLink;
        this.vote = 0;
    }

    static insert(gifLink: string): Gif {
        const gif = new Gif(gifLink);
        gifs.set(gif.id, gif);
        return gif;
    }

    static findById(id: u32): Gif {
        return gifs.getSome(id);
    }

    static find(offset: u32, limit: u32): Gif[] {
        return gifs.values(offset, offset + limit);
    }

    static findByIdAndUpdate(id: u32, partial: PartialGif): Gif {
        const gif = this.findById(id);

        gif.gifLink = partial.gifLink;
        gif.vote = partial.vote;
        gifs.set(id, gif);
        return gif;
    }

    static findByIdAndDelete(id: u32): void {
        gifs.delete(id);
    }
}
