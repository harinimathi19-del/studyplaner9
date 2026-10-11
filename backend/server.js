const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const frontendPath = path.join(__dirname, "..", "frontend");


const server = http.createServer((req, res) => {

    let filePath;


    if (req.url === "/") {

        filePath =
            path.join(frontendPath, "index.html");

    } else {

        filePath =
            path.join(frontendPath, req.url);
    }


    fs.readFile(filePath, (error, content) => {

        if (error) {

            res.writeHead(404, {
                "Content-Type": "text/plain"
            });

            res.end("404 - File Not Found");

            return;
        }


        const extension =
            path.extname(filePath);


        const types = {

            ".html": "text/html",

            ".css": "text/css",

            ".js": "application/javascript"
        };


        res.writeHead(200, {

            "Content-Type":
                types[extension] || "text/plain"

        });


        res.end(content);

    });

});


server.listen(PORT, () => {

    console.log(
        `StudyFlow running at http://localhost:${PORT}`
    );

});