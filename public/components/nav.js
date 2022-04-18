export const createNav = () => {
  const navButton = document.createElement('button');
  navButton.type = 'button';
  navButton.classList.add('nav-btn');

  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-bars');

  navButton.appendChild(icon);

  const navDiv = document.createElement('div');
  navDiv.classList.add('nav-div');
  navDiv.classList.add('hidden');

  const navContent = document.createElement('div');
  navContent.classList.add('nav-content');

  // Nav items
  
  const Meny = document.createElement('a');
  Meny.href = '/menu';
  Meny.textContent = 'Meny';

  const VårtKaffe = document.createElement('a');
  VårtKaffe.href = '/about';
  VårtKaffe.textContent = 'Vårt kaffe';

  const MinProfil = document.createElement('a');
  MinProfil.href = '/profile';
  MinProfil.textContent = 'Min profil';

  const Orderstatus = document.createElement('a');
  Orderstatus.href = '/status';
  Orderstatus.textContent = 'Orderstatus';
  
  const hr = document.createElement('hr');

  navContent.append(Meny, hr, VårtKaffe, hr.cloneNode(true), MinProfil, hr.cloneNode(true), Orderstatus);

  // Close button

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.classList.add('close-btn');

  const buttonText = document.createElement('span');
  buttonText.classList.add('close-btn-text')
  buttonText.innerText = '×';

  closeButton.appendChild(buttonText);

  navDiv.append(closeButton, navContent);

  // Event listeners

  navButton.addEventListener('click', e => {
    navDiv.classList.remove('hidden');
  });

  closeButton.addEventListener('click', e => {
    navDiv.classList.toggle('hidden');
  });

  // Add to document

  const header = document.querySelector('header');
  header.prepend(navButton);
  const body = document.querySelector('body');
  body.appendChild(navDiv);
};