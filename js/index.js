document.addEventListener('DOMContentLoaded', () => {
  const emailElement = document.querySelector('.e-mail');
  if (emailElement) {
    const emailAddress = atob(emailElement.innerHTML);
    emailElement.setAttribute('href', `mailto:${emailAddress}`);
    emailElement.innerHTML = emailAddress;
  }
  const addressElement = document.querySelector('.address');
  if (addressElement) addressElement.innerHTML = atob(addressElement.innerHTML);
});