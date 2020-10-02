var fs = require('fs');
var crypto = require('crypto')

function encrypter() {
    const fileContent = fs.readFileSync('.env', { encoding: 'utf8' });

    // encrypt this using crypto
    const secret = process.env.CRYPTO_SECRET;
    const algo = 'aes-192-cbc';
    const key = crypto.scryptSync(secret, 'salt', 24);
    const iv = Buffer.alloc(16, 0);

    const cipher = crypto.createCipheriv(algo, key, iv);
    let encryptedText = cipher.update(fileContent, 'utf8', 'base64');
    encryptedText += cipher.final('base64');

    console.log(encryptedText);

    // make the file

    fs.writeFileSync('frontend.env', encryptedText, { encoding: 'utf8' });

    console.log("\x1b[43m", 'frontend.env file created', "\x1b[0m");
}

encrypter();