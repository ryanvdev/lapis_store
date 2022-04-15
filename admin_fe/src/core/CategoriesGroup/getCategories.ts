import axios from 'axios';
import LAPIS_STATICS from '../LAPIS_STATICS';
import ICategory from '../types/ICategory';

export default async function getCategories(): Promise<ICategory[] | undefined> {
    try {
        const res = await axios({
            url: `${LAPIS_STATICS.API_HOST}/admin/category/list`,
            method: 'GET',
            data: {
                name: 'tuan nguyen',
            },
        });

        if (res.status !== 200) {
            return undefined;
        }

        return res.data;
    } catch (e) {
        return undefined;
    }
}
