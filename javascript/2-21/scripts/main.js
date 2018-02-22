var imageList = [
    {item: 0,
    src: 'https://images.pexels.com/photos/86933/pexels-photo-86933.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'train tracks'},
    {item: 1,
    src: 'https://images.pexels.com/photos/615060/pexels-photo-615060.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'sunset from plane'},
    {item: 2,
    src: 'https://images.pexels.com/photos/303014/pexels-photo-303014.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'aerial view of a forest road'},
    {item: 3,
    src: 'https://images.pexels.com/photos/343219/pexels-photo-343219.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'aerial view of a forest'},
    {item: 4,
    src: 'https://images.pexels.com/photos/611328/pexels-photo-611328.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'boat on mountain lake'},
    {item: 5,
    src: 'https://images.pexels.com/photos/880880/pexels-photo-880880.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'lake by mountains'},
    {item: 6,
    src: 'https://images.pexels.com/photos/305255/pexels-photo-305255.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'beach lifeguard shack'},
    {item: 7,
    src: 'https://images.pexels.com/photos/880871/pexels-photo-880871.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'sea of clouds'},
    {item: 8,
    src: 'https://images.pexels.com/photos/879358/pexels-photo-879358.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'nighttime highway'},
    {item: 9,
    src: 'https://images.pexels.com/photos/879746/pexels-photo-879746.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'cliff-side hideout'},
    {item: 10,
    src: 'https://images.pexels.com/photos/879832/pexels-photo-879832.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'tide on the beach'},
    {item: 11,
    src: 'https://images.pexels.com/photos/879444/pexels-photo-879444.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'mountains over a pagoda'},
    {item: 12,
    src: 'https://images.pexels.com/photos/879356/pexels-photo-879356.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'skyscraper hidden by fog'},
    {item: 13,
    src: 'https://images.pexels.com/photos/877992/pexels-photo-877992.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'snowy mountain lake'},
    {item: 14,
    src: 'https://images.pexels.com/photos/529643/pexels-photo-529643.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'aerial view of a snowy forest'},
    {item: 15,
    src: 'https://images.pexels.com/photos/877867/pexels-photo-877867.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'walking path through hilly plains'}
];

var previewer = document.getElementById('preview');
var fullView = document.getElementById('full-view');
var lightbox = document.getElementById('lightbox');

lightbox.addEventListener('click', function() {
    lightbox.classList.toggle('inactive');
});

for (var i=0; i < imageList.length; i++) {
    var image = document.createElement('img');
    image.classList.add('preview-image');
    image.setAttribute('name', imageList[i].item);
    image.setAttribute('src', imageList[i].src);
    image.setAttribute('alt', imageList[i].alt);
    previewer.appendChild(image);
}

var previewImages = document.getElementsByClassName('preview-image');
for (var i=0; i < previewImages.length; i++) {
    var image = previewImages[i];
    image.addEventListener('click', function(event) {
        var me = event.target;
        lightbox.querySelector('img').setAttribute('src', me.src);
        lightbox.classList.toggle('inactive');
    });
    image.addEventListener('mouseenter', function(event) {
        var me = event.target;
        me.classList.add('mouse-over');
    });
    image.addEventListener('mouseout', function(event) {
        var me = event.target;
        me.classList.remove('mouse-over');
    });
}