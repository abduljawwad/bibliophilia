import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserCredentialsContext } from "./UserCredentialsContextProvider";
import axios from 'axios';

export const BooksContext = React.createContext();

export default function BooksContextProvider({ children }) {
  const [totalCount, setTotalCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [isAddBookBarVisible, setIsAddBookBarVisible] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    imageUrl:"",
    readingFlag: true,
  });
  const [books, setBooks] = useState([]);
  const [booksReading, setBooksReading] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  const showAddBookBar = () => {
    setIsAddBookBarVisible(true);
  };

  useEffect(() => {
    books,
    booksReading,
    completedBooks
    setTotalCount(books.length);
    setReadingCount(booksReading.length);
    setReadCount(completedBooks.length);
  }, [booksReading, completedBooks, books]);

  const hideAddBookBar = () => {
    setIsAddBookBarVisible(false);
  };

  const addBook = () => {
    const emptyString = "";
    const checkIfBookAlreadyExists = books.find(
      (book) => book.title === newBook.title
    );
    if (
      newBook.title !== emptyString &&
      typeof checkIfBookAlreadyExists !== "object"
    ) {
      setBooks([...books, newBook]);
      setBooksReading([...booksReading, newBook]);
    }
  };

  const markAsRead = (selectedBook) => {
    const checkIfBookAlreadyExists = completedBooks.find(
      (book) => book.title === selectedBook.title
    );
    if (typeof checkIfBookAlreadyExists !== "object") {
      selectedBook.readingFlag = false;
      let newBooksList = books.filter((book) => book.id !== selectedBook.id);
      setBooksReading(newBooksList);
      let completedBook = books.filter((book) => book.id === selectedBook.id);
      setCompletedBooks([...completedBooks, ...completedBook]);
    }
  };

  const deleteBookEntry = (selectedBook) => {
    let updatedBooks = books.filter((book) => book.id !== selectedBook.id);
    let updatedBooksReading = booksReading.filter(
      (book) => book.id !== selectedBook.id
    );
    let updatedBooksCompleted = completedBooks.filter(
      (book) => book.id !== selectedBook.id
    );
    setNewBook({
      id: uuidv4(),
      title: "",
      author: "",
      genre: "",
      readingFlag: true,
    });
    setBooks(updatedBooks);
    setBooksReading(updatedBooksReading);
    setCompletedBooks(updatedBooksCompleted);
  };

  const getAllBooksForUser = (idObj) => {
    const url = `http://localhost:5000/getAllBooksForUser`
    axios
     .post(url, idObj)
     .then(response => {
       setBooks(response.data.books || [])
       
      })
    }

  const markBookAsComplete = (selectedBook) => {
    const url = `http://localhost:5000/markBookAsComplete`
    axios
     .post(url, selectedBook)
     .then(response => {
       setBooks(response.data.books || [])
      })
    }

  const changeBookStatustoReading = (selectedBook) => {
    const url = `http://localhost:5000/changeBookStatustoReading`
    axios
     .post(url, selectedBook)
     .then(response => {
       setBooks(response.data.books || [])
      })
    }

  const deleteBook = (selectedBook) => {
    const url = `http://localhost:5000/deleteBook`
    axios
     .post(url, selectedBook)
     .then(response => {
       setBooks(response.data.books || [])
      })
    }

  const handleBookEntry = (book) => {
    const url = `http://localhost:5000/addBook`
    axios
     .post(url, book)
     .then(response => {
       setBooks(response.data.books || [])
     })}

  const addFormValues = (formValues) => {
    setNewBook((newBook) => ({
      ...newBook,
      ...formValues,
    }));
    setIsAddBookBarVisible(false)
  };

  const valObj = {
    totalCount,
    setTotalCount,
    readingCount,
    setReadingCount,
    readCount,
    setReadCount,
    isAddBookBarVisible,
    setIsAddBookBarVisible,
    newBook,
    setNewBook,
    books,
    setBooks,
    booksReading,
    setBooksReading,
    completedBooks,
    setCompletedBooks,
    addBook,
    markAsRead,
    addFormValues,
    deleteBookEntry,
    showAddBookBar,
    hideAddBookBar,
    getAllBooksForUser,
    handleBookEntry,
    markBookAsComplete,
    deleteBook,
    changeBookStatustoReading,
  };

  useEffect(() => {
    const booksReadingList = books.filter(book => book.readingFlag === true)
    const booksCompletedList = books.filter(book => book.readingFlag === false)
    setBooksReading(booksReadingList)
    setCompletedBooks(booksCompletedList)
    setTotalCount(books.length);
    setReadingCount(booksReading.length);
    setReadCount(completedBooks.length);
  }, [books]);

  return (
    <BooksContext.Provider value={valObj}>{children}</BooksContext.Provider>
  );
}
