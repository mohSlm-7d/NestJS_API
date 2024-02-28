import * as bcrypt from 'bcrypt';
export async function encryptText(text: string): Promise<string>{
    let encryptedText = "";
    await bcrypt.hash(text, 10).then(returnedText => {
        encryptedText = returnedText;
    });
    
    return Promise.resolve(encryptedText);
}