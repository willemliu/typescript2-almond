import 'intersection-observer';
import Offset from 'Offset';

let offset = new Offset();

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
  offset.setText(entries[0].intersectionRatio);
}, options);

io.observe(document.querySelector('.observed-content'));