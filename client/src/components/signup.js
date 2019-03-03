import React,{Component} from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import getWeb3 from "../utils/getWeb3";
import Crime from '../contracts/Crime.json'
import CrimeToken from '../contracts/CrimeToken.json'



import '../css/signup.css'


class Signup extends Component
{
    constructor(props)
     {
         super(props);
         this.state={
            address: '',
            username:'',
            web3: '',
            crimeinstance: '',
            crimetoken : [],
            balance: '',
            status : ''
        }
        this.handlesignup=this.handlesignup.bind(this);
     }
    
    componentDidMount = async () => 
     {
        try 
         {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
          this.setState(
           {
              web3 : web3
           })
          console.log(this.state.web3)
          console.log(this.state.web3.currentProvider)
          console.log("web3.getCoinbase-accounts");
          this.state.web3.eth.getCoinbase()
          .then((accounts) => 
           {
             this.setState({
               address : accounts
             })
             if(this.state.address==0x1D0e973F25766FCb965E483B3f8D2AD1fb022569)
              {
                this.props.history.push("/home")
              }
             else 
              {
                console.log("accounts-coinbase1", accounts);
         
          this.setState({
            web32: this.state.web3
          })
          
          const crimeinstance =  new this.state.web3.eth.Contract(Crime.abi,"0x09C0CCa7489C089Cff0D57A7bd6eA5c94d58A205");
          this.setState({
            crimeinstance : crimeinstance
          })
          console.log(this.state.crimeinstance)
          crimeinstance.setProvider(this.state.web3.currentProvider)
          crimeinstance.methods.doesnodeexist(this.state.address).call().then((result) =>{
            console.log("enter contract")
                 if(result==true)
                  {
                    this.setState({
                      status : true
                    })
                  }
                 else
                  {
                    this.setState({
                      status : false
                    })
                  }
               
          })
        
          console.log(this.state.address);
          console.log(this.state.web32);
          
        } 
        
        const tokenAddress = "0x540e8BFa34E7445EF34436cA16411C993086DF53";
        const walletAddress = this.state.address;
        console.log(walletAddress)
              
        // Get ERC20 Token contract instance
        const crimetokeninstance =  new this.state.web3.eth.Contract(CrimeToken.abi, tokenAddress);
                      
                      
        this.setState({
             crimetoken : crimetokeninstance
             })
        console.log(this.state.crimetoken)
        // Call balanceOf function
        crimetokeninstance.methods.balanceOf(walletAddress).call().then((balance) => {
                        
                          
        this.setState({
          balance : balance/1000000000000000000
          })
           console.log(this.state.balance);
           if(this.state.balance>0)
             {
              this.props.history.push("/home");
              }
           });
                          
       
          })
            
            
        }
        catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      
      };
    
    
      
    
    handlesignup(event)
         {  
      
            event.preventDefault();
            //console.log(event.target[1].value);
            console.log(this.state.web32);
            console.log(this.state.address);
            console.log(this.state.status)
            if(this.state.status== true && this.state.balance==0)
            {
              
              const tokenAddress = "0x540e8BFa34E7445EF34436cA16411C993086DF53";
              const crimetokeninstance =  new this.state.web3.eth.Contract(CrimeToken.abi, tokenAddress);
                const address=String(this.state.address);
                const admin="0x1D0e973F25766FCb965E483B3f8D2AD1fb022569";
                crimetokeninstance.methods
                .transferFrom("0x1D0e973F25766FCb965E483B3f8D2AD1fb022569",this.state.address,10000000000000000000)
                .send({ from : this.state.address})
                .then((error,result) =>
                {
                  if(error)
                    {
                      console.log(error)
                    }
                  else 
                    {
                      console.log(result);
                    }
                  console.log(this.state.balance.toString())
                });
                this.props.history.push("/home");
                }
            else if(this.state.status==true)
                {
                  this.props.history.push("/home");
                }  
            else 
            {
              alert("You are not registered in the network")
            }
            
         }
    render()
     {
        
        
         return(

        <div>

        <BrowserRouter>
        <div>
            <div>
            
            
            </div>
            <form className="modal-content animate" >

                <div className="container">
                
                <input type="text" id="address" placeholder="Address"  value={this.state.address} required/>

                <button  onClick={this.handlesignup} >Signup</button>
                
                </div>

            
             </form>
        </div>   
         
         </BrowserRouter>
        </div>

        
         )
         
     }

}

export default Signup;
