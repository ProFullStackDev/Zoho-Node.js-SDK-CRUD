 
## 📌CRUD Operation using Zoho Node.js SDK(v2)
                

### 1. Basic Prerequirements
- Create a Zoho CRM account.  
https://crm.zoho.com/
- Create a Zoho API Console account.  
https://api-console.zoho.com/
- Download and Install Node.exe

### 2. How to run the code
- Setting environment variables( .env )

    - `CLIENT_ID, CLIENT_SECRET, GRANT_TOKEN` from Zoho Console API  
    Create a self client and generate code by using  
    ✓ Scope: ZohoCRM.module.ALL,ZohoCRM.settings.ALL,ZohoCRM.coql.READ  
    ✓ Time Duration: 3, 5min  
    ✓ Description: describe the function 
    - `CLIENT_NAME, CLIENT_EMAIL, REDIRECT_URL`

- Config global variables( config/index.json )

    - `LOCAL_BASE_DIR`  
    In Windows: C://Users  
    In Linus: Home
    - `SDK, SDK_API`  
    You can change SDK version using this global variable.

- Open the commmand prompt and run `npm install`, `npm start`

### 3. How to create, read, update, delete records

- Create a record   
    `https://{domain_address}/{module}/create?{query}`  
    ex: http://localhost:3030/leads/create?firstname=Charles&lastname=Bell&email=charles@gmail.com&phone=5553233&mobile=2322333

- Read records
    `https://{domain_address}/{module}/`
    ex: http://localhost:3030/contacts/ 

- Update a record
    `https://{domain_address}/{module}/update/{id}?{query}`  
    ex: http://localhost:3030/leads/update/5651123000000432011?firstname=Charles&lastname=Bell&phone=3234324&mobile=3434433&email=charles@gmail.com  

- Delete a record
    `https://{domain_address}/{module}/delete/{id}`  
    ex: http://localhost:3030/leads/delete/5651123000000432011
