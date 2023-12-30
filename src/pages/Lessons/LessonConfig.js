import {main, Lesson1, Homework} from "./Lesson1.js";
import {Lesson2} from "./Lesson2.js";

export let config = [
    {
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
        "path": "Lesson1.js",
        "name": "Lesson1",
    },
    {
        "router": [
            {
                "name" : "Wellcome!",
                "function" : Lesson2,
                "url": "/2"
            },
        ],
        "path": "Lesson2.js",
        "name": "Lesson2",
    },
]

export default config;