export default function Token(token: string) {
    const headers = { authorization: `Bearer ${token}` }
    return headers
}