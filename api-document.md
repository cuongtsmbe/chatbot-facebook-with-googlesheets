## API details

# Login: `POST /authenticate/login/local`
    body :
            username: string,
            password: string
    

# Hash password: `GET /authentication/hash/password?password=pw_here`
    query :
            password: string

# Get all users: `GET /user/get/all?page=1`
    query :
            page: number

# Get user details by fanpage id: `GET /user/get/details/by/:fanpage_id`
    params :
            fanpage_id: string

# Add new user: `POST /user/add/new`
    body :
            fanpage_id      :String,            //id fanpage fanpage fb
            sheet_id        :String,            //google sheet id
            sheet_name      :String,            //google sheet name 
            sdt_column      :String,            //column of sdt as dev google sheet vd: D2:D
            madon_column    :String,            //column of madon as dev google sheet vd: E2:E
            start_column    :String,            //get data from start column    vd: A
            end_column      :String,            //get data to end column        vd: E
            key_fanpage     :String,            //key in fanpage page fb
            status          :number             //status for user   vd: 1


# Update user by fanpage id: `PUT /user/update/by/fbid`
    body :
            fanpage_id      :String,            
            sheet_id        :String,             
            sheet_name      :String,           
            sdt_column      :String,           
            madon_column    :String,         
            start_column    :String,       
            end_column      :String,         
            key_fanpage     :String,          
            status          :number              


# Update user status by ID: `PUT /user/update/status/by/fbid`
    body :
            fanpage_id      :String,            
            status          :number    


# Delete user by ID: `DELETE /user/delete/by/fbid`
    body :
            fanpage_id :String