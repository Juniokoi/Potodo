export interface IItem {
    id: string,
    content: string,
    complete: boolean,
    totalSections: number,
    currentSection?: number,
}