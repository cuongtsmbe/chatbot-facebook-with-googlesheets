#google sheet example: 
https://docs.google.com/spreadsheets/d/17KwoPtSv5mx77c0PFg8VGLzZfyajCo-SDNNBiC1ltuw/edit?usp=sharing
https://docs.google.com/spreadsheets/d/100ebDMj7T8S3_sX9IftGdJ1AF7soH3OUYVVIfHKGDR4/edit#gid=0

+ Need share google sheet(any permission) for phanhuucuong05012001@gmail.com
because file credentials.json in https://console.cloud.google.com/apis/credentials?project=ngothanhtungggsheet of phanhuucuong05012001@gmail.com 


+ Bot will get value from google sheet if text(messenger) of user send is  _example : "sdt:32321032" or "madon:2131510"

config:
- If what change fanpage FB then goto .env -> change PAGE_ACCESS_TOKEN and VERIFY_TOKEN


Run:
Step 1 : goto path project
Step 2 : change MYSQL_HOST in .env is IP or container mysql
Step 3 (run project): ./run-up.sh   # this is docker compose up
                                    # if you want stop just run "./run-down.sh" in cmd
