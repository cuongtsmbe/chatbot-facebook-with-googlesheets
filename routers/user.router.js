const userModel = require("../models/user.model");
const LINK = require("../util/links.json");
const config    =require("../config/default.json");
module.exports = {
    userRouters:function(app){
        app.get(    LINK.ADMIN.USER_GET_ALL                                 ,this.get);
        app.get(    LINK.ADMIN.USER_GET_DETAILS_BY_FANPAGE_ID               ,this.getOneByFBID);
        app.post(   LINK.ADMIN.USER_ADD_NEW                                 ,this.add);
        app.put(    LINK.ADMIN.USER_UPDATE_BY_FANPAGE_ID                    ,this.update);
        app.put(    LINK.ADMIN.USER_UPDATE_STATUS_BY_FANPAGE_ID             ,this.updateStatus);
        app.delete( LINK.ADMIN.USER_DELETE_BY_FANPAGE_ID                    ,this.delete);
    },

    //get by page
    get:async function(req,res,next){
        //set default page
        if(req.query.page==undefined || req.query.page<=0 || isNaN(req.query.page)){
            req.query.page=1;
        }

        var condition={
            limit:config.limitUser,
            offset:config.limitUser*(req.query.page-1),
        };
        try{
            var [count,result]=await Promise.all([
                    userModel.countAll(),
                    userModel.getList(condition)
            ]);
        }catch(e){
            console.log(e);
            return res.status(500).send("server error ");
        }

        return res.status(200).json({
            code:1,
            datalength:result.length,
            data:result,
            countAll:count[0],
            PageCurrent:req.query.page,
            TotalPage:Math.ceil(1.0*count[0].count/config.limitUser)
        })

    },

    //get one by condition fanpage_id
    getOneByFBID:async function(req,res,next){
        //condition fanpage_id
        var condition={
            fanpage_id:req.params.fanpage_id
        };
        
        try{
            //query to DB and get user
            var result= await userModel.getOneByFBID(condition);
        }catch(e){
            console.log(e);
            return res.status(500).send("server error ");
        }

        return res.status(200).json({
            code:2,
            data:result
        })
    },
    //add new user
    add:async function(req,res,next){

        var value={
            fanpage_id      :req.body.fanpage_id,           //id fanpage fanpage fb
            sheet_id        :req.body.sheet_id,             //google sheet id
            sheet_name      :req.body.sheet_name,           //google sheet name 
            sdt_column      :req.body.sdt_column,           //column of sdt as dev google sheet like D2:D
            madon_column    :req.body.madon_column,         //column of madon as dev google sheet like E2:E
            start_column    :req.body.start_column,         //get data from start column
            end_column      :req.body.end_column,           //get data to end column
            key_fanpage     :req.body.key_fanpage,          //key in fanpage page fb
            status          :req.body.status                //status for user
        };

        try{
            //check fanpage id had exist in DB or not
            var data = await userModel.getOneByFBID({fanpage_id:value.fanpage_id});

            if(data.length>0){
                return res.status(400).json({
                    code:1,
                    mess:`Them khong thanh cong. ${value.fanpage_id} had exist`
                });
            }

            //insert to Db
            var result=await userModel.add(value);
        }catch(e){
            console.log(e);
            return res.status(500).json({
                    code:2,
                    mess:"server error "
                });
        }
        if(result.affectedRows==0){
            return res.status(400).json({
                    code:3,
                    message:"Them khong thanh cong"
                })
        }
        return  res.status(200).json({
                    status:4,
                    message:"Them thanh cong"
                })
        
    },

    //update value by fanpage id fb
    update:async function(req,res,next){
        //condition fanpage id
        var condition={
            fanpage_id:req.body.fanpage_id
        }
        var value={
            sheet_id        :req.body.sheet_id,             //google sheet id
            sheet_name      :req.body.sheet_name,           //google sheet name 
            sdt_column      :req.body.sdt_column,           //column of sdt as dev google sheet like D2:D
            madon_column    :req.body.madon_column,         //column of madon as dev google sheet like E2:E
            start_column    :req.body.start_column,         //get data from start column
            end_column      :req.body.end_column,           //get data to end column
            key_fanpage     :req.body.key_fanpage,          //key in fanpage page fb
            status          :req.body.status                //status for user
        };

        try{
            //update to Db
            var result=await userModel.update(condition,value);
        }catch(e){
            console.log(e);
            return res.status(500).json({
                    code:2,
                    mess:"server error "
                });
        }
        if(result.affectedRows==0){
            return res.status(400).json({
                    code:3,
                    message:`update ${condition.fanpage_id} khong thanh cong`
                })
        }
        return  res.status(200).json({
                    status:4,
                    message:`update ${condition.fanpage_id} thanh cong`
                })
        
    },

    //update status by fanpage fb id
    updateStatus:async function(req,res,next){
        //condition fanpage id
        var condition={
            fanpage_id      :req.body.fanpage_id
        }
        var value={
            status          :req.body.status                //status for user
        };

        try{
            //update to Db
            var result=await userModel.update(condition,value);
        }catch(e){
            console.log(e);
            return res.status(500).json({
                    code:2,
                    mess:"server error "
                });
        }
        if(result.affectedRows==0){
            return res.status(400).json({
                    code:3,
                    message:`update status ${condition.fanpage_id} khong thanh cong`
                })
        }
        return  res.status(200).json({
                    status:4,
                    message:`update status ${condition.fanpage_id} thanh cong`
                })
    },

    //delete by fanpage id
    delete: async function(req,res,next){
        //get fanpage fb id
        var condition={
            fanpage_id :req.body.fanpage_id
        };

        try{
            //query DB to delete with condition fanpage_id
            var result=await userModel.delete(condition);
        }catch(e){
            console.log(e);
            return res.status(500).json({
                    code:2,
                    mess:"server error "
                });
        }
        if(result.affectedRows==0){
            return res.status(400).json({
                    code:3,
                    message:`delete ${condition.fanpage_id} khong thanh cong`
                })
        }

        return  res.status(200).json({
                    status:4,
                    message:`delete ${condition.fanpage_id} thanh cong`
                })
    }



}