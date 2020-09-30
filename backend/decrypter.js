var fs = require('fs');
var crypto = require('crypto');


function decrypter() {

    const fileContent = fs.readFileSync('backend.env', { encoding: 'utf8' });

    console.log(fileContent, "is the file content\n\n");
    // decrypt this using cryptojs


    const secret = process.env.CRYPTO_SECRET;
    const algo = 'aes-192-cbc';
    const key = crypto.scryptSync(secret, 'salt', 24);
    const iv = Buffer.alloc(16, 0);


    const decipher = crypto.createDecipheriv(algo, key, iv);
    let decryptedText = decipher.update(fileContent, 'base64', 'utf8');
    decryptedText += decipher.final('utf8')

    // make the file

    fs.writeFileSync('.env', decryptedText, { encoding: 'utf8' });

    console.log("\x1b[43m", '.env file created', "\x1b[0m");
}

decrypter();
