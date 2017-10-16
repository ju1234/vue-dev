import './index.scss';
let toast;
const getLeft = () => {
  const winWidth = window.innerWidth || document.documentElement.offsetWidth;
  return window.lib.flexible.px2rem((winWidth - toast.offsetWidth) / 2) + 'rem';
};
export default function Toast(text, duration = 2000, onEnd) {
  if (toast) {
    toast.style.display = 'block';
    toast.innerText = text;
    setTimeout(() => {
      toast.classList.add('zhilin-fade-in');
      toast.style.left = getLeft();
    }, 0);
  } else {
    toast = document.createElement('span');
    toast.style.display = 'inline-block';
    toast.innerText = text;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.className = 'zhilin-toast zhilin-fade-in';
      // toast.style.left = (winWidth - toast.offsetWidth) / 2 + 'px';
      toast.style.left = getLeft();
    }, 0);
  }
  setTimeout(() => {
    toast.classList.remove('zhilin-fade-in');
  }, duration);
}
