import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,Route} from 'react-router-dom'


import Home from './components/home'; 
import Signup from './components/signup';


class App extends Component
{
    
    render()
     {

        
        return(
        
        <div>

        <BrowserRouter>
        <div>

        <div>
            <div>
            <h1>CRIME PATROL</h1>
            </div>
            
        </div>
        
        <div>
        <Route  path="/" exact component={Signup}/>
        <Route  path="/home" exact component={Home}/>
        
        </div>
        </div>
        
         </BrowserRouter>
        </div>

        
         )
         
     }

}

ReactDOM.render(<App/>,document.getElementById("root"));

