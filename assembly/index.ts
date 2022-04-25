import { Gif } from "./model";

export function create(gifLink: string): Gif {
    return Gif.insert(gifLink);
}

export function getById(id: u32): Gif {
    return Gif.findById(id);
}

export function upVote(id: u32): string {
    return Gif.upVote(id);
}

export function downVote(id: u32): string {
    return Gif.downVote(id);
}

export function get(offset: u32 = 0, limit: u32 = 10): Gif[] {
    return Gif.find(offset, limit);
}

export function update(id: u32, gifLink: string): Gif {
    return Gif.findByIdAndUpdate(id, gifLink);
}

export function del(id: u32): string {
    return Gif.findByIdAndDelete(id);
}
