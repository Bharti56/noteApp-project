const apis = () => {

    return{

        getAll: async () => {
            return fetch('http://localhost:9090/note/getallnotes').then((response) => response.json())
        },
        getById: async (id: string) => {
            const response = await fetch('/getNote/' + id)
            return await response.json()
        },
        create: async (note: any) => {
            const response = await fetch('/createNote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })
            return await response.json()
        },
        update: async (note: any) => {
            const response = await fetch('/updateNote' + note.nid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })
            return await response.json()
        },
        delete: async (id: string) => {
            const response = await fetch('/deleteNote/' + id, {
                method: 'DELETE'
            })
            return await response.json()
        }

    }

}

export default apis;