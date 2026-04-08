import { photos } from './create-array-photos.js';

const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img').querySelector('img');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const commentsShownCountNode = bigPictureNode.querySelector('.social__comment-shown-count');
const commentsTotalCountNode = bigPictureNode.querySelector('.social__comment-total-count');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment');
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
const commentsCountNode = bigPictureNode.querySelector('.social__comment-count');
const commentsLoaderNode = bigPictureNode.querySelector('.social__comments-loader');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

const onBigPictureCancelClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

const openBigPicture = (pictureId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImgNode.src = currentPhoto.url;
  bigPictureImgNode.alt = currentPhoto.description;
  likesCountNode.textContent = currentPhoto.likes;
  commentsShownCountNode.textContent = currentPhoto.comments.length;
  commentsTotalCountNode.textContent = currentPhoto.comments.length;
  commentsCaptionNode.textContent = currentPhoto.description;
  socialCommentsNode.innerHTML = '';

  currentPhoto.comments.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);

    socialCommentNode.querySelector('.social__picture').src = comment.avatar;
    socialCommentNode.querySelector('.social__picture').alt = comment.name;
    socialCommentNode.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialCommentNode);
  });

  socialCommentsNode.appendChild(socialCommentsFragment);
  commentsCountNode.classList.add('hidden');
  commentsLoaderNode.classList.add('hidden');

  bigPictureNode.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);

export {openBigPicture};
