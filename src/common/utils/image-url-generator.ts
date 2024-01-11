export const imageUrlGenerator = (host:string,filename:string):string => {
    return `http://${host}/images/${filename}`
}