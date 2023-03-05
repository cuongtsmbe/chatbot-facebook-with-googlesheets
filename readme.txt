#google sheet example: 
https://docs.google.com/spreadsheets/d/17KwoPtSv5mx77c0PFg8VGLzZfyajCo-SDNNBiC1ltuw/edit?usp=sharing
https://docs.google.com/spreadsheets/d/100ebDMj7T8S3_sX9IftGdJ1AF7soH3OUYVVIfHKGDR4/edit#gid=0

+chay nhieu cau truc sheet . tuy theo config tai DB(
    `fanpage_id`    :fanpage id in facebook
    `sdt_column`    :data begin of sdt vd D6:D is column D , begin at row 6
    `madon_column`  :data begin of madon
    `start_column`, `end_column` : get data from column 'start_column' to 'end_column' vd :from A to D 
    `key_fanpage`   :page_access_token fanpage facebook of 'fanpage_id'
    `sheet_id`      :is spreadsheetid of google sheet
)

+ Need share google sheet(any permission) for phanhuucuong05012001@gmail.com
because file credentials.json in https://console.cloud.google.com/apis/credentials?project=ngothanhtungggsheet of phanhuucuong05012001@gmail.com 


+ Bot will get value from google sheet if text(messenger) of user send is  _example : "sdt:32321032" or "madon:2131510"

config:
- If what change webhook key fanpage FB then goto .env -> VERIFY_TOKEN


Run:
Step 1 : goto path project
Step 2 : change MYSQL_HOST in .env is IP or container mysql
Step 3 (run project): ./run-up.sh   # this is docker compose up
                                    # if you want stop just run "./run-down.sh" in cmd
