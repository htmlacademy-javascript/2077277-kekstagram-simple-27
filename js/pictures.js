const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictureList = (pictureData) => {
  const pictureListFragment = document.createDocumentFragment();
  pictureData.forEach(({url, comments, likes}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments;
    picture.querySelector('.picture__likes').textContent = likes;
    pictureListFragment.append(picture);
  });
  pictureList.append(pictureListFragment);
};

export { renderPictureList };
