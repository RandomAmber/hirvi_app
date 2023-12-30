
let config = {
    "router": [
        {
            "name" : "Wellcome!",
            "function" : main,
            "url": "/1"
        },
        {
            "name" : "Wellcome!",
            "function" : Lesson1,
            "url": "/1/1"
        },
        {
            "name" : "Homework",
            "function" : Homework,
            "url": "/1/2"
        }
    ],
    "path": "Lesson1.js"
}

export function Lesson1() {
    return <>
    <h1>Subsection1</h1>
    </>
}

export function main(){
    return <>
    <h1>Main</h1>
    </>
}

export function Homework() {
    return <>
    <h1>Homework!!</h1>
    </>
}

export default config;