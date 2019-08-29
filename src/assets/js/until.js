export default function getData(str) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(str);
        },2000);
        
    })
}