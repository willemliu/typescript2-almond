import 'intersection-observer';

let threshold = [];
for(let i = 0; i < 1000; ++i) {
  threshold.push(1/1000*i);
}

threshold = [...threshold, 1]
console.log('Thresholds', threshold);

const options = {
  root: null,
  rootMargin: '0px',
  threshold: threshold
};
let io = new IntersectionObserver((entries, observer) => {
  console.debug(entries);
}, options);

io.observe(document.querySelector('body'));