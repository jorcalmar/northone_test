export interface ICategory {
    id: string
    name: string
}

export type ICategoryInput = Omit<ICategory, 'id'>