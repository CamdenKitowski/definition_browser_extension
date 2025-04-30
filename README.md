# Definition-Browser-Extension
**Website:** https://www.definitionstation.info/

The webpage displays cards of data. Each card has a word, definition, part of speech, and pronunciation. The user can sort or randomize the words using the buttons at the top of the page.

## Chrome Extension
The Chrome Extension was built using the Chrome developer mode with the myExtension folder. The chrome extension scrapes the current web looking for the word, definition, part of speech, and pronunciation using the add definition button. It must use the google webpage when searching for a word. Duplicate words will not be allowed. These attributes are processed and populated to the webpage. 

![image](https://github.com/user-attachments/assets/8130a763-3f2f-4a45-960b-3b721602fff0)

## Backend
The backend consists of an AWS EC2 instance, nginx, gunicorn, flask, and AWS RDS. Nginx acts as a reverse proxy handling all requests and serves the HTML, CSS, JS code. Nginx routes all traffic to gunicorn on port 8080. The web application uses HTTPS. Lets's Encrypt generated SSL certificates. The nginx.conf was manipulated in the entire process. Gunicorn runs as a WSGI (web server gateway interface). It is a standarized way for python application to communicate with web servers. There are four gunicorn working to handle concurrent requests relatively efficiently. Gunicorn runs on top of Flask. Flask recevies these requests and handles these POST/GET requests accordingly. Flask updates/receives data from the AWS RDS. 

 ![Architecture Diagram](https://github.com/user-attachments/assets/30cbac00-1f6e-4e26-be0a-49534802bfb5)
