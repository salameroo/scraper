const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function getOrAddCookies(url, cookiesFile) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url);
    console.log("Por favor, acepta las cookies en el navegador y cierra la pestaña para continuar...");

    await new Promise(resolve => setTimeout(resolve, 10000));  // Espera 10 segundos o ajusta el tiempo necesario

    const cookies = await page.cookies();

    // Guarda las cookies en la carpeta `cookies`
    const cookiesPath = path.join(__dirname, 'cookies', cookiesFile);
    fs.writeFileSync(cookiesPath, JSON.stringify(cookies));

    await browser.close();
}

// async function scrapeOrigin(url, cookiesFile, palabraClave) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // Cargar las cookies desde el archivo
//     const cookiesPath = path.join(__dirname, 'cookies', cookiesFile);
//     const cookies = JSON.parse(fs.readFileSync(cookiesPath));
//     await page.setCookie(...cookies);
//     await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });

//     // Extraer información de etiquetas <article> y filtrar por palabra clave
//     const datos = await page.evaluate((palabraClave) => {
//         const resultados = [];

//         // Buscar todos los elementos <article>
//         const articles = document.querySelectorAll('article');

//         articles.forEach(article => {
//             // Seleccionar el título dentro del <article> (ajusta los selectores según la estructura del sitio)
//             const title = article.querySelector('h1, h2, h3')?.innerText || "";  // Usamos títulos dentro de <article>
//             const link = article.querySelector('a')?.href || "";  // Enlace del artículo
//             const content = article.innerText || "";  // Contenido completo del <article>

//             // Filtrar por palabra clave en título o contenido
//             if ((title.includes(palabraClave) || content.includes(palabraClave)) && title) {
//                 resultados.push({ title, link, content });
//             }
//         });

//         return resultados;
//     }, palabraClave);  // Pasamos `palabraClave` a `evaluate`

//     // Guardar los datos en una carpeta específica para la página
//     const pageFolderName = url.replace(/https?:\/\//, '').split('/')[0];
//     const resultsPath = path.join(__dirname, 'scraping_results', pageFolderName);
//     if (!fs.existsSync(resultsPath)) {
//         fs.mkdirSync(resultsPath, { recursive: true });
//     }

//     // Guardar los datos en un archivo JSON dentro de la carpeta
//     const outputFilePath = path.join(resultsPath, 'filtered_data.json');
//     fs.writeFileSync(outputFilePath, JSON.stringify({ url, datos }, null, 4));

//     await browser.close();
//     return datos;
// }



// Función para preguntar al usuario en la terminal
function preguntaUsuario(pregunta) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => rl.question(pregunta, respuesta => {
        rl.close();
        resolve(respuesta.toLowerCase() === 's'); // Retorna true si el usuario responde "s"
    }));
}

async function scrapeOrigin(url, cookiesFile, palabraClave = "", limiteArticulos = 5) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const cookiesPath = path.join(__dirname, 'cookies', cookiesFile);
    const cookies = JSON.parse(fs.readFileSync(cookiesPath));
    await page.setCookie(...cookies);
    await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });

    // Extraer artículos y clasificar por palabra clave
    const resultados = await page.evaluate((palabraClave) => {
        const conPalabraClave = [];
        const sinPalabraClave = [];
        const articles = document.querySelectorAll('article');

        articles.forEach(article => {
            const title = article.querySelector('h1, h2, h3')?.innerText || "";
            const link = article.querySelector('a')?.href || "";
            const content = article.innerText || "";
            const fullText = `${title} ${content}`;
            const contienePalabra = palabraClave && fullText.toLowerCase().includes(palabraClave.toLowerCase());

            const articulo = { title, link, content };
            if (contienePalabra) {
                conPalabraClave.push(articulo);
            } else {
                sinPalabraClave.push(articulo);
            }
        });

        return { conPalabraClave, sinPalabraClave };
    }, palabraClave);

    const pageFolderName = url.replace(/https?:\/\//, '').split('/')[0];
    const resultsPath = path.join(__dirname, 'scraping_results', pageFolderName);
    if (!fs.existsSync(resultsPath)) {
        fs.mkdirSync(resultsPath, { recursive: true });
    }

    // Guardar artículos iniciales
    fs.writeFileSync(path.join(resultsPath, `articles_con_palabra.json`), JSON.stringify(resultados.conPalabraClave, null, 4));
    fs.writeFileSync(path.join(resultsPath, `articles_sin_palabra.json`), JSON.stringify(resultados.sinPalabraClave, null, 4));

    // Preguntar si se desea scrapear cada enlace en profundidad
    const deseaScrapearEnlaces = await preguntaUsuario("¿Deseas scrapear el contenido completo de cada artículo? (s/n): ");

    if (deseaScrapearEnlaces) {
        const articulosEnProfundidad = [];
        for (let i = 0; i < Math.min(resultados.conPalabraClave.length, limiteArticulos); i++) {
            const articulo = resultados.conPalabraClave[i];
            const contenidoCompleto = await scrapeContenidoCompleto(articulo.link, browser);
            articulosEnProfundidad.push({ ...articulo, contenidoCompleto });
        }

        // Guardar el contenido completo en un archivo separado
        fs.writeFileSync(path.join(resultsPath, `articles_contenido_completo.json`), JSON.stringify(articulosEnProfundidad, null, 4));
    }

    await browser.close();
    return resultados;
}

// Función para scrapear el contenido completo de un enlace específico
async function scrapeContenidoCompleto(url, browser) {
    try {
        const page = await browser.newPage();
        await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });

        // Extraer todo el texto de la página del artículo
        const contenidoCompleto = await page.evaluate(() => document.body.innerText);

        await page.close();
        return contenidoCompleto;
    } catch (error) {
        console.error(`Error al scrapear el contenido completo de ${url}:`, error);
        return null;
    }
}

module.exports = { scrapeOrigin };


module.exports = { getOrAddCookies, scrapeOrigin };
