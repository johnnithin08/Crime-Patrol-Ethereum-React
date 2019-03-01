import React, { Component } from 'react'
import Crime from '../contracts/Crime.json'
import CrimeToken from '../contracts/CrimeToken.json'
import getWeb3 from '../utils/getWeb3'
import ipfs from '../ipfs'

import '../css/home.css'

class Home extends Component
 {
   constructor(props)
    {
      super(props);
      this.state = {
        name:'',
        aadhar: '',
        age: '',
        address: '',
        web3: '',
        web3_node: 'metamask',
        buffer: '',
        file: '',
        accountno :'',
        ipfs:'',
        search: '',
        balance : '',
        fingerprint : '',
        bufferfingerprint : '',
        ipfssearch : [],
        newuser : ''
     
      }
      
      this.getvalues=this.getvalues.bind(this);
      this.capturefile = this.capturefile.bind(this);
      this.onsubmit = this.onsubmit.bind(this);
      this.onsearch = this.onsearch.bind(this);
      this.onappend = this.onappend.bind(this);
      this.capturefingerprint = this.capturefingerprint.bind(this);
      this.onaddnewuser = this.onaddnewuser.bind(this);
      
    }


   componentWillMount() 
    {
      // Get network provider and web3 instance.
      // See utils/getWeb3 for more info.
      
      getWeb3()
      .then(results => {
        this.setState({
          web3: results
        })
        console.log(this.state.web3)
        this.state.web3.eth.getAccounts(function(error,result){
          console.log(result);
        });
        
        // Instantiate contract once web3 provided.
        this.instantiateContract()
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
    }
  
   instantiateContract() 
    {
      
      const crimeinstance =  new this.state.web3.eth.Contract(Crime.abi,"0x487709909F1f971f61F04d9E000C0d52b3F70645");
      this.setState({
            crimeinstance : crimeinstance
          })
      console.log(this.state.crimeinstance)
      this.state.crimeinstance.setProvider(this.state.web3.currentProvider)
      let th=this;
      this.state.web3.eth.getCoinbase((err, accountaddr) => {
        if (err === null) {

          const accountaddress = accountaddr;
          
         
          console.log(accountaddress);
          this.setState({
            accountno : accountaddress
          })
          

        console.log(this.state.accountno);
        console.log(this.state.web32);
        const tokenAddress = "0x540e8BFa34E7445EF34436cA16411C993086DF53";
        const walletAddress = this.state.accountno;
        console.log(walletAddress)

        // Get ERC20 Token contract instance
        const tokenbalance = new this.state.web32.eth.Contract(CrimeToken.abi,tokenAddress);

        // Call balanceOf function
          tokenbalance.methods.balanceOf(walletAddress).call().then((balance) => {
          
            // calculate a balance
            balance = balance/1000000000000000000;
            this.setState({
              balance : balance
            })
            console.log(balance.toString());
            }); 
        }
        
      });
      this.setState({
        web32: this.state.web3
        
      });

    }

  

  getvalues (e) 
  {
    
    if (e.target.id === 'name') 
     {
      this.setState({ name: e.target.value });
     } 
    else if (e.target.id === 'aadhar')
     {
      this.setState({ aadhar: e.target.value });
     }
    else if(e.target.id ==='age') 
     {
      this.setState({ age : e.target.value });
     }
    else if(e.target.id ==='address') 
     {
      this.setState({ address : e.target.value });
     }
     else if(e.target.id ==='search') 
     {
      this.setState({ search : e.target.value });
     }
    else if(e.target.id === 'newuser')
     {
       this.setState({  newuser : e.target.value})
     }
    console.log(this.state.name);
    console.log(this.state.aadhar);
    console.log(this.state.age);
    console.log(this.state.address);
    console.log(this.state.search)
  }

  capturefingerprint (event) 
   {
    event.preventDefault();
    console.log(event.target);
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    this.setState({
      file:file
    })
    //this.setState({selected_file: event.target.files[0].name}) 
    //event.target.value = null
    //this.setState({current_status: 'Reading File'})
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      //this.setState({current_status: 'File Read'})
      this.setState({ bufferfingerprint: Buffer(reader.result) })
      console.log('buffer', this.state.bufferfingerprint)
      console.log(reader.result)
      console.log('Account', this.state.accountno);
      
        
      };
   }

  capturefile (event) 
   {
    event.preventDefault();
    console.log(event.target);
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    this.setState({
      file:file
    })
    //this.setState({selected_file: event.target.files[0].name}) 
    //event.target.value = null
    //this.setState({current_status: 'Reading File'})
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      //this.setState({current_status: 'File Read'})
    this.setState({ buffer: Buffer(reader.result) })
    console.log('buffer', this.state.buffer)
    console.log(reader.result)
    console.log('Account', this.state.accountno);
      
        
      };
   }


   
   onsubmit(event) {
    event.preventDefault()

    if(this.state.balance>50000)
     {

      //this.setState({current_status: 'Uploading to IPFS'})
      ipfs.files.add(this.state.buffer, (error, result) => {
      if(error) {
        //this.setState({current_status: 'Failed to upload file to IPFS'})
        console.error(error)
        return
      }
      console.log(result);
      //this.setState({current_status: 'File uploaded to IPFS'})
      //let dt =(new Date()).getTime()/1000
      //let th = this
      ipfs.files.add(this.state.bufferfingerprint, (error, res) => {
        if(error) {
          //this.setState({current_status: 'Failed to upload file to IPFS'})
          console.error(error)
          return
        }
        console.log(res)
        console.log(this.state.crimeinstance)
        this.state.crimeinstance.methods.enterdetails(this.state.aadhar,
              this.state.name,
              this.state.age,
              this.state.address,
              res[0].hash,
              result[0].hash).send({ from: this.state.accountno}
              ).then(()=>{
                this.setState({
                  fingerprint :'https://ipfs.io/ipfs/' + res[0].hash
                }) 
                
                
              }).catch((err) => {
                console.log("Failed with error: " + err);
              });
            })
        })

    }
   else
    {
      alert("You don't have sufficient funds to add a record");
    }
    document.getElementById("form1").reset(); 
    
  }

  onappend(event)
   {  

    event.preventDefault()

    if(this.state.balance>50000)
     {

      //this.setState({current_status: 'Uploading to IPFS'})
      ipfs.files.add(this.state.buffer, (error, result) => {
      if(error) {
        //this.setState({current_status: 'Failed to upload file to IPFS'})
        console.error(error)
        return
      }
      console.log(result);
      this.state.crimeinstance.methods.append(this.state.aadhar,result[0].hash).send({ from: this.state.accountno})
              .then(()=>{
                
              }).catch((err) => {
                console.log("Failed with error: " + err);
              });
      })
 
    }
   else
    {
      alert("You don't have sufficient funds to append a record");
    }

    document.getElementById("form1").reset(); 
     
   }
  onsearch(event)
   {

    if(this.state.balance>=10)
     {

      console.log(this.state.search);
      this.state.crimeinstance.methods.viewdetails(this.state.search).call().then((result)=>{
        console.log(result);
        

         
         var aadhar = result[0];
         var name = result[1];
         var age = result[2];
         var address = result[3];
         var fingerprint = result[4];
         var ipfs = result[5];
         console.log(ipfs);
         ipfs=ipfs.split(" ");
         console.log(ipfs);
         ipfs.shift();
         console.log(ipfs);
         this.setState({
           ipfssearch :ipfs,
           aadhar:aadhar,
           name:name,
           age:age,
           address:address,
           fingerprint : 'https://ipfs.io/ipfs/' + fingerprint
         })
        
        
        console.log(aadhar);
        console.log(name);
        console.log(age);
        console.log(address);
        console.log(this.state.ipfssearch);
        
      })

     }
    else
     {
       alert("You don't have sufficient funds to search a record")
     }
      
      
   }

  onaddnewuser(event)
   {
     if(this.state.balance>50000)
      {
        event.preventDefault();
        console.log(this.state.web3);
        console.log(this.state.accountno);
        console.log(this.state.crimeinstance);
        console.log(this.state.newuser);
        
       this.state.crimeinstance.methods.getnode().call({ from : this.state.accountno},(error,result) =>{
   
         console.log(result);
         //console.log(this.state.newuser);
       })
       this.state.crimeinstance.methods.addnode(this.state.newuser).send({ from : this.state.accountno}).then((res) =>{
         console.log(res);
         //console.log(this.state.newuser);
       })
      }
    else 
     {
       alert("You cannot add a user into the network")
     }
     
      
   }
    render()
     {
      
      return(
        <div>
            
            <h1>USER HOME</h1>
        <div className="input-group">
        <input type="text" className="form-control" placeholder="Search" id="search" onChange={this.getvalues}/>
        <div className="input-group-btn">
          <button className="btn btn-default" type="submit" onClick={this.onsearch}>Search
            <i className="glyphicon glyphicon-search" ></i>
          </button>
          
        </div>
        </div>
        <div className="input-group" >
      
        <p>Aadhar : {this.state.aadhar}</p>
        <p>Name : {this.state.name}</p>
        <p>Age : {this.state.age}</p>
        <p>Address : {this.state.address}</p>
        <p>FingerPrint : <a className="display" href={this.state.fingerprint}>View Fingerprint</a></p>
        {this.state.ipfssearch.map(ipfs => {
          console.log(ipfs);
          ipfs='https://ipfs.io/ipfs/' + ipfs;
        return ( <p>Crime Record : <a className="display" href={ipfs}>View Crime Record</a></p>
                 )
           })
        }
    
      </div>
      <div className="div1" >
          <h1> Enter Crime details</h1>
      </div>
        <form className="input-group" id="form1">
             <input type = "text" placeholder="name" id="name" onChange={this.getvalues}/>
             <input type = "text" placeholder="aadhar no" id="aadhar" onChange={this.getvalues} />
             <input type = "number" placeholder="age" id="age" onChange={this.getvalues}/>
             <br/>
             <textarea placeholder="enter address" id="address" onChange={this.getvalues}></textarea>
             <br/>
             <div class="details">
             <p>FingerPrint : <input type="file" id="fingerprint" onChange={this.capturefingerprint} /></p>
             <p>Criminal Record : <input type="file" id="inputfile" onChange={this.capturefile} /> </p>
             <button  type="submit" onClick={this.onappend}>Append</button>
             <button  type="submit" onClick={this.onsubmit}>Submit</button>   
             </div>

        </form>
        <br/>
        <div className="input-group">
        <input type="text" className="form-control" placeholder="New User Address" id="newuser" onChange={this.getvalues}/>
       
          <button type="submit" onClick={this.onaddnewuser}> Add New user</button>
        </div>

        </div>
    )

     }
    
 }

 export default Home;

 