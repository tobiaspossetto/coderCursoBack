 const fs = require('fs');
const messages = []
 const Controller ={

    
    saveMessage: async (info) => {
        const message = {
            'email':info.email, 
            "message": info.message,
            "date": new Date()
        }
      messages.push(message);
        await fs.promises.writeFile('src/messages.txt',   JSON.stringify(messages))
        
    },
    getMessages: async () => {
        try {
            let data = await fs.promises.readFile('src/messages.txt')
            data = await JSON.parse(data)
            return data
        } catch (error) {
            console.error(error)
        }
       
    }

    
}

module.exports = Controller;