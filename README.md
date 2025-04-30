# Definition-Browser-Extension
**Website:** https://www.definitionstation.info/

The webpage displays cards of data. Each card has a word, definition, part of speech, and pronunciation. The user can sort or randomize the words using the buttons at the top of the page.

## Chrome Extension
The Chrome Extension was built using the Chrome developer mode with the myExtension folder. The chrome extension scrapes the current web looking for the word, definition, part of speech, and pronunciation using the add definition button. It must use the google webpage when searching for a word. Duplicate words will not be allowed. These attributes are processed and populated to the webpage. 

![image](https://github.com/user-attachments/assets/8130a763-3f2f-4a45-960b-3b721602fff0)

## Backend
The backend consists of an AWS EC2 instance, nginx, gunicorn, flask, and AWS RDS. All traffic runs through nginx. Ngnix handles all requests and serves the HTML, CSS, JS code. The web application uses HTTPS. Lets's Encrypt generated SSL certificates. The nginx.conf was heavily manipulated in the entire process. Gunicorn manages the requests from ngnix with the gunicorn workers. There are four works working on port 8080. Gunicorn runs on top of Flask. Flask recevies these requests and handles these POST/GET requests accordingly. Flask updates or receives data from the AWS RDS. 


 ![Architecture Diagram](https://github.com/user-attachments/assets/30cbac00-1f6e-4e26-be0a-49534802bfb5)
