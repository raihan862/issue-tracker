
const count = document.getElementById("count");
document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
let total = 0, remain= 0;
count.innerHTML=`${remain} (${total})`
function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
  
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(e=>Number(  e.id) === id);
  currentIssue.status = 'Closed';
  currentIssue.description='<span style="text-decoration: line-through red;" >'+currentIssue.description+'</span>'
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue=>Number(issue.id )!== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
  
}

const fetchIssues = () => {

  
  const issues = JSON.parse(localStorage.getItem('issues'));

  total=issues.length;
  remain=0;
  for (let i=0;i<issues.length ;i++) {
     if (issues[i].status ==="Open") {
       remain++;
     }
    
  }
  count.innerHTML=`${remain} (${total})`
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  if(issues){
  for (var i = 0; i < issues.length  ; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
}
