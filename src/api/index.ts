import jsSHA from "jssha";

export function getEncrypt(toEncrypt: string): string {
    const shaPassword = new jsSHA("SHA-256", "TEXT", {encoding: "UTF8"})
    shaPassword.update(toEncrypt)

    return shaPassword.getHash("HEX")
}