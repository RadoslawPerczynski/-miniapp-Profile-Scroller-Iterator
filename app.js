document.getElementById('next').addEventListener('click', nextProfile);
const imageContainer = document.getElementById('imageDisplay');
const detailsContainer = document.getElementById('profileDisplay');

//profiles iterable
let profiles;

//call api
async function getUsers() {
  const response = await fetch('https://randomuser.me/api/?results=10');
  const result = await response.json();
  return result;
}

getUsers().then((res) => {
  //USERS ARRAY
  let usersArray = res.results;
  console.log(usersArray);

  profiles = profileIterator(usersArray);
  nextProfile();

});

function nextProfile() {
  const currentProfile = profiles.next().value;
  console.log(currentProfile);
  if(currentProfile != undefined) {
    drawUI(currentProfile);

  } else {
    //no more profiles
    window.location.reload();

  }
}


//creation of next()
function profileIterator(users) {
  let nextIndex = 0;

  return {
    next: function () {
      if (nextIndex < users.length) {
        return {
          value: users[nextIndex++],
          done: false
        }
      } else {
        return {
          done: true
        }
      }
    }
  }
}

function drawUI(user) {
  const firstName = capitalizeFirstLetter(user.name.first);
  const lastName = capitalizeFirstLetter(user.name.last);
  const gender = capitalizeFirstLetter(user.gender);
  const age = user.dob.age;
  const email = user.email;
  const city = capitalizeFirstLetter(user.location.city);
  const imageUrl = user.picture.large;

  detailsContainer.innerHTML = 
    `
    <ul class="list-group">
      <li class="list-group-item active">First name: ${firstName}</li>
      <li class="list-group-item">Last name: ${lastName}</li>
      <li class="list-group-item">Gender: ${gender} </li>
      <li class="list-group-item">Age: ${age}</li>
      <li class="list-group-item">Email: ${email}</li>
      <li class="list-group-item">City: ${city}</li>
    </ul>
    `;
    imageContainer.innerHTML = `<img src="${imageUrl}"/>`;
}

function capitalizeFirstLetter(string) { 
  return string.charAt(0).toUpperCase() + string.slice(1); 
} 
