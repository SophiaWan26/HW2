import './BookList.css'

import {Book} from './Book'
type Props = {
  booklist :Book[]
}

const BookList = (props:Props)=>{
  const {booklist} = props;
  return( 
    <div>
    <table>
        <tr>
          <th>id</th>
          <th>Author_id</th>
          <th>title</th>
          <th>pub_year</th>
          <th>Genre</th>
          {/* <th>Action</th> */}
        </tr>
      {booklist.map((book)=>{
          console.log(book)
          return (
          <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.author_id}</td>
              <td>{book.title}</td>
              <td>{book.pub_year}</td>
              <td>{book.genre}</td>
              {/* <div> */}
              {/*   <input  type="button" value="View"/> */}
              {/* </div> */}
            </tr>
          )
      
    })}
    </table>
          </div>
)
}
export default BookList;
