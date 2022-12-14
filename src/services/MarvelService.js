
// otdelnij class kotorij budet na chistom js
class MarvelService {
    /*  Shorten url from server  */
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';  
    _apiKey = 'apikey=e5160e472c9fe20c74b008126b32bdc6';
    _baseOffset = 210;
    /* Shorten, because value in url similar*/


    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]); 
    }

    /* if variable start with _ must to be careful 
    because if something will changes in function must to be error  */
    _transformCharacter = (char) => {
        return {
            /* Date transform */
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 150)} ... ` : `No descriptions`,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;