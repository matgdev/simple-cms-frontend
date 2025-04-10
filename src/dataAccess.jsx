import data from "./mock_data.json"

let sorted = false;
let nextId = data.length + 1;

export function getContentById(id){
    const view = data.filter(d => d.id === id);
    if (view.length === 1) return view[0];
    return null;
}

export function getContentList(limit = 9, offset = 0){
    if (!sorted){
        data.sort((a, b) => a.date > b.date ? -1 : a.date === b.date ? 0 : 1);
        sorted = true;
    }
    
    const start = offset * limit;
    const view = data.slice(start, start + limit).map((item) => {
        const {id, title, thumbnail, content, date, author} = item;
        const short_content = content.slice(0, 60);
        return {id, title, thumbnail, content: short_content, date, author}
    });
    return view;
}

export function isValidId(cid) {
    return data.find((d) => d.id === cid) !== undefined;
}

export function getNumberOfPages(limit){
    return Math.ceil(data.length / limit);
}

export async function createContent(title, image, content){
    const thumb = await makeImg(image, 512, 288);
    const img = await makeImg(image);
    const date = new Date().toISOString();
    const newRow = {
        "id": nextId,
        "title": title,
        "content": content,
        "thumbnail": thumb,
        "image": img,
        "date": date,
        "author": "guest"
    }
    console.log(newRow);
    data.unshift(newRow);
    nextId+=1;
}

async function makeImg(imgFile, w = -1, h = -1){
    
    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = async () => {

                if (w === -1 || h === -1){        
                    w = img.width;
                    h = img.height;
                }

                const canvas = new OffscreenCanvas(w, h);
                canvas.getContext("2d").drawImage(img, 0, 0, w, h);

                const blob = await canvas.convertToBlob();
                resolve(URL.createObjectURL(blob));
            }

            img.onerror = (err) => reject(`Could not load image: ${err}`);

            img.src = reader.result;
        }

        reader.onerror = (err) => reject(`Could not open file:`, err);
        
        reader.readAsDataURL(imgFile);

    });
    

}

export async function removeContent(contentId){
    const index = data.findIndex(d => d.id === contentId);
    if (index >= 0) data.splice(index, 1);
}