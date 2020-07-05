var Bill = require('../model/bill.model');
module.exports = {
    getBill: async (req,res)=>{
        var data = await Bill.find();
        res.send(data);
        // console.log(data);
    },
    addBill: async (req,res)=>{
        let {bill} = req.body;
        let newBill = new Bill({nameUser: bill.nameUser, ad: bill.ad, sdt: bill.sdt, price: bill.price, status: bill.status});
        newBill.save();
        res.status(200).send();
    },
    handleStatus: async (req,res)=>{
        // console.log(req.body);
        let {_id, status} = req.body;
        await Bill.update({_id:_id}, { $set: { status: status } });
        res.send('22');
    },
    handleDelete: async (req,res)=>{
        // console.log(req.body);
        let {_id} = req.body;
        console.log(_id);
        Bill.deleteOne({ _id: _id }, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
          });
        res.send('22');
    }
}