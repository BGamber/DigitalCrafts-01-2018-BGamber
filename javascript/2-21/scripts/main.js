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
    alt: 'walking path through hilly plains'},
    {item: 16,
    src: 'https://images.pexels.com/photos/878980/pexels-photo-878980.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'sandy dunes of a desert'},
    {item: 17,
    src: 'https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'mountain range with hikers'},
    {item: 18,
    src: 'https://images.pexels.com/photos/871715/pexels-photo-871715.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'distant earthy mountains'},
    {item: 19,
    src: 'https://images.pexels.com/photos/614484/pexels-photo-614484.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: 'road into the horizon'},
    {item: 20,
    src: 'https://images.pexels.com/photos/42154/pexels-photo-42154.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
    alt: "village in a mountain's shadow"}
];

var previewer = document.getElementById('preview');
var fullView = document.getElementById('full-view');
var lightbox = document.getElementById('lightbox');

lightbox.addEventListener('click', function(event) {
    if (event.target === lightbox || event.target === lightbox.querySelector('img')) {
        lightbox.classList.toggle('inactive');
    }
});

lightbox.querySelector('.left-arrow').addEventListener('click', function(event) {
    var currentImage = lightbox.querySelector('img');
    var nextImage;
    if (currentImage.getAttribute('item') === '0') {
        nextImage = imageList[(imageList.length-1)];
    } else {
        nextImage = imageList[Number(currentImage.getAttribute('item'))-1];
    }
    currentImage.setAttribute('src', nextImage.src);
    currentImage.setAttribute('alt', nextImage.alt);
    currentImage.setAttribute('item', nextImage.item);
});

lightbox.querySelector('.right-arrow').addEventListener('click', function(event) {
    var currentImage = lightbox.querySelector('img');
    var nextImage;
    if (Number(currentImage.getAttribute('item')) === (imageList.length-1)) {
        nextImage = imageList[0];
    } else {
        nextImage = imageList[Number(currentImage.getAttribute('item'))+1];
    }
    currentImage.setAttribute('src', nextImage.src);
    currentImage.setAttribute('alt', nextImage.alt);
    currentImage.setAttribute('item', nextImage.item);
});

for (var i=0; i < imageList.length; i++) {
    var image = document.createElement('img');
    image.classList.add('preview-image');
    image.setAttribute('item', imageList[i].item);
    image.setAttribute('src', imageList[i].src);
    image.setAttribute('alt', imageList[i].alt);
    previewer.appendChild(image);
}

var previewImages = document.getElementsByClassName('preview-image');
for (var i=0; i < previewImages.length; i++) {
    var image = previewImages[i];
    image.addEventListener('click', function(event) {
        var pic = lightbox.querySelector('img');
        var me = event.target;
        pic.setAttribute('src', me.src);
        pic.setAttribute('alt', me.alt);
        pic.setAttribute('item', me.getAttribute('item'));
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