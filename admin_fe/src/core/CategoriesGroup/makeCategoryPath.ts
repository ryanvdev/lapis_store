import ICategory from '../types/ICategory';

export default function makeCategoryPath(
    categories: ICategory[],
    category: ICategory,
): string {
    if (!category.parentId) {
        return category.title;
    }

    const getParentPath = (v: ICategory): string => {
        if (!v.parentId) return v.title;

        const parent = categories.find((item) => {
            if (!v.parentId) return false;
            return item._id.toString() === v.parentId.toString();
        });

        if (!parent) return v.title;

        return `${getParentPath(parent)}/${v.title}`;
    };

    const path = `${getParentPath(category)}`;
    return path;
}
