export default function headers(token: string): any {
    const headers = { authorization: `Bearer ${token}` }

    return { headers }
}