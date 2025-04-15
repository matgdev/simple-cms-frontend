export function formatContentBreaks(text){
    const prg = text.split(/\n\r?/);
    const children = prg.map( (p, idx) => p.length === 0 ? <br /> : <span className={`d-block mb-1 w-100`} key={idx}>{p}</span>)
    return children;
}