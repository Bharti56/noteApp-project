Here's the **API schema** for the endpoints you mentioned:

---

### **1. Create Note**  
- **URL**: `localhost:9090/note/postnote`
- **Method**: `POST`

#### Request Body (JSON):
```json
{
    "title": "Test",
    "content": "Testing note app"
}
```

#### Response (JSON):
```json
{
    "title": "Test",
    "content": "Testing note app",
    "nid": 1
}
```

---

### **2. Get All Notes**  
- **URL**: `localhost:9090/note/getallnotes`
- **Method**: `GET`

#### Response (JSON):
```json
[
    {
        "title": "ttest",
        "content": "Ttesting note app",
        "nid": 1
    },
    {
        "title": "Test1",
        "content": "Testing note app 1",
        "nid": 2
    }
]
```

---

### **3. Get Note by ID**  
- **URL**: `localhost:9090/note/getnotebyid/{id}`
- **Method**: `GET`

#### Example URL:  
`localhost:9090/note/getnotebyid/2`

#### Response (JSON):
```json
{
    "title": "Test1",
    "content": "Testing note app 1",
    "nid": 2
}
```

---

### **4. Update Note**  
- **URL**: `localhost:9090/note/editnote/{id}`
- **Method**: `PUT`

#### Example URL:  
`localhost:9090/note/editnote/1`

#### Request Body (JSON):
```json
{
    "title": "ttest",
    "content": "Ttesting note app"
}
```

#### Response (JSON):
```json
{
    "title": "ttest",
    "content": "Ttesting note app",
    "nid": 1
}
```

---

### **Summary of Endpoints:**

| **Endpoint**                       | **Method** | **URL**                              | **Request Body (JSON)**                                       | **Response Body (JSON)**                                        |
|------------------------------------|------------|--------------------------------------|---------------------------------------------------------------|-----------------------------------------------------------------|
| **Create Note**                    | `POST`     | `/note/postnote`                     | `{"title": "Test", "content": "Testing note app"}`             | `{"title": "Test", "content": "Testing note app", "nid": 1}`    |
| **Get All Notes**                  | `GET`      | `/note/getallnotes`                  | N/A                                                           | `[{ "title": "ttest", "content": "Ttesting note app", "nid": 1 }, { "title": "Test1", "content": "Testing note app 1", "nid": 2 }]` |
| **Get Note by ID**                 | `GET`      | `/note/getnotebyid/{id}`             | N/A                                                           | `{"title": "Test1", "content": "Testing note app 1", "nid": 2}` |
| **Update Note**                    | `PUT`      | `/note/editnote/{id}`                | `{"title": "ttest", "content": "Ttesting note app"}`           | `{"title": "ttest", "content": "Ttesting note app", "nid": 1}`  |

---

### **Notes:**
1. Replace `{id}` in the `GET` and `PUT` URLs with the actual note ID you wish to query or update.
2. The `nid` (note ID) is generated when creating a note (`POST` request) and is used for retrieving, updating, or deleting notes.

This API schema should give a clear understanding of how the endpoints work. Let me know if you need any additional changes or details!