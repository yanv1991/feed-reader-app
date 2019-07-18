import { isValidURL } from './helpers'

describe("isValidURL fn", () => {
    let actual
    it('works', () => {
        actual= isValidURL("http://google.com")
        expect(actual).toBe(true)
    });

    it('fails', () => {
        actual= isValidURL("no url")
        expect(actual).toBe(false)
    });
})