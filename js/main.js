//ДЗ - 4

//Написать функции для создания массива из 25 сгенерированных объектов.
//Каждый объект массива — описание фотографии, опубликованной пользователем.

//Структура каждого объекта:
//  id - число — идентификатор опубликованной фотографии. Число от 1 до 25. Идентификаторы не должны повторяться.
//  url - строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
//  description - строка — описание фотографии. Описание придумайте самостоятельно.
//  likes - число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
//  comments - массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом.

const LIKES_RANGE = {
  MIN: 15,
  MAX: 200,
};

//Массив сообщений
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
//Массив имён
const NAMES = [
  'Мария',
  'Максим',
  'Вероника',
  'Татьяна',
  'Надежда',
  'Дарья',
  'Сергей',
  'Александр',
  'Егор',
  'Пётр',
  'Ирина',
  'Светлана',
  'Константин',
];


//Функция получения случайного числа из заданного диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.ceil(Math.max(a, b));
  let previousResult = -1;
  return () => {
    const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
    //Исключение повторения значения предыдущего вызова (для комментариев)
    if(previousResult !== result) {
      previousResult = result;
      return result;
    }
    //Берёт следующий комментарий в наборе сообщений
    return result === upper ? lower : result + 1;
  };
};

//Создание вложенного объекта Comments
const createComment = () => {
  let id = 1;
  const indexMessageArray = getRandomInteger(0, MESSAGES.length - 1);
  const indexNameArray = getRandomInteger(0, NAMES.length - 1);

  //Возвращаемая функция, которая создаёт комментарий
  return () => {
    const comment = {};
    const idAvatar = getRandomInteger(1, 6);
    comment.id = id;
    comment.avatar = `img/avatar-${idAvatar()}.svg`;
    comment.message = `${MESSAGES[indexMessageArray()]} ${MESSAGES[indexMessageArray()]}`;
    comment.name = `${NAMES[indexNameArray()]}`;
    id++;
    return comment;
  };
};


//Функция создания объекта
const createPhoto = () => {
  let id = 1;

  return () => {
    const photo = {};
    //Количество комментариев
    const numComments = getRandomInteger(0, 30),
      //Количество лайков
      numLikes = getRandomInteger(LIKES_RANGE.MIN, LIKES_RANGE.MAX);

    photo.id = id;
    photo.url = `photos/${id}.jpg`;
    photo.description = `Это фотография №${id}`;
    photo.likes = numLikes();
    //Создаём список комментариев
    photo.comments = Array.from({ length: numComments() }, createComment());
    id++;
    return photo;
  };
};


//Создаём массив описаний фото
const photoArray = Array.from({ length: 25 }, createPhoto());

//Выведем результат в консоль
console.log(photoArray);
