let userName = document.getElementById("userName");
let getDetailsbutton = document.getElementById("getDetails");
let profileInfo = document.getElementById("profileInfo");
let repoInfo = document.getElementById("repoInfo");

//Using async function to get details

getDetailsbutton.addEventListener("click", async () => {
  let name = userName.value;
  // console.log(name);
  let res = await fetch(`https://api.github.com/users/${name}`);
  let data = await res.json();
  // console.log(data);
  getProfile(data);
  getRepo(name);
});

//get profile function it is used to get the user details from the server

function getProfile(data) {
  profileInfo.innerHTML = `<div class="card"><div class="card-img"><img src=${data.avatar_url} alt=${data.name}></div>
    <div class="card-body"><div class="card-title">${data.name}</div>
    <div class="subHeading">${data.login}</div>
    <div class="card-text">
    <p>${data.bio}</p>
    <p><i class="fa-solid fa-user-group"></i>${data.followers} followers ${data.following} following</p>
    <p><i class="fa-solid fa-location-crosshairs"></i>${data.location}</p>
    <p>Github entry ${data.created_at}</p>
    <button><a href=${data.html_url} target="_blank">visit profile</a></button>
    </div>
    </div>
    </div>`;
}

//get repo function based on name and passing another API to get that

async function getRepo(name) {
  let res = await fetch(`https://api.github.com/users/${name}/repos`);
  let projects = await res.json();
  for (let i = 0; i < projects.length; i++) {
    repoInfo.innerHTML += `<div class="card">
        <div class="card-body"><div class="card-title">${projects[i].name}</div>
        <div class="subHeading">${projects[i].language}</div>
        <div class="card-text"><button><a href=${projects[i].html_url} target="_blank">visit projects</a></button>
        </div>
        </div>
        </div>`;
  }
}
