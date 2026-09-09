class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  fix() {
    this.state = this.state * 1.5;
  }

  set state(value) {
    if (value < 0) {
      this._state = 0;
    } else if (value > 100) {
      this._state = 100;
    } else {
      this._state = value;
    }
  }

  get state() {
    return this._state;
  }
}


class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);

    this.type = "magazine";
  }
}


class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);

    this.author = author;
    this.type = "book";
  }
}


class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);

    this.type = "novel";
  }
}


class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);

    this.type = "fantastic";
  }
}


class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);

    this.type = "detective";
  }
}


class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    const book = this.books.find(
      book => book[type] === value
    );

    return book || null;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex(
      book => book.name === bookName
    );

    if (index === -1) {
      return null;
    }

    return this.books.splice(index, 1)[0];
  }
}


class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (mark < 2 || mark > 5) {
      return;
    }

    if (!this.marks[subject]) {
      this.marks[subject] = [];
    }

    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    if (!this.marks[subject]) {
      return 0;
    }

    const sum = this.marks[subject].reduce(
      (total, mark) => total + mark,
      0
    );

    return sum / this.marks[subject].length;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);

    if (subjects.length === 0) {
      return 0;
    }

    const sum = subjects.reduce(
      (total, subject) => total + this.getAverageBySubject(subject),
      0
    );

    return sum / subjects.length;
  }
}


// Тестовый сценарий для задачи «Библиотека»

const library = new Library("Библиотека имени Ленина");

library.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание рассказов о Шерлоке Холмсе",
    2019,
    1008
  )
);

library.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);

library.addBook(
  new NovelBook(
    "Герберт Уэллс",
    "Машина времени",
    1919,
    138
  )
);

library.addBook(
  new Magazine(
    "Мурзилка",
    1924,
    60
  )
);


// Находим книгу 1919 года

const book1919 = library.findBookBy(
  "releaseDate",
  1919
);

console.log(book1919);


// Выдаём книгу

const givenBook = library.giveBookByName(
  "Машина времени"
);

console.log(givenBook);


// Повреждаем книгу

givenBook.state = 40;

console.log(givenBook.state);


// Восстанавливаем книгу

givenBook.fix();

console.log(givenBook.state);


// Возвращаем книгу обратно в библиотеку

library.addBook(givenBook);

console.log(library.books);