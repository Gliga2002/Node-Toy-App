const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res, next) => {
  const url = req.url;
  const method = req.method;
  if (url === '/' && method === 'GET') {
    // Read the file content
    fs.readFile('./index.html', (err, htmlContent) => {
      if (err) {
        console.error(err);
        res.write('Error reading the file');
        return;
      }
      // Čitaj CSS datoteku
      fs.readFile('./styles.css', 'utf-8', (err, cssContent) => {
        if (err) {
          console.error(err);
          res.writeHead(404);
          res.end('CSS file not found');
          return;
        }

        // Spoji HTML i CSS sadržaj
        const combinedContent = `${htmlContent}\n<style>${cssContent}</style>`;

        // Postavi odgovarajući Content-Type zaglavlje
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // Pošalji kombinovani sadržaj kao odgovor
        res.end(combinedContent);
      });
    });
  } else if (url === '/about' && method === 'GET') {
    // Set the content type based on the file type
    res.setHeader('Content-Type', 'text/html'); // Change 'text/html' to appropriate content type

    // Read the file content
    fs.readFile('./about.html', (err, data) => {
      if (err) {
        console.error(err);
        res.write('Error reading the file');
        return;
      }

      // Send the file content as the response
      res.write(data);
      res.end();
    });
  } else if (url === '/contact-me' && method === 'GET') {
    // Set the content type based on the file type
    res.setHeader('Content-Type', 'text/html'); // Change 'text/html' to appropriate content type

    // Read the file content
    fs.readFile('./contact-me.html', (err, data) => {
      if (err) {
        console.error(err);
        res.write('Error reading the file');
        return;
      }

      // Send the file content as the response
      res.write(data);
      res.end();
    });
  } else {
    // Set the content type based on the file type
    res.setHeader('Content-Type', 'text/html'); // Change 'text/html' to appropriate content type

    // Read the file content
    fs.readFile('./404.html', (err, data) => {
      if (err) {
        console.error(err);
        res.write('Error reading the file');
        return;
      }

      // Send the file content as the response
      res.write(data);
      res.end();
    });
  }
});

server.listen(8080);
