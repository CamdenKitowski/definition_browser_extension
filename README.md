# Definition Browser Extension
**Website:** https://www.definitionstation.info/

The webpage displays cards of data. Each card has a word, definition, part of speech, and pronunciation. The user can sort or randomize the words using the buttons at the top of the page.

![definitionStationWebPage](https://github.com/user-attachments/assets/06450908-7a56-4ca7-a23b-de0f3dba2a94)


## Chrome Extension
The Chrome extension was built using the Chrome developer mode. The myExtension folder was uploaded locally. The chrome extension scrapes the current web page looking for the word, definition, part of speech, and pronunciation using the add definition button. It must use the google webpage when searching for a word. Duplicate words will not be allowed. These attributes are processed and populated to the webpage. 

![image](https://github.com/user-attachments/assets/8130a763-3f2f-4a45-960b-3b721602fff0)

## Backend
The backend is hosted on a singular **AWS EC2 instance** (Amazon Linux) and leverages **Nginx**, **Gunicorn**, **Flask**, and **AWS RDS** to deliver a secure and scalable web application.

### Architecture

- **Nginx**:
   - Serves as a reverse proxy handling all HTTP/HTTPS requests
   - Uses Let's Encrypt for SSL certificates
   - Serves the HTML, CSS, and JS files
   - Ngnix routes all traffic to gunicorn
   - Configured in the EC2 file location - `/etc/nginx/nginx.conf`
 
- **Gunicorn**:
   - Operates as a WSGI (web server gateway interface) to facilitate communication between Nginx and Flask
   - Runs **four workers** to handle concurrent requests relatively efficiently.
   - Listens on `0.0.0.0:8080`
 
- **Flask**:
   - Powers the API, processing CRUD operations
   - Manages interactions between the AWS RDS MySQL Database

- **AWS RDS**:
   - Stores application data in MySQL database - word, definition, part of speech, pronunciation

 ![Architecture Diagram](https://github.com/user-attachments/assets/30cbac00-1f6e-4e26-be0a-49534802bfb5)
