import React, { Component } from 'react';
import Home from "../Home";
import styled from 'styled-components';
import Delay from "../Delay";
import Done from "../Done";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const axios = require('axios');
// const listOders = [
//     {id:1, nameUser:"Phong", ad:"812-LLQ", sdt:"012931238",price:120,status: 2},
//     {id:2, nameUser:"Phuong", ad:"111-LPQ", sdt:"0144334",price:220,status: 3},
//     {id:3, nameUser:"Hau", ad:"44-OLA", sdt:"12313",price:320,status: 2},
//     {id:4, nameUser:"Huy", ad:"44-OLA", sdt:"12313",price:320,status: 1} 
//     // 1: chờ 2: hoàn thành 3: delay
// ]

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
           listOders: []
        }
        
    }
    componentDidMount(){
        this.getData();
        // this.setState({
        //     listOders: 
        // })
    }
    async getData(){
        let res = await axios.get("http://localhost:3001/bill");
        this.setState({
            listOders: [...res.data]
        })
    }
    handleDone = async (item) =>{
        
        await axios.post("http://localhost:3001/bill/handleStatus",{status: 2,_id:item._id});

        this.getData();
        
    }
    handleDelay = async(item) =>{

        await axios.post("http://localhost:3001/bill/handleStatus",{status: 3,_id:item._id});

        this.getData();
        
    }
    remove = async(item) =>{
        
        await axios.post("http://localhost:3001/bill/handleDelete",{_id:item._id});

        this.getData();
    }
    addOrderItem = async (name,price,phone,ad)=>{
        let value = { nameUser:name, ad:ad, sdt:phone,price:price,status: 1}
        await axios.post("http://localhost:3001/bill/addBill",{bill: value});
        this.getData();

        // this.setState({
        //     listOders:[
        //         ...this.state.listOders,
        //         value
        //     ]
        // })
    }
    render() {
        
        const ColorBtn = {
            color:"black"
        }
        const {listOders} = this.state;
        return (
                <BoxShip>
                    <Router>
                
                <Switch>
                <Route exact path="/" > 
                        <Home listOders = {listOders} addOrderItem ={this.addOrderItem}  handleDone={this.handleDone} handleDelay={this.handleDelay}/>

                    </Route>
                    <Route path="/done"> 
                        <Done listOders = {listOders} remove = {this.remove}/>

                    </Route>
                   <Route path="/delay"> 
                        <Delay  listOders = {listOders} handleDone={this.handleDone}  />

                    </Route>
                </Switch>
                <div className="bot">
                    <button><Link to="/" style= {ColorBtn}>   ĐƠN HÀNG CHỜ</Link></button>
                    <button><Link to="/done" style= {ColorBtn}>ĐƠN HÀNG ĐÃ HOẢN THÀNH</Link></button>
                    <button><Link to="/delay" style= {ColorBtn}>ĐƠN HÀNG DELAY/CANCEL</Link></button>
                    
                </div>
            </Router>
            

                </BoxShip>
        );
    }
}
export default App;
const BoxShip = styled.div `
    width: 450px;
	height: 830px;
	border: 2px solid grey;
	border-radius: 10px;
	margin: 0 auto;
`;