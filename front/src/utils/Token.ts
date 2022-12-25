export default function headers(token: string | undefined): object {
    const headers = { authorization: `Bearer ${token}` }

    return { headers }
}