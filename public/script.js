

var inputField = document.getElementById("inputField");
tasks = [];
getAllPosts();

inputField.addEventListener("keypress",(e) => {
    if(e.keyCode === 13)
     {
         var val = inputField.value;
         if(val.length > 0)
         post({task: val}).then(data => {
             inputField.value = null;
             getAllPosts();
            })
     }
})

function checkBoxChange (id) {
    checkUncheck({id}).then(data => {
        tasks = data;
        createTasksOnClientSide();
    })
}

function deleteTask(id) {
    deletePost({id}).then(data => {
        tasks = data;
        createTasksOnClientSide();
    })
}

function getAllPosts() {
    getPosts().then(data => {
        tasks = data;
        createTasksOnClientSide();
    })
}

function createTasksOnClientSide() {

    let allTasks = document.getElementById("allTasks");
    let allDivs = document.createElement("div");
    tasks.forEach(element => {
        let {task,completed,id} = element;
        let div = document.createElement("div");
        let p = document.createElement("p");
        p.textContent = task;
        let checkBox = document.createElement("input");
        if(completed)
        {
            checkBox.setAttribute("checked",completed);
            p.style.textDecoration = 'line-through'
        }
        checkBox.setAttribute("onClick", `checkBoxChange(${id})`);
        checkBox.type = "checkbox";
        let span = document.createElement("span");
        span.textContent = 'x';
        span.setAttribute("onClick", `deleteTask(${id})`);
        div.appendChild(p);
        div.appendChild(checkBox);
        div.appendChild(span)
        div.setAttribute("id",id);
        allDivs.appendChild(div);
    });
    allTasks.innerHTML = allDivs.innerHTML
}



async function post(data={})
{
    const url = "http://localhost:3000/post";
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function getPosts()
{
    const url = "http://localhost:3000/posts";
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json();
}
async function deletePost(id={})
{
    
    const url = "http://localhost:3000/delete";
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(id)
    })
    return response.json();
}
async function checkUncheck(id={})
{
    const url = "http://localhost:3000/checkUncheck";
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(id)
    })
    return response.json();
}


