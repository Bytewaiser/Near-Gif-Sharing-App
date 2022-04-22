import { Gif, PartialGif } from "./model";

export function create(gifLink: string): Gif {
    return Gif.insert(gifLink);
}

export function getById(id: u32): Gif {
    return Gif.findById(id);
}

export function get(offset: u32 = 0, limit: u32 = 10): Gif[] {
    return Gif.find(offset, limit);
}

export function update(id: u32, updates: PartialGif): Gif {
    return Gif.findByIdAndUpdate(id, updates);
}

export function del(id: u32): void {
    Gif.findByIdAndDelete(id);
}
