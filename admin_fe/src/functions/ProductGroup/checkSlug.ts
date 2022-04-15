import axios from "axios";
import LAPIS_STATICS from "../../core/LAPIS_STATICS";

interface ICheckSlugResponseData{
    isExisted: boolean
}

export default async function checkSlug(slug?: string, id?: string): Promise<boolean>{
    if(!slug) return false;
    
    const re = /^[a-z0-9-]+$/;
    if(!re.test(slug)){
        return false;
    }

    try{
        const res = await axios({
            url: `${LAPIS_STATICS.API_HOST}/admin/product/check-slug`,
            method: 'GET',
            params: {
                slug: slug,
                id: id
            },
        });

        if(res.status !== 200) return false;

        if(!res.data) return false;

        const responseData:ICheckSlugResponseData = res.data;

        return responseData.isExisted;
    }
    catch(e){
        return false;
    }
}