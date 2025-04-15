import data from "./mock_data.json"

let sorted = false;
let nextId = data.length + 1;
const updateHistory = [];
let nextUpdateId = 1;

export function getContentById(id){
    console.log("searching content with id " + id);
    const view = data.filter(d => d.id === id);
    if (view.length === 1) return view[0];
    console.log("content not found");
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
        const short_content = content.slice(0, 128);
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

export async function createContent(title, image, content, id=-1){
    const thumb = await makeImg(image, 512, 350);
    const img = await makeImg(image);
    const date = new Date().toISOString();
    const newRow = {
        "id": id === -1 ? nextId : Number(id),
        "title": title,
        "content": content,
        "thumbnail": thumb,
        "image": img,
        "date": date,
        "author": "guest"
    }
    console.log(newRow);

    if (newRow.id === nextId){
        data.unshift(newRow);
        nextId+=1;
    }else{
        const index = data.findIndex(d => Number(d.id) === Number(id));
        if (index >= 0) {
            const oldRow = data.splice(index, 1);
            data.unshift(newRow);
            oldRow.updateDate = newRow.date;
            oldRow.updatedId = oldRow.id;
            oldRow.id = nextUpdateId;
            oldRow.UpdateType = "edit";
            updateHistory.push(oldRow);
            nextUpdateId++;
            console.log("updated content " + id);
        }
    }
    
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
    if (index >= 0) {
        const oldRow = data.splice(index, 1);
        oldRow.updateDate = new Date().toISOString();
        oldRow.updatedId = oldRow.id;
        oldRow.id = nextUpdateId;
        oldRow.UpdateType = "delete";
        updateHistory.push(oldRow);
        nextUpdateId++;
        console.log("removed content " + contentId);

    }
}

export async function editContent(title, image, content, id){
    if (!(image instanceof File)){
        const resp = await fetch(image);
        const blob = await resp.blob();
        const mimeType = blob.type || 'image/jpeg';
        image = new File([blob], "img", { type: mimeType });
    }

    return await createContent(title, image, content, id);
}