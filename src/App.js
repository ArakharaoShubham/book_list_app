import React, { useEffect, useState } from 'react';
import './App.css';
import View from './components/View';

// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem('books');
  if (data) {
    return JSON.parse(data);
  }
  else {
    return [];
  }
}

function App() {

  //main array of object state || books state || books array of objects
  const [books, setbooks] = useState(getDatafromLS());

  //input field states
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [isbn, setisbn] = useState("");

  //form submit event
  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    // creating an object
    let book = {
      title,
      author,
      isbn
    }

    setbooks([...books, book]);

    settitle("");
    setauthor("");
    setisbn("");
  }

  // delete book from LS
  const deleteBook = (isbn) =>{
    const filteredBooks = books.filter((element, index)=>{
      return element.isbn !== isbn;
    });
    setbooks(filteredBooks);
  }

  // saving data to loacl storage
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  return (
    <div className="wrapper">
      <h1>BookList App</h1>
      <p>Add and view your books using local storage</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete='off' className='form-group' onSubmit={handleAddBookSubmit}>
            <label>Title</label>
            <input type="text" className='form-control' required onChange={(e) => settitle(e.target.value)} value={title} />
            <br></br>

            <label>Author</label>
            <input type="text" className='form-control' required onChange={(e) => setauthor(e.target.value)} value={author} />
            <br></br>

            <label>ISBN#</label>
            <input type="text" className='form-control' required onChange={(e) => setisbn(e.target.value)} value={isbn} />
            <br></br>
            <button type='submit' className='btn btn-success btn-md' >ADD</button>
          </form>
        </div>

        <div className='view-container'>
          {books.length > 0 && <>
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th>ISBN#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <View books = {books} deleteBook = {deleteBook}/>
              </tbody>
            </table>
          </div>
          <button className='btn btn-danger btn-md' onClick={()=>setbooks([])}>Remove All</button>
          </>}
          {books.length < 1 && <div>No books are added yet</div>}
        </div>

      </div>
    </div>
  );
}

export default App;