export default interface ICategory {
    _id: string;
    title: string;
    parentId?: string;
    createdAt: Date;
    updatedAt: Date;
}
