export interface Account {
    id: number,
    marks: string[] | [],
    type: 'ldap' | 'local',
    login: string,
    pass: string | null,
}