import fs from "fs";
import path, { relative } from "path";
import { full as emoji } from "markdown-it-emoji";
import markdownitsub from "markdown-it-sub";
import markdownitsup from "markdown-it-sup";
import markdownitins from "markdown-it-ins";
import markdownitmark from "markdown-it-mark";
import markdownitfootnote from "markdown-it-footnote";
import markdownitdeflist from "markdown-it-deflist";
import markdownitabbr from "markdown-it-abbr"; 
import markdownitcontainer from "markdown-it-container";
import hljs from "highlight.js";

import markdownIt from "markdown-it";

//import codeCSS from "./all_css.js";
import { codeCSS,tableCSS,customCSS }  from "./all_css.js";

const inputDir = '../research_workbooks';
const outputDir = '../dist/research_workbooks';
const distURL = "https://thelibraryofbabel.in/"

const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    quotes: "“”‘’",
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return `<pre class="hljs"><code class="language-${lang}">` +
                   hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                   '</code></pre>';
          } catch (__) {}
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

md.use(emoji)
    .use(markdownitsub)
    .use(markdownitsup)
    .use(markdownitins)
    .use(markdownitmark)
    .use(markdownitfootnote)
    .use(markdownitdeflist)
    .use(markdownitabbr)
    .use(markdownitcontainer, "warning");


const convertMarkdownToHtml = (inputPath, outputPath, title, markdownFileName) => {
    const markdown = fs.readFileSync(inputPath, "utf-8");
    const result = md.render(markdown);
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <style>
            ${codeCSS}
            ${tableCSS}
            ${customCSS}
        </style>
    </head>
    <body>
        <div class="container" style="max-width:800px; margin: 10px auto 20px auto;">
            <a href="${distURL}research-workbooks/source/${markdownFileName}">View Markdown</a>
        </div>
        <div class="container" style="max-width:800px; margin: 0 auto;">
        ${result}
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    </body>
    </html>`;
    fs.writeFileSync(outputPath, htmlContent);   
};

const generateIndexFile = (dirPath, relativePath) => {
    const items = fs.readdirSync(dirPath).filter(item => !item.startsWith('.'));
    let links = items.map(item => {
        const itemPath = path.join(relativePath, item);
        if (fs.statSync(path.join(dirPath, item)).isDirectory()){
            return `<li><a href="${itemPath}/index.html">${item}</a></li>`;
        } else if (item.endsWith('.html')) {
            return `<li><a href="${itemPath}">${item}</a></li>`;
        }
    }).filter(link => link).join('\n');

    const indexPath = path.join(dirPath, 'index.html');
    const indexContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Index of ${relativePath}</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <style>${codeCSS}</style>  <!-- Include codeCSS -->
    </head>
    <body>
        <div class="container">
        <h1>Index of ${relativePath}</h1>
        <ul>
            ${links}
        </ul>
        </div>
    </body>
    </html>`;
    fs.writeFileSync(indexPath, indexContent);
}

const processDirectory = (srcDir, destDir) => {
    fs.mkdirSync(destDir, { recursive: true });
    const items = fs.readdirSync(srcDir).filter(item => !item.startsWith('.'));
    items.forEach(item => {
        
        const srcPath = path.join(srcDir, item);
        const destPath = path.join(destDir, item);

        if(fs.statSync(srcPath).isDirectory()){
            processDirectory(srcPath, destPath);
        } else if (item.endsWith('.md')) {
            const htmlPath = destPath.replace(/\.md$/, '.html');
            const htmlTitle = path.basename(htmlPath).replace(/\.html$/, '');
            const markDownFileName = path.basename(srcPath);
            convertMarkdownToHtml(srcPath, htmlPath, htmlTitle, markDownFileName);
        }
    });

    //generateIndexFile(destDir, path.relative(outputDir, destDir));
};

processDirectory(inputDir, outputDir);
//generateIndexFile(outputDir, '.');
//const result = md.render("# Hello, Markdown!");

//console.log(result)