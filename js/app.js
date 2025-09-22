async function loadData() {
  const res = await fetch('data/data.json');
  const data = await res.json();
  document.querySelector('.title').textContent = data.siteTitle;
  document.querySelector('.bio').textContent = data.bio;

  const grid = document.querySelector('.grid');
  data.items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.category = item.category;
    const imgSrc = item.media === 'video' ? (item.thumb || 'assets/thumbs/video-thumb.jpg') : item.src;
    card.innerHTML = `
      <img src="${imgSrc}" alt="">
      <div class="card-body">
        <div class="card-title">${item.title}</div>
        <div class="card-desc">${item.description}</div>
      </div>`;
    card.addEventListener('click', () => openModal(item));
    grid.appendChild(card);
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });
    });
  });
}

function openModal(item) {
  const modal = document.querySelector('.modal');
  const box = document.querySelector('.modal-content');
  box.innerHTML = '';
  if (item.media === 'image') {
    const img = document.createElement('img');
    img.src = item.src;
    box.appendChild(img);
  } else {
    const video = document.createElement('video');
    video.src = item.src;
    video.controls = true;
    box.appendChild(video);
  }
  modal.classList.add('open');
}
function closeModal() {
  document.querySelector('.modal').classList.remove('open');
  document.querySelector('.modal-content').innerHTML = '';
}
window.addEventListener('DOMContentLoaded', loadData);

