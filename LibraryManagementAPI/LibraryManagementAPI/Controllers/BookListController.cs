using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using LibraryDataAccess;

namespace LibraryManagementAPI.Controllers
{
    public class BookListController : ApiController
    {
        private LibraryManagementEntities db = new LibraryManagementEntities();

        // GET: api/BookList
        public HttpResponseMessage GetBookLists()
        {
            var returnObject = db.BookLists.Select(x => new { x.Book_ID, x.Author, x.Title, x.BookCategory });
            HttpResponseMessage httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, returnObject);
            return httpResponseMessage;
        }

        // GET: api/BookList/5
        [ResponseType(typeof(BookList))]
        public IHttpActionResult GetBookList(int id)
        {
            BookList bookList = db.BookLists.Find(id);
            if (bookList == null)
            {
                return NotFound();
            }

            return Ok(bookList);
        }

        // PUT: api/BookList/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBookList(int id, BookList bookList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookList.Book_ID)
            {
                return BadRequest();
            }

            db.Entry(bookList).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/BookList
        [ResponseType(typeof(BookList))]
        public IHttpActionResult PostBookList(BookList bookList)
        {

            db.BookLists.Add(bookList);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bookList.Book_ID }, bookList);
        }

        // DELETE: api/BookList/5
        [ResponseType(typeof(BookList))]
        public IHttpActionResult DeleteBookList(int id)
        {
            BookList bookList = db.BookLists.Find(id);
            if (bookList == null)
            {
                return NotFound();
            }

            db.BookLists.Remove(bookList);
            db.SaveChanges();

            return Ok(bookList);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookListExists(int id)
        {
            return db.BookLists.Count(e => e.Book_ID == id) > 0;
        }
    }
}