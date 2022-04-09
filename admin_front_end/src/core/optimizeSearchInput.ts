export function removeAccents(v:string) {
    const AccentsMap:string[] = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"
    ];

    for (let i=0; i < AccentsMap.length; i++) {
        const regex = new RegExp('[' + AccentsMap[i].substring(1) + ']', 'g');
        const char = AccentsMap[i][0];
        v = v.replace(regex, char);
    }

    return v;
}

export default function optimizeSearchInput(v: string){
    return removeAccents(v.toLowerCase());
}