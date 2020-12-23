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
    
    public class BorrowBookController : ApiController
    {
        private LibraryManagementEntities db = new LibraryManagementEntities();

        // GET: api/BorrowBook
        
        public HttpResponseMessage GetBorrowBooks()
        {
            HttpResponseMessage httpResponseMessage;
            var returnObject = db.BorrowBooks;
            httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, returnObject);
            return httpResponseMessage;
        }

        // GET: api/BorrowBook/5
        [ResponseType(typeof(BorrowBook))]
        public IHttpActionResult GetBorrowBook(int id)
        {
            List<BorrowBook> borrowBooks = db.BorrowBooks.Include(s => s.Student).Include(m => m.BorrowBookDetails).ToList();
            BorrowBook borrowBook = borrowBooks.Find(e => e.BorrowBook_ID == id);
            if (borrowBook == null)
            {
                return NotFound();
            }

            return Ok(borrowBook);
        }

        // PUT: api/BorrowBook/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBorrowBook(int id, BorrowBook borrowBook)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            if (id != borrowBook.BorrowBook_ID)
            {
                return BadRequest();
            }
            List<BorrowBookDetail> borrowBookDetails = db.BorrowBookDetails.Where(s => s.BorrowBook_ID == id).ToList();
            foreach (BorrowBookDetail book in borrowBookDetails)
            {
                db.BorrowBookDetails.Remove(book);
            }
            db.SaveChanges();

            foreach (BorrowBookDetail borrowBookDetail in borrowBook.BorrowBookDetails)
            {
                borrowBookDetail.BorrowBookDetails_ID = 0;
                borrowBookDetail.BorrowBook_ID = id;
                db.BorrowBookDetails.Add(borrowBookDetail);
                db.SaveChanges();
            }
            db.Entry(borrowBook).State = EntityState.Modified;
            db.SaveChanges();

            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!BorrowBookExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/BorrowBook
        [ResponseType(typeof(BorrowBook))]
        public IHttpActionResult PostBorrowBook(BorrowBook borrowBook)
        {

            db.BorrowBooks.Add(borrowBook);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = borrowBook.BorrowBook_ID }, borrowBook);
        }

        // DELETE: api/BorrowBook/5
        [ResponseType(typeof(BorrowBook))]
        public IHttpActionResult DeleteBorrowBook(int id)
        {
            BorrowBook borrowBook = db.BorrowBooks.Find(id);
            if (borrowBook == null)
            {
                return NotFound();
            }

            db.BorrowBooks.Remove(borrowBook);
            db.SaveChanges();

            return Ok(borrowBook);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BorrowBookExists(int id)
        {
            return db.BorrowBooks.Count(e => e.BorrowBook_ID == id) > 0;
        }
    }
}