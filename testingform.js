var firebaseConfig = {
  apiKey: "AIzaSyD0r4jP8nw31bzx0ym4BAUrqX9Meguj4bw",
  authDomain: "corona-website-1.firebaseapp.com",
  databaseURL: "https://corona-website-1-default-rtdb.firebaseio.com",
  projectId: "corona-website-1",
  storageBucket: "corona-website-1.appspot.com",
  messagingSenderId: "932656913473",
  appId: "1:932656913473:web:4d8da33ac2f4277b65bac0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var UserInputRef=firebase.database().ref('UserInputs')
document.getElementById('testForm').addEventListener('submit',submitForm);

function submitForm(e)
{
  e.preventDefault();
  var fname=getInputVal('firstname');
  var lname=getInputVal('lname');
  var mobile=getInputVal('mobile');
  var state=getInputVal('state');
  state=state.toLowerCase();
  readState(state);
  var email=getInputVal('email');
  var emailstatus=validateEmail();
  var profession=getInputVal('profession');
  var dateofbirth=getInputVal('dateofbirth');
  var symptomsList=getSelectedCheckboxValues('symptoms');
  var selectedOption=document.querySelector('input[name=option]:checked').value;
  if(emailstatus)
  saveMessages(fname+" "+lname,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList);
}

function readState(state)
{
  var centers;
  var ref=firebase.database().ref(state);
  ref.on('value',(data)=>{
    centers=data.val();
    document.getElementById("result").innerHTML=centers;
  })
}

function getInputVal(id)
{
  return document.getElementById(id).value;
}

function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList)
{
  var newuserInputRef=UserInputRef.push();
  newuserInputRef.set({
    name:name,
    mobile:mobile,
    email:email,
    profession:profession,
    dateofbirth:dateofbirth,
    selectedOption:selectedOption,
    state:state,
    symptomsList:symptomsList
  })
  alert("Thanku Find the list of Centers NearBy!")
}

function getSelectedCheckboxValues(name)
{
  const checkboxes=document.querySelectorAll(`input[name="${name}]:checked`);
  let values=[];
  checkboxes.forEach((checkbox)=>{
    values.push(checkbox.value);
  })
  return values;
}

function validateEmail()
{
  if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
  {
    return true;
  }
  alert("You Have entered wrong Email")
  return(false)
}