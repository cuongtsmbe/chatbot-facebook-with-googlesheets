const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'authentication/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'authentication/credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

//text is phone "sdt:323210" or code "madon:2131510" order 
async function listMajors(auth,text,user) {
    const sheets = google.sheets({version: 'v4', auth});
    var res=null;
    var rows=0;
    //lay thong tin sheet id của user
    var spreadsheetId=user.sheet_id;
    //code is phone number or order code.
    var code=null;
    var startRow;//row begin need search of data(not include header) example D6:D then startRow is D6

    if(text.includes("sdt:")){
        //get number phone | delete space character
        code = text.split(":")[1].replace(/\s/g, '');

        startRow=user.sdt_column.split(":")[0];

        res = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: `${user.sheet_name}!${user.sdt_column}`, //column of phone vd D2:D is cot D start từ dòng 2
        });
       
    }else if(text.includes("madon:")){
        //get order code | delete space character
        code = text.split(":")[1].replace(/\s/g, '');

        startRow=user.madon_column.split(":")[0];

        res = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: `${user.sheet_name}!${user.madon_column}`, //colum of order vd E2:E
        });
    }

    //can't found
    rows = res.data.values;
    if (!rows || rows.length === 0) {
        return null;
    }

    var resultRowsSearch = [];
   
    //get row begin of data need search
    // example D62:D then numberBegin is '62'
    var str = startRow;
    var match = str.match(/^[^\d]+(\d+)/);
    var numberBegin = match ? match[1] : null;
    if(numberBegin===null){
      numberBegin=2;
    }
    numberBegin=parseInt(numberBegin);

    //search rows have data need search
    for(var i=0;i<rows.length;i++){
        
        if(rows[i][0].replace(/\s/g, '') == code){
            let row=i+numberBegin;
            //get all information of user
            let dataOut = await sheets.spreadsheets.values.get({
                spreadsheetId: spreadsheetId,
                //range: `${user.sheet_name}!A${row}:D${row}`, // lay thong tin cot A -> D dong row
                range: `${user.sheet_name}!${user.start_column}${row}:${user.end_column}${row}`,
            });
            //Đưa ra tất cả thông tin tìm được có trong sheet
            resultRowsSearch.push(dataOut.data.values);
          
        }
    };
    return resultRowsSearch;
}

module.exports={
  authorize,
  listMajors,
};

