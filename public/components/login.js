export const getLoginStatus = () => {
  let user = getUser();
  return user == null ? false : true;
};

export const getUser = () => {
  let user = sessionStorage.getItem('user');
  return JSON.parse(user);
}

export const createLoginField = () => {
  const loginDiv = document.createElement('div');
  loginDiv.classList.add('login-div');

  const wrapper = document.createElement('div');
  wrapper.classList.add('login-wrapper');

  const welcomeText = document.createElement('h2');
  welcomeText.innerText = 'Välkommen till AirBean-familjen!';
  welcomeText.classList.add('welcome-text');

  const text = document.createElement('p');
  text.innerText = 'Genom att skapa ett konto nedan kan du spara och se din orderhistorik.';
  text.classList.add('instructions');

  const form = document.createElement('form');

  const nameDiv = document.createElement('div');
  const nameLabel = document.createElement('label');
  nameLabel.for = 'name';
  nameLabel.innerText = 'Namn';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameDiv.append(nameLabel, nameInput);

  const emailDiv = document.createElement('div');
  const emailLabel = document.createElement('label');
  emailLabel.for = 'email';
  emailLabel.innerText = 'Epost';
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.name = 'email';
  emailDiv.append(emailLabel, emailInput);

  const GDPRDiv = document.createElement('div');
  const GDPRInput = document.createElement('input');
  GDPRInput.type = 'radio';
  GDPRInput.name = 'gdpr';
  const GDPRLabel = document.createElement('label');
  GDPRLabel.for = 'gdpr';
  GDPRLabel.innerText = 'GDPR Ok!';
  GDPRDiv.append(GDPRInput, GDPRLabel);

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.innerText = 'Brew me a cup!';
  submit.classList.add('login-btn');

  form.append(nameDiv, emailDiv, GDPRDiv, submit);

  wrapper.append(welcomeText, text, form);
  loginDiv.appendChild(wrapper);
  const body = document.querySelector('body');
  body.appendChild(loginDiv);
}