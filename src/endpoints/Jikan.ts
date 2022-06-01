import fetch from "node-fetch";
import { JikanOptions } from "../static/Interfaces";
import Anime from "./Anime";
import Manga from "./Manga";
import Characters from "./Characters";

export default class Jikan {
    private BASEURL: string;
    /**
        @type {Anime} Anime class
        @name Jikan anime
     */
    public anime: Anime;
    
    /**
     * @type {Manga} Manga class 
     * @name Jian manga
     */
    public manga: Manga;
    public characters: Characters;

    constructor(options?: JikanOptions) {
        if(options) {
            this.BASEURL = `http${options.secure ? "s": ""}://${options.host}:${options.port}`;
        } else {
            this.BASEURL = "https://api.jikan.moe/v4";
        }

        this.anime = new Anime(this);
        this.manga = new Manga(this);
        this.characters = new Characters(this);
    }
    
    public async do_GET_Request(url: string): Promise<any> {
        return await fetch(`${this.BASEURL}${url}`, {
            method: "GET"
        }).then((res) => res.json());
    }
    
}