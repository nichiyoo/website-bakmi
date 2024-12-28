document.addEventListener('DOMContentLoaded', function () {
	const menus = [
		{
			name: 'Pangsit Udang',
			image: 'img/menus/pangsit-udang.jpg',
			price: 15000,
			category: 'dimsum',
			stock: 5,
		},
		{
			name: 'Siomay Ayam',
			image: 'img/menus/siomay-ayam.jpg',
			price: 15000,
			category: 'dimsum',
			stock: 4,
		},
		{
			name: 'Kulit Tahu Udang',
			image: 'img/menus/kulit-tahu-udang.jpg',
			price: 15000,
			category: 'dimsum',
			stock: 6,
		},
		{
			name: 'Pangsit Tek-tek',
			image: 'img/menus/pangsit-tektek.jpg',
			price: 17000,
			category: 'bakmi',
			stock: 5,
		},
		{
			name: 'Yamin Asin Pangsit',
			image: 'img/menus/yamin-asin-pangsit.jpg',
			price: 17000,
			category: 'bakmi',
			stock: 6,
		},
		{
			name: 'Pangsit Ayam',
			image: 'img/menus/pangsit-ayam.jpg',
			price: 15000,
			category: 'dimsum',
			stock: 2,
		},
		{
			name: 'Bakmi Manis Pangsit',
			image: 'img/menus/bakmi-manis-pangsit.jpg',
			price: 17000,
			category: 'bakmi',
			stock: 4,
		},
		{
			name: 'Bakmi Asin Spesial',
			image: 'img/menus/bakmi-asin-spesial.jpg',
			price: 17000,
			category: 'bakmi',
			stock: 5,
		},
	];

	const categories = menus.reduce(
		(acc, menu) => {
			if (!acc.includes(menu.category)) acc.push(menu.category);
			return acc;
		},
		['all']
	);

	const search = new URLSearchParams(window.location.search);
	const category = search.get('category') || 'all';

	const filter = document.querySelector('.menu .filter');
	const container = document.querySelector('.menu .grid');

	renderMenu(menus, category, container);
	renderFilter(categories, category, filter);
});

const html = String.raw;

function formatCurrency(price) {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
	}).format(price);
}

function renderMenu(menus, category, container) {
	if (!container) return;

	container.innerHTML = '';
	const data = category === 'all' ? menus : menus.filter((menu) => menu.category === category);
	data.forEach((menu, index) => {
		const card = document.createElement('div');
		card.classList.add('card');
		card.dataset.aos = 'fade-up';
		card.dataset.aosDelay = index * 100;

		card.innerHTML = html`
			<img src="${menu.image}" alt="${menu.name}" />
			<div class="detail">
				<span class="price">${formatCurrency(menu.price)}</span>
				<h5>${menu.name}</h5>
				<span>Jumlah Tersedia: ${menu.stock}</span>
			</div>
		`;

		container.appendChild(card);
	});
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderFilter(categories, category, filter) {
	if (!filter) return;

	filter.innerHTML = '';
	categories.forEach((item) => {
		const li = document.createElement('li');
		const a = document.createElement('a');

		a.href = `menu.html?category=${item}`;
		a.classList.toggle('active', item === category);
		a.innerHTML = capitalize(item);

		li.appendChild(a);
		filter.appendChild(li);
	});
}
