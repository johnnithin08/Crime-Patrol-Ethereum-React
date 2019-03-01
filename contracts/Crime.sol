
pragma solidity ^0.5.0;

contract Crime
 {
  
    string concat;   
    bool exist;
     struct Criminal
      {
          uint aadhar;
          string name;
          string addr;
          uint age;
          string fingerprint;
          string[] hashes;
          address sender;
          bool append;
      }
     
     mapping(uint => Criminal) criminals;
     address[] nodes;
     uint flag=0;
     
     
     function getnode() public returns(address[] memory ) 
      {
          return nodes;
      }
     function addnode(address _address) public 
      {
          nodes.push(_address);
          
      }
      
     function doesnodeexist(address _address) public  returns(bool check)
      {
          for(uint i=0;i<nodes.length;i++)
           {
               if(_address==nodes[i])
                {
                    flag=1;
                }
           }
          if(flag==1)
           {
               return true;
           }
          else
           {
               return false;
           }
      }
     function append(uint _aadhaar,string memory _ipfshash) public
      {
          bool append=doesrecordexist(_aadhaar);
          if(append==true)
             {
               criminals[_aadhaar].hashes.push(_ipfshash);
               criminals[_aadhaar].sender=msg.sender; 

             }
          else 
           {
               revert("Cannot Append ..Record does not exist");
           }
      }
            
            
      function enterdetails(uint _aadhaar,string memory _name,uint _age,string memory _addr,string memory _fingerprint,string memory _ipfshash)  public
      {
            
                 criminals[_aadhaar].aadhar=_aadhaar;
                 criminals[_aadhaar].name=_name;
                 criminals[_aadhaar].addr=_addr;
                 criminals[_aadhaar].age=_age;
                 criminals[_aadhaar].fingerprint=_fingerprint;
                 criminals[_aadhaar].hashes.push(_ipfshash);
                 criminals[_aadhaar].append=true;  
                 criminals[_aadhaar].sender=msg.sender; 
            
      }
      
      
     function doesrecordexist(uint _aadhaar) private view returns(bool)
      {
          if(criminals[_aadhaar].append==true)
           {
               return true;
           }
          else 
           return false;
      }
      
     
     function stringconcat(uint _aadhaar) private view returns(string memory)
      {
          string memory res='';
          uint len=criminals[_aadhaar].hashes.length;
          for(uint i=0;i<len;i++)
           {
                res=string(abi.encodePacked(res, " " , criminals[_aadhaar].hashes[i]));   
           }
          return res;
      }
     function viewdetails(uint _aadhaar) public  returns(uint aadhaar,string memory name,uint age,string memory addr,string memory fingerprint,string memory ipfshash)
      {
          
          concat = stringconcat(_aadhaar);
          return (criminals[_aadhaar].aadhar,criminals[_aadhaar].name,criminals[_aadhaar].age,criminals[_aadhaar].addr,criminals[_aadhaar].fingerprint,concat);
      }
 }