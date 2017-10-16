// import './index.scss';
let loading;
let status = 'hide';
const show = () => {
  status = 'show';
  if (loading) {
    loading.style.display = 'block';
  } else {
    loading = document.createElement('div');
    loading.className = 'zhilin-loading';
    loading.style.display = 'block';
    document.body.appendChild(loading);
    loading.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (status === 'show') {
        hide();
      }
    });
  }
}

const hide = () => {
  status = 'hide';
  if (loading) {
    loading.style.display = 'none';
  }
}

export default {
  show, hide
}
