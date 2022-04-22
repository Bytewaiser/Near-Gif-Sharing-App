import { Gif } from "./model";

export function create(gifLink: string): Gif {
    return Gif.insert(gifLink);
}
