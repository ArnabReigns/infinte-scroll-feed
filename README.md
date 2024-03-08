# Documentation

## Installation

### Clone the repository. It will consist of two folders. 
- client - React Website
- backend - Node + Express Server

### To run the frontend 
```shell
  cd client
  npm run dev
```
### To run the backend 
```shell
  cd backend
  npm run dev
```

### Important

#### Create a  `.env` file in the backend root folder which contains :

| VARIABLE  | DESCRIPTION | DEFAULT |
| ------------- | ------------- | ------------- |
| PORT  | PORT_NUMBER  | 3000 |
| SECRET_KEY  | A SECRET KEY  | "" |
| PROD | is in production or not | false |
| APP_PASSWORD | APP PASSWORD FOR GMAIL APP | null |

* APP_PASSWORD : If not given, users will be directly registered with an active account without email verification
* PORT : If changing port please change the URL in the frontend ```client/src/utils/api.js```. Port 3000 will work fine by default. 
