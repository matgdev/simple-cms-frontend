import data from "./mock_data.json"

export function getContentById(id){
    const view = data.filter(d => d.id === id);
    if (view.length === 1) return view[0];
    return null;
}

export function getContentList(limit = 9, offset = 0){
    const start = offset * limit;
    const view = data.slice(start, start + limit).map((item) => {
        const {id, title, thumbnail, content, date} = item;
        const short_content = content.slice(0, 60);
        return {id, title, thumbnail, content: short_content, date}
    });
    return view;
}

export function isValidId(cid) {
    return data.find((d) => d.id === cid) !== undefined;
}